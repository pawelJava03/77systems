"use client";

import { useState, useRef } from "react";
import { Mic, Play, Pause, Trash2, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onAudioReady?: (base64: string | null) => void;
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function AudioRecorder({ onAudioReady }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        stream.getTracks().forEach(track => track.stop());
        try {
          const base64 = await blobToBase64(blob);
          onAudioReady?.(base64);
        } catch {
          onAudioReady?.(null);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert("Proszę zezwolić na dostęp do mikrofonu.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    setAudioURL(null);
    onAudioReady?.(null);
    chunksRef.current = [];
    if (audioElRef.current) {
      audioElRef.current.pause();
      audioElRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!audioURL) return;
    if (isPlaying && audioElRef.current) {
      audioElRef.current.pause();
      setIsPlaying(false);
    } else {
      const el = new Audio(audioURL);
      audioElRef.current = el;
      el.play();
      el.onended = () => setIsPlaying(false);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      {!audioURL && !isRecording && (
        <Button
          type="button"
          variant="outline"
          className="border-primary/50 text-primary hover:bg-primary/10 rounded-xl px-6 py-6"
          onClick={startRecording}
        >
          <Mic className="w-5 h-5 mr-2" />
          Nagraj wiadomość
        </Button>
      )}

      {isRecording && (
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="destructive"
            className="rounded-xl px-6 py-6"
            onClick={stopRecording}
          >
            <StopCircle className="w-5 h-5 mr-2" />
            Zatrzymaj nagrywanie
          </Button>
          <span className="text-sm text-muted-foreground flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-ping" />
            Nagrywanie...
          </span>
        </div>
      )}

      {audioURL && (
        <div className="flex items-center gap-3 bg-background/50 p-2 pr-4 rounded-xl border border-white/5 w-full">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-primary/10 shrink-0"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <p className="text-sm text-muted-foreground flex-1">Głosówka nagrana ✓</p>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-red-500 shrink-0"
            onClick={deleteRecording}
            title="Usuń nagranie"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
