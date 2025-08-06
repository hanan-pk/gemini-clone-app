# 🌟 Gemini Chat App Clone

A modern, clean, and interactive Gemini-style chat interface built with **Next.js 15 App Router**, **Zustand**, **React Hook Form + Zod**, and **Tailwind CSS**. Supports image-based prompts, AI typing simulation, OTP login, message pagination, and infinite scroll.

---

## 🔗 Live Demo

👉 [View Live](https://your-live-url.vercel.app)

---

## 📁 Project Structure

.
├── app/
│ ├── page.jsx # Main homepage
│ └── chat/[id]/page.tsx # Chatroom per session
│ └── login/  
│ └── page.jsx
│ └── search/  
│ └── page.jsx
│
├── components/
│ ├── CharWindowHeader.jsx
│ ├── ChatWindowSideBar.jsx
│ ├── CountrySelector.jsx
│ ├── ThemeToggle.jsx
│ ├── OtpForm.jsx
│ ├── PhoneForm.jsx
│ ├── GeminiIcon.jsx
│ ├── GeminiInputBar.jsx
│ ├── Greetings.jsx
│ └── ui/ # ShadCN components used
│
├── hooks/
│ └── useMessageHandler.js # Handles message input, image upload, and typing
│ └── useTheme.js # Handling user theme - Dark | Light
│
├── store/
│ └── useChatStore.js # Zustand state for chats
│ └── useSideBarStore.js # Zustand state for sidebar
│
├── utils/
│ └── utils.js # global functions
│ └── fakeGeminiReplyUtils.js # Generating fake response
│ └── useDiviceTypeUtils.js # Getting user screen size
│ └── dateFormatUtils.js # Formating dates
│
├── lib/
│ └── validation.js # Zod schemas for form validation
│
├── public/
│ └── images/
│
└── styles/
└── globals.css

## ⚙️ Setup & Run Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gemini-chat-clone.git
cd gemini-chat-clone

npm install
# or
yarn install


npm run dev

```
