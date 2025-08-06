import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useChatStore = create(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: 0,

      addNewChat: (chat) =>
        set((state) => ({
          chats: [...state.chats, { ...chat, messages: [] }],
        })),

      deleteChat: (chat) => {
        set((state) => ({
          chats: state.chats.filter((ch) => ch.id !== chat.id),
        }));
        toast.error("Chat deleted");
      },

      setCurrentChat: (id) => set({ currentChatId: id }),

      addMessage: (chatId, message) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id == chatId
              ? { ...chat, messages: [...chat.messages, message] }
              : chat
          ),
        })),

      getMessagesByPage: (chatId, page, pageSize) => {
        const chat = get().chats.find((c) => c.id === chatId);
        if (!chat) return [];
        const start = Math.max(chat.messages.length - page * pageSize, 0);
        const end = chat.messages.length - (page - 1) * pageSize;
        return chat.messages.slice(start, end);
      },
      getChatById: (id) => get().chats.find((chat) => chat.id === id),
    }),
    {
      name: "gemini-chat-store", // unique name in localStorage
      // If you only want to persist some parts, use a partialize function
      // partialize: (state) => ({ chats: state.chats, currentChatId: state.currentChatId })
    }
  )
);
