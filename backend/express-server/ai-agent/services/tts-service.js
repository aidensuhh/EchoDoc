import dotenv from "dotenv";
import { EventEmitter } from "events";
import fs from "fs";
import pkg from "wavefile"
let { WaveFile } = pkg;
dotenv.config();

class TextToSpeechService extends EventEmitter {
  constructor() {
    super();
    this.nextExpectedIndex = 0;
    this.speechBuffer = {};
  }

  async generate(gptReply, interactionCount) {
    const { partialResponseIndex, partialResponse } = gptReply;

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/generateOpenVoiceTTS",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: partialResponse }),
        }
      );

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = Buffer.from(arrayBuffer);

        // Convert to Twilio format and encode as base64
        const base64Audio = this.convertToTwilioFormat(audioBuffer);

        this.emit(
          "speech",
          partialResponseIndex,
          base64Audio,
          partialResponse,
          interactionCount
        );
      } else {
        console.error("Error generating speech:", await response.text());
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  }

  /**
   * Converts audio buffer to Twilio-compatible format:
   * - 8000 Hz sample rate
   * - Mono channel
   * - 8-bit μ-law encoding
   * - Base64 encoded
   */
  convertToTwilioFormat(audioBuffer) {
    try {
      // Create WaveFile instance
      const wavFile = new WaveFile(audioBuffer);

      // Debug original format
      console.log("Original format:", {
        sampleRate: wavFile.fmt.sampleRate,
        channels: wavFile.fmt.numChannels,
        bitsPerSample: wavFile.fmt.bitsPerSample,
      });

      // Convert to mono if needed
      if (wavFile.fmt.numChannels > 1) {
        wavFile.toMono();
      }

      // Resample to 8000 Hz
      if (wavFile.fmt.sampleRate !== 8000) {
        wavFile.toSampleRate(8000, {
          method: "sinc", // highest quality resampling
          LPF: true, // apply low-pass filter
          LPFType: "IIR", // IIR filter type
        });
      }

      // Convert to 8-bit μ-law
      // wavFile.toBitDepth("8");
      wavFile.toMuLaw();

      // Debug converted format
      console.log("Converted format:", {
        sampleRate: wavFile.fmt.sampleRate,
        channels: wavFile.fmt.numChannels,
        bitsPerSample: wavFile.fmt.bitsPerSample,
      });

      // Return base64 encoded data
      return wavFile.toBase64();
    } catch (error) {
      console.error("Error in convertToTwilioFormat:", error);
      throw error;
    }
  }

  /**
   * Utility method to convert WAV file from disk
   */
  convertWavFileToBase64(filePath) {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const base64Audio = this.convertToTwilioFormat(fileBuffer);

      // Clean up the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully");
        }
      });

      return base64Audio;
    } catch (error) {
      console.error("Error in convertWavFileToBase64:", error);
      throw error;
    }
  }
}

export default TextToSpeechService;
