"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import GeminiIcon from "../../../components/GeminiIcon";
import GeminiInputBar from "../../../components/GeminiInputBar";
import { useChatStore } from "../../../store/useChatStore";
import { useMessageHandler } from "../../../hooks/useMessageHandler";
import Greetings from "../../../components/Greetings";
import Image from "next/image";

const MESSAGES_PER_PAGE = 20;

export default function ChatroomPage() {
  const { id } = useParams();
  const chats = useChatStore((s) => s.chats);
  const chat = chats.find((c) => c.id == id);

  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(MESSAGES_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    input,
    setInput,
    isTyping,
    selectedImage,
    setSelectedImage,
    handlePromptSend,
  } = useMessageHandler();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages.length]);

  // Scroll to top loads more messages
  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = async () => {
      if (container.scrollTop === 0 && visibleCount < chat.messages.length) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setVisibleCount((prev) => prev + MESSAGES_PER_PAGE);
          setIsLoadingMore(false);
        }, 500); // simulate delay
      }
    };
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [visibleCount, chat?.messages.length]);

  if (!chat) return <div className="p-6 text-white">Chat not found</div>;

  const visibleMessages = chat.messages.slice(-visibleCount);

  return (
    <div className="dark:text-white text-black p-6 relative h-[calc(100vh-110px)]">
      <div className="max-w-4xl mx-auto">
        {chat.messages.length ? (
          <>
            <div
              ref={containerRef}
              className="p-6 py-14 rounded-lg h-[500px] overflow-y-auto hide-scrollbar !relative"
            >
              {isLoadingMore && (
                <div className="text-center text-sm text-gray-400 mb-4 flex items-center justify-center ">
                  <div className="animate-spin inline-block mr-2">
                    <GeminiIcon isLoading />
                  </div>
                  <span> Loading older messages...</span>
                </div>
              )}

              {visibleMessages.map((msg) => (
                <div
                  key={msg?.id}
                  className={`mb-4 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`relative inline-block px-4 py-3 rounded-b-3xl rounded-l-3xl max-w-xl ${
                      msg.sender === "user"
                        ? "dark:bg-[#3A3A3A] dark:text-white bg-[#E9EEF6] text-black"
                        : ""
                    }`}
                  >
                    {msg.image && (
                      <Image
                        src={msg.image}
                        width={300}
                        height={400}
                        alt="User Selected Image"
                        className="object-cover rounded-lg mb-2"
                      />
                    )}
                    <div className="flex items-center">
                      {msg.sender === "ai" && (
                        <span className="mr-4">
                          <GeminiIcon />
                        </span>
                      )}
                      {msg.text}
                    </div>
                    {msg.sender == "ai" && (
                      <div className="absolute -bottom-6 left-4 flex gap-6 text-lg">
                        <button
                          onClick={() => toast.success("helpful!")}
                          className="text-gray-400 hover:text-white"
                        >
                          <AiOutlineLike />
                        </button>
                        <button
                          onClick={() => toast.success("not helpful!")}
                          className="text-gray-400 hover:text-white"
                        >
                          <AiOutlineDislike />
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(msg.text);
                            toast.success("Copied!");
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          <MdContentCopy />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="text-left italic text-gray-400 relative flex items-center">
                  <span className="animate-spin mr-4">
                    <GeminiIcon isLoading />
                  </span>
                  Gemini is typing...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </>
        ) : (
          <Greetings />
        )}

        <GeminiInputBar
          id={chat?.id}
          input={input}
          setInput={setInput}
          onSend={handlePromptSend}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>
    </div>
  );
}
