# 🌟 Gemini Chat App Clone

A modern, clean, and interactive Gemini-style chat interface built with **Next.js 15 App Router**, **Zustand**, **React Hook Form + Zod**, and **Tailwind CSS**. Supports image-based prompts, AI typing simulation, OTP login, message pagination, and infinite scroll.

---
## Screenshots
<img width="2558" height="1359" alt="image" src="https://github.com/user-attachments/assets/a46b8828-ac96-461c-9b57-de137a0a5e9b" />
<img width="2559" height="1360" alt="image" src="https://github.com/user-attachments/assets/ba56eff8-12cf-4315-bf58-781715dd8b78" />
<img width="2445" height="897" alt="image" src="https://github.com/user-attachments/assets/4550e47d-32c0-47ba-acd7-18b8a44529cc" />



## 🔗 Live Demo

👉 [View Live](https://hn-gemini-clone.netlify.app/login)

---

## 📁 Project Structure
.
├── app/
│   ├── page.jsx                    # Main homepage
│   ├── chat/
│   │   └── [id]/
│   │       └── page.tsx            # Chatroom per session
│   ├── login/
│   │   └── page.jsx
│   └── search/
│       └── page.jsx
│
├── components/
│   ├── CharWindowHeader.jsx
│   ├── ChatWindowSideBar.jsx
│   ├── CountrySelector.jsx
│   ├── ThemeToggle.jsx
│   ├── OtpForm.jsx
│   ├── PhoneForm.jsx
│   ├── GeminiIcon.jsx
│   ├── GeminiInputBar.jsx
│   ├── Greetings.jsx
│   └── ui/                        # ShadCN components used
│
├── hooks/
│   ├── useMessageHandler.js        # Handles message input, image upload, and typing
│   └── useTheme.js                 # Handling user theme - Dark | Light
│
├── store/
│   ├── useChatStore.js             # Zustand state for chats
│   └── useSideBarStore.js          # Zustand state for sidebar
│
├── utils/
│   ├── utils.js                    # Global functions
│   ├── fakeGeminiReplyUtils.js     # Generating fake response
│   ├── useDiviceTypeUtils.js       # Getting user screen size
│   └── dateFormatUtils.js          # Formatting dates
│
├── lib/
│   └── validation.js               # Zod schemas for form validation
│
├── public/
│   └── images/
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

# OTP
123 456
