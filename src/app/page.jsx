"use client";
import Greetings from "../components/Greetings";
import GeminiInputBar from "../components/GeminiInputBar";
import { useMessageHandler } from "../hooks/useMessageHandler";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { input, setInput, isTyping, handlePromptSend } = useMessageHandler();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="relative w-full h-[calc(100vh-110px)]">
      <Greetings />
      <div className="flex justify-center">
        <GeminiInputBar
          id={id}
          input={input}
          setInput={setInput}
          onSend={handlePromptSend}
        />
      </div>
    </main>
  );
}
