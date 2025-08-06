"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useChatStore } from "../../store/useChatStore";
import { formatChatDate } from "../../utils/dateFormatUtils";
import Link from "next/link";

export default function Search() {
  const chats = useChatStore((s) => s.chats);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.messages?.some((message) =>
      message?.text?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  console.log(filteredChats);
  return (
    <div className="text-white p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-semibold mb-6">Search</h1>

      <div className="flex items-center bg-[#1E1E1E] px-4 py-3 rounded-full mb-6 border border-[#2C2C2C]">
        <FiSearch className="text-gray-400 text-xl mr-2" />
        <input
          type="text"
          placeholder="Search for chats"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#1E1E1E] outline-none w-full text-sm text-white placeholder:text-gray-500"
        />
      </div>

      <p className="text-sm text-gray-400 font-medium mb-3">Recent</p>

      {filteredChats.length === 0 ? (
        <div className="text-gray-500 text-sm mt-6 text-center">
          No matching chats found.
        </div>
      ) : (
        <ul className="divide-y divide-[#2C2C2C]">
          {filteredChats.map((chat) => (
            <li key={chat.id}>
              <Link
                href={`/chatroom/${chat.id}`}
                className="py-3 flex items-center justify-between hover:bg-[#2A2A2A] px-2 rounded-md transition"
              >
                <span className="truncate text-sm max-w-[70%]">
                  {chat.messages?.[0]?.text}
                </span>
                <span className="text-sm text-gray-400">
                  {formatChatDate(chat.messages?.[0]?.timestamp) || "—"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
