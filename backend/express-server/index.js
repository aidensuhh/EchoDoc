import express from "express";

// Set max listeners before creating app
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 15;

import expressWs from "express-ws";
import cors from "cors";
import twilio from "twilio";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFile } from "fs/promises";
import multer from "multer";
// Import GPT services
import GptService from "./ai-agent/services/gpt-service.js";
import StreamService from "./ai-agent/services/stream-service.js"; // Changed to default import
import TranscriptionService from "./ai-agent/services/transcription-service.js"; // Changed to default import
import TextToSpeechService from "./ai-agent/services/tts-service.js";

const app = express();
const wsInstance = expressWs(app);

// Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Constants
const PORT = process.env.PORT || 5500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Twilio setup
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
let callStatus = "pending";
let lastCallFrom = "";
let lastCallTo = "";
global.voiceModel = "aura-asteria-en";
let userName = "John Doe";
// Helper Functions
async function readTwiMLFile() {
  const filePath = join(__dirname, "twiml.xml");
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    console.error("Error reading TwiML file:", error);
    throw error;
  }
}

function generateTwiML() {
  const response = new twilio.twiml.VoiceResponse();
  const connect = response.connect();
  connect.stream({
    url: `wss://jacobs-macbook-pro.tail8a7d7a.ts.net/connection`,
  });
  return response.toString();
}

// Routes
app.get("/api/call", async (req, res) => {
  try {
    const twimlContent = generateTwiML();
    const call = await client.calls.create({
      twiml: twimlContent,
      to: process.env.TWILIO_USER_PHONE_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER,
      statusCallback: `${process.env.TAILSCALE_PUBLIC_URL}api/callStatus/`,
      statusCallbackEvent: ["completed"],
      statusCallbackMethod: "POST",
    });
    res.json({ success: true, callSid: call.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/callStatus", (req, res) => {
  console.log("Twilio Callback Body:", req.body);
  // Destructure and set callStatus
  const { CallSid, CallStatus } = req.body;
  callStatus = CallStatus;
  console.log(`Call ${CallSid} status: ${CallStatus}`);
  res.status(200).send("Status received");
});

app.get("/api/callStatus", (req, res) => {
  res.json({
    status: callStatus === "completed" ? "completed" : "pending",
  });
});

// GPT Voice Routes
app.post("/incoming", (req, res) => {
  try {
    const response = new twilio.twiml.VoiceResponse();
    const connect = response.connect();
    connect.stream({ url: `wss://${process.env.SERVER}/connection` });
    res.type("text/xml");
    res.send(response.toString());
  } catch (err) {
    console.error(err);
    res.status(500).send("Error handling incoming call");
  }
});
// Update /startOutboundCall route
app.post("/startOutboundCall", async (req, res) => {
  try {
    const { to } = req.body;
    if (!to) {
      return res.status(400).json({ error: "Phone number required" });
    }
    const formattedNumber = to.startsWith("+") ? to : `+${to}`;
    const twimlContent = generateTwiML();
    const call = await client.calls.create({
      twiml: twimlContent,
      to: process.env.TWILIO_USER_PHONE_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER,
      statusCallback: `${process.env.TAILSCALE_PUBLIC_URL}api/callStatus/`,
      statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
      statusCallbackMethod: "POST",
    });
    res.status(200).json({ message: "Call initiated", data: call });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// WebSocket Handler
app.ws("/connection", (ws) => {
  let streamSid;
  let callSid;
  let marks = [];
  let interactionCount = 0;

  // Initialize services
  const gptService = new GptService();
  const streamService = new StreamService(ws);
  const transcriptionService = new TranscriptionService();
  const ttsService = new TextToSpeechService({});

  // Cleanup function to properly close all services
  const cleanup = () => {
    try {
      transcriptionService.removeAllListeners();
      gptService.removeAllListeners();
      ttsService.removeAllListeners();
      streamService.removeAllListeners();

      // Clean up any ongoing processes
      if (streamService.cleanup) streamService.cleanup();
      if (transcriptionService.cleanup) transcriptionService.cleanup();
      if (gptService.cleanup) gptService.cleanup();
      if (ttsService.cleanup) ttsService.cleanup();
    } catch (err) {
      console.error("Cleanup error:", err);
    }
  };

  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data);
      switch (msg.event) {
        case "start":
          streamSid = msg.start.streamSid;
          callSid = msg.start.callSid;
          streamService.setStreamSid(streamSid);
          gptService.setCallSid(callSid);
          break;
        case "media":
          transcriptionService.send(msg.media.payload);
          break;
        case "mark":
          marks = marks.filter((m) => m !== msg.mark.name);
          break;
        case "stop":
          console.log(`Stream ${streamSid} ended`);
          cleanup();
          ws.close(1000, "Stream ended normally");
          break;
      }
    } catch (err) {
      console.error("Message handling error:", err);
      cleanup();
      ws.close(1011, "Internal server error");
    }
  });

  transcriptionService.on("transcription", async (text) => {
    if (text) {
      try {
        await gptService.completion(text, interactionCount++);
      } catch (err) {
        console.error("Transcription handling error:", err);
      }
    }
  });

  gptService.on("gptreply", async (reply, count) => {
    try {
      await ttsService.generate(reply, count);
    } catch (err) {
      console.error("GPT reply handling error:", err);
    }
  });

  ttsService.on("speech", (index, audio, label, count) => {
    try {
      streamService.buffer(index, audio);
    } catch (err) {
      console.error("Speech handling error:", err);
    }
  });

  streamService.on("audiosent", (label) => {
    marks.push(label);
  });

  // Handle WebSocket closure events
  ws.on("close", (code, reason) => {
    console.log(`WebSocket closed with code ${code} and reason: ${reason}`);
    cleanup();
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
    cleanup();
    ws.close(1011, "Internal server error");
  });
});



// Configure multer for audio file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../flask-server/OpenVoice/resources"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, 'audio-' + Date.now() + '.wav')
  }
});

const upload = multer({ storage: storage });

// Add this endpoint to your Express routes
app.post('/api/upload-audio', upload.single('audio'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ 
      message: 'File uploaded successfully',
      filename: req.file.filename 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
