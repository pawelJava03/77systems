"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Square, Send, ChevronRight, Loader2 } from "lucide-react";

type Step = "RECORDING" | "DETAILS" | "SUCCESS";

export function VoiceRecorderModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("RECORDING");
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("Nie można uzyskać dostępu do mikrofonu.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
  };

  const handleNext = () => {
    if (audioBlob) {
      setStep("DETAILS");
    }
  };

  const handleSubmit = async () => {
    if (!phone || !audioBlob) return;
    setIsSubmitting(true);
    try {
      // Konwertuj blob na base64 Data URL i zapisz bezpośrednio w Firestore
      const audioBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(audioBlob);
      });

      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, audioBase64 }),
      });

      setStep("SUCCESS");
    } catch (err) {
      console.error("Submit error", err);
      alert("Wystąpił błąd podczas wysyłania. Spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setStep("RECORDING");
    setAudioBlob(null);
    setAudioUrl(null);
    setPhone("");
    setIsRecording(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if(!val) setTimeout(resetModal, 300);
    }}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm bg-primary text-black hover:bg-primary/90 h-12 px-8 rounded-full font-medium shadow-[0_0_20px_rgba(255,85,0,0.4)] hover:shadow-[0_0_30px_rgba(255,85,0,0.6)] transition-all gap-2">
        <Mic className="w-5 h-5" />
        Zostaw głosówkę - oddzwonimy
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-center">
            {step === "RECORDING" && "Zostaw Wiadomość Głosową"}
            {step === "DETAILS" && "Zostaw Kontakt"}
            {step === "SUCCESS" && "Dziękujemy"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 min-h-[200px]">
          {step === "RECORDING" && (
            <div className="flex flex-col items-center gap-6 w-full">
              {!audioBlob ? (
                <>
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.5)]' : 'bg-primary/10'}`}>
                    <Button 
                      size="icon" 
                      className={`w-20 h-20 rounded-full [&_svg]:size-8 text-primary-foreground ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
                      onClick={isRecording ? stopRecording : startRecording}
                    >
                      {isRecording ? <Square /> : <Mic />}
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-sm text-center">
                    {isRecording ? "Nagrywanie trwa... (kliknij kwadrat aby zatrzymać)" : "Kliknij ikonę mikrofonu, aby rozpocząć nagrywanie."}
                  </p>
                </>
              ) : (
                <>
                  <audio src={audioUrl!} controls className="w-full" />
                  <div className="flex gap-4 mt-4 w-full">
                    <Button variant="outline" className="flex-1" onClick={resetModal}>Nagraj ponownie</Button>
                    <Button className="flex-1 gap-2 text-primary-foreground" onClick={handleNext}>
                      Dalej <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {step === "DETAILS" && (
            <div className="flex flex-col gap-6 w-full">
              <div className="space-y-2">
                <label className="text-sm font-medium">Twój numer telefonu *</label>
                <Input 
                  placeholder="+48 000 000 000" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 bg-background"
                />
              </div>
              <div className="flex gap-4 mt-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep("RECORDING")}>Wróć</Button>
                <Button 
                  className="flex-1 gap-2 text-primary-foreground" 
                  onClick={handleSubmit}
                  disabled={!phone || isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Wyślij
                </Button>
              </div>
            </div>
          )}

          {step === "SUCCESS" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Wiadomość wysłana!</h3>
              <p className="text-muted-foreground mb-4">Skontaktujemy się z Tobą na podany numer telefonu tak szybko, jak to możliwe.</p>
              <Button className="text-primary-foreground" onClick={() => setOpen(false)}>Zamknij</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
