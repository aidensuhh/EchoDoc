import dotenv from "dotenv";
import { Buffer } from "node:buffer";
import { EventEmitter } from "events";
import fetch from "node-fetch";

dotenv.config();

class TextToSpeechService extends EventEmitter {
  constructor(voiceId) {
    super();
    this.voiceId =
      voiceId || process.env.ELEVENLABS_VOICE_ID || "9vhe33SF3SeQLrvq158t";
    this.nextExpectedIndex = 0;
    this.speechBuffer = {};
    this.baseUrl = "https://api.elevenlabs.io/v1/text-to-speech";
  }

  async generate(gptReply, interactionCount) {
    const { partialResponseIndex, partialResponse } = gptReply;

    if (!partialResponse) {
      return;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/${this.voiceId}?output_format=ulaw_8000`,
        {
          method: "POST",
          headers: {
            Accept: "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": process.env.ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({
            text: partialResponse,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 1,
              style: 0.7,
            },
          }),
        }
      );

      if (response.status === 200) {
        try {
          const audioArrayBuffer = await response.arrayBuffer();
          const base64String = Buffer.from(audioArrayBuffer).toString("base64");

          this.emit(
            "speech",
            partialResponseIndex,
            base64String,
            partialResponse,
            interactionCount
          );
        } catch (err) {
          console.log("Error processing audio response:", err);
        }
      } else {
        const errorData = await response.json();
        console.log("ElevenLabs TTS error:", errorData);
      }
    } catch (err) {
      console.error("Error occurred in TextToSpeech service:", err);
    }
  }
}

export default TextToSpeechService;
