"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, StopCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AudioRecorderOnboarding() {
  const router = useRouter();
  const [permission, setPermission] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string>("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const getMicrophonePermission = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermission(true);
      mediaStream.current = stream;
      toast({
        title: "Microphone Access Granted",
        description: "You can now start recording audio.",
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Error",
        description:
          "Failed to access microphone. Please check your permissions.",
        variant: "destructive",
      });
    }
  };

  const startRecording = (): void => {
    if (!mediaStream.current) {
      console.error("No media stream available");
      return;
    }

    setIsRecording(true);
    setAudioURL("");
    setUploadStatus("");
    chunks.current = [];

    mediaRecorder.current = new MediaRecorder(mediaStream.current);
    mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
      if (e.data.size > 0) {
        chunks.current.push(e.data);
      }
    };
    mediaRecorder.current.start();
  };

  const stopRecording = (): void => {
    if (!mediaRecorder.current) {
      console.error("No media recorder available");
      return;
    }

    setIsRecording(false);
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      setAudioURL(audioUrl);
      setAudioBlob(blob);
    };
    mediaRecorder.current.stop();
  };

  const uploadAudio = async (): Promise<void> => {
    if (!audioBlob) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      const response = await fetch("http://localhost:5500/api/upload-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus("Upload successful!");
        toast({
          title: "Upload Successful",
          description: "Your audio has been saved.",
        });
      } else {
        setUploadStatus("Upload failed: " + data.error);
        toast({
          title: "Upload Failed",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setUploadStatus("Upload failed: " + error.message);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-5xl font-bold mb-12 text-center">
        Let's get started...
      </h1>

      <Card className="w-full max-w-md">
        <CardContent className="pt-6 space-y-6">
          {!permission ? (
            <Button
              onClick={getMicrophonePermission}
              className="w-full"
              size="lg"
            >
              <Mic className="mr-2 h-5 w-5" /> Get Microphone Access
            </Button>
          ) : (
            <>
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                variant={isRecording ? "destructive" : "default"}
                className="w-full"
                size="lg"
              >
                {isRecording ? (
                  <>
                    <StopCircle className="mr-2 h-5 w-5" /> Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-5 w-5" /> Start Recording
                  </>
                )}
              </Button>

              {audioURL && (
                <div className="space-y-4">
                  <audio src={audioURL} controls className="w-full" />
                  <Button
                    onClick={uploadAudio}
                    disabled={isUploading}
                    className="w-full"
                    size="lg"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    {isUploading ? "Uploading..." : "Save Recording"}
                  </Button>
                  {uploadStatus === "Upload successful!" && (
                    <Button
                      onClick={() => router.push("/dashboard")}
                      className="w-full"
                      size="lg"
                    >
                      Continue
                    </Button>
                  )}
                </div>
              )}
            </>
          )}

          {uploadStatus && (
            <Alert
              variant={
                uploadStatus.includes("failed") ? "destructive" : "default"
              }
            >
              <AlertDescription>{uploadStatus}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
