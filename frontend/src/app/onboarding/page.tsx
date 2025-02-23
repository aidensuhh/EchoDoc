"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Upload, StopCircle } from "lucide-react";

export default function OnboardingPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [name, setName] = useState("");
  const [step, setStep] = useState(1); // Track current step
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const router = useRouter();

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const handleNextStep = () => {
    if (step === 1 && !name) {
      alert("Please enter your name");
      return;
    }
    setStep(2);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        setRecordedBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks on the active stream
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRecordedBlob(file);
    }
  };

  const handleSubmit = async () => {
    if (!name || !recordedBlob) {
      alert("Please provide both your name and voice recording");
      return;
    }

    try {
      // Create a FormData object to send the audio file
      const formData = new FormData();
      formData.append("audio", recordedBlob, "voice-sample.wav");
      formData.append("name", name);

      // Send the audio file to your backend
      // const response = await fetch('http://localhost:5500/api/upload-audio', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to upload audio');
      // }

      // const data = await response.json();
      // console.log('Upload successful:', data);

      // Use Next.js router to redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Failed to upload audio. Please try again.");
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-2xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to EchoDoc</CardTitle>
            <CardDescription>
              Let's set up your profile step by step
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 min-h-[400px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">What's your name?</Label>
                    <Input
                      id="name"
                      placeholder="Dr. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleNextStep} className="w-full mt-4">
                    Next
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="space-y-4">
                    <div className="text-lg font-medium mb-4">
                      Record your voice to create your agents
                    </div>
                    <Tabs defaultValue="record" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="record">Record Voice</TabsTrigger>
                        <TabsTrigger value="upload">Upload Audio</TabsTrigger>
                      </TabsList>

                      <TabsContent value="record" className="space-y-4">
                        <div className="flex flex-col items-center gap-4">
                          <Button
                            onClick={
                              isRecording ? stopRecording : startRecording
                            }
                            variant={isRecording ? "destructive" : "default"}
                            className="w-full"
                          >
                            {isRecording ? (
                              <motion.div
                                className="flex items-center justify-center"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                              >
                                <StopCircle className="mr-2 h-4 w-4" />
                                Stop Recording
                              </motion.div>
                            ) : (
                              <>
                                <Mic className="mr-2 h-4 w-4" />
                                Start Recording
                              </>
                            )}
                          </Button>
                          {recordedBlob && !isRecording && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="w-full"
                            >
                              <audio
                                src={URL.createObjectURL(recordedBlob)}
                                controls
                                className="w-full"
                              />
                            </motion.div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="upload" className="space-y-4">
                        <div className="flex flex-col items-center gap-4">
                          <Label htmlFor="audio-upload" className="w-full">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex flex-col items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition-colors"
                            >
                              <Upload className="h-8 w-8 text-gray-500" />
                              <span className="text-sm text-gray-500">
                                Upload audio file (MP3, WAV)
                              </span>
                            </motion.div>
                          </Label>
                          <Input
                            id="audio-upload"
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                          {recordedBlob && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="w-full"
                            >
                              <audio
                                src={URL.createObjectURL(recordedBlob)}
                                controls
                                className="w-full"
                              />
                            </motion.div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                    <div className="flex gap-4 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="w-full"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="w-full"
                        disabled={!recordedBlob}
                      >
                        Continue to Dashboard
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
