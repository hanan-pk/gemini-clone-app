"use client";
import { useRef, useState } from "react";
import { FaMicrophone, FaPlus } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import {
  PiImageSquareBold,
  PiMagnifyingGlassBold,
  PiSquaresFourBold,
} from "react-icons/pi";
import { SiGoogledrive } from "react-icons/si";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useChatStore } from "@/store/useChatStore";

const GeminiInputBar = ({
  id = "",
  input = "",
  setInput = () => {},
  onSend = () => {},
  selectedImage,
  setSelectedImage,
}) => {
  const fileInputRef = useRef(null);
  const addMessage = useChatStore((s) => s.addMessage);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setSelectedImage(base64);
    };
    reader.readAsDataURL(file);
  };
  const handleSend = () => {
    if (!input && !selectedImage) return;

    onSend(id);
    setInput("");
    setSelectedImage("");
  };

  return (
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-[15]">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="w-full rounded-[28px] border border-[#3c3c3c] text-white px-6 py-5 flex flex-col gap-4">
        {selectedImage && (
          <div className="relative w-fit">
            <Image
              src={selectedImage}
              width={100}
              height={100}
              alt="User Selected Image"
              className="object-cover rounded-lg max-h-[120px]"
            />
          </div>
        )}

        <input
          type="text"
          placeholder="Ask Gemini"
          className="bg-transparent outline-none text-lg placeholder:text-gray-400 w-full text-black dark:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <FaPlus className="text-lg dark:hover:text-white text-gray-500 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FiPaperclip /> Upload files
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SiGoogledrive />
                    Add from Drive
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-1 dark:hover:text-white hover:text-gray-500 cursor-pointer">
              <PiMagnifyingGlassBold className="text-lg" />
              <span>Deep Research</span>
            </div>
            <div className="flex items-center gap-1 dark:hover:text-white hover:text-gray-500 cursor-pointer">
              <PiSquaresFourBold className="text-lg" />
              <span>Canvas</span>
            </div>
            <div
              className="flex items-center gap-1 dark:hover:text-white hover:text-gray-500 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <PiImageSquareBold className="text-lg" />
              <span>Image</span>
            </div>
          </div>

          {input || selectedImage ? (
            <button
              className="bg-[#323537] text-3xl px-2 rounded-full w-[35px] h-[35px] flex items-center justify-center"
              onClick={handleSend}
            >
              <IoMdSend />
            </button>
          ) : (
            <FaMicrophone className="text-gray-400 text-4xl dark:hover:text-white text-gray-500 cursor-pointer p-2" />
          )}
        </div>
      </div>

      <span className="text-gray-500 block mt-4 text-sm w-full text-center">
        Gemini can make mistakes, so double-check it
      </span>
    </div>
  );
};

export default GeminiInputBar;
