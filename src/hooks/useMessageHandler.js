import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { getGeminiReply } from "../utils/fakeGeminiReplyUtils";
import toast from "react-hot-toast";

export const useMessageHandler = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const addMessage = useChatStore((s) => s.addMessage);
  const [selectedImage, setSelectedImage] = useState("");

  const handlePromptSend = (id) => {
    if (!input.trim()) return toast.error("Please enter prompt!");
    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "user",
      image: selectedImage || null,
      timestamp: new Date(),
    };
    addMessage(id, userMsg);
    setIsTyping(true);
    setInput("");

    setTimeout(() => {
      addMessage(id, {
        id: Date.now() + 1,
        text: getGeminiReply(input),
        sender: "ai",
        timestamp: new Date(),
      });
      setIsTyping(false);
    }, 1500);
  };
  return {
    input,
    setInput,
    isTyping,
    selectedImage,
    setSelectedImage,
    handlePromptSend,
  };
};
