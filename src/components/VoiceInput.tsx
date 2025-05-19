
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState<SpeechRecognition | null>(null);
  const { toast } = useToast();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "不支持语音识别",
        description: "您的浏览器不支持语音识别功能",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "正在聆听...",
        description: "请说出您的创作灵感",
      });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      toast({
        title: "语音识别成功",
        description: `识别结果: "${transcript}"`,
      });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      toast({
        title: "语音识别失败",
        description: `错误: ${event.error}`,
        variant: "destructive",
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setRecognitionInstance(recognition);
  };

  const stopListening = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      setIsListening(false);
    }
  };

  return (
    <Button
      type="button"
      variant={isListening ? "destructive" : "outline"}
      size="icon"
      onClick={isListening ? stopListening : startListening}
      className="ml-2"
      title={isListening ? "停止语音输入" : "语音输入"}
    >
      {isListening ? <MicOff /> : <Mic />}
    </Button>
  );
};

export default VoiceInput;
