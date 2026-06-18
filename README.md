# 🃏 AI Card Generator

> **Live Demo (Loom):** [▶️ Watch the full walkthrough](https://www.loom.com/share/df0dcac3a8764b9f8b08fbc05c207406)

A full-stack application that generates beautiful educational flashcards on any topic using cutting-edge AI, streamed in real-time to the browser via WebSockets.

---

## 📖 Project Overview

**AI Card Generator** lets you enter any subject — from "Quantum Physics" to "Ancient Rome" — and instantly receive a set of AI-generated learning cards, each arriving one-by-one in a smooth, streaming experience. It demonstrates how to integrate large language models (LLMs) with real-time WebSocket communication in a modern React + Node.js stack.

### ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI-Powered Generation** | Uses OpenRouter (Llama 3.3 / DeepSeek) via the OpenAI SDK for free, high-quality card generation |
| ⚡ **Real-Time Streaming** | Cards stream one by one over a WebSocket connection (Socket.IO) with a 1-second cadence |
| 🔄 **Auto-Reconnect** | Frontend automatically reconnects if the WebSocket drops |
| 🧪 **Failure Mode** | Toggle "Failure Mode" to intentionally fail Card 3 and test the retry flow |
| 🔁 **Per-Card Retry** | Each failed card has an individual retry button — no need to regenerate the whole set |
| 🎨 **Modern UI** | Clean, animated React interface built with Vite and Tailwind CSS v4 |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│  React + Vite (port 5173)                               │
│  ┌──────────────┐   Socket.IO Client   ┌─────────────┐ │
│  │   App.jsx    │ ◄──────────────────► │  socket.js  │ │
│  │  (UI state)  │                      └─────────────┘ │
│  └──────┬───────┘                                       │
│         │ renders                                       │
│  ┌──────▼───────┐                                       │
│  │   Card.jsx   │  (individual flashcard component)     │
│  └──────────────┘                                       │
└─────────────────────────┬───────────────────────────────┘
                          │ WebSocket (Socket.IO)
┌─────────────────────────▼───────────────────────────────┐
│                       Backend                           │
│  Node.js + Express (port 5000)                          │
│  ┌──────────────┐   ┌──────────────┐  ┌──────────────┐ │
│  │  server.js   │──►│  socket.js   │─►│ AI Service   │ │
│  │  (Express)   │   │ (Socket.IO)  │  │ (OpenRouter) │ │
│  └──────────────┘   └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Flow:**
1. User enters a topic and clicks **Generate**
2. Frontend emits a `generate_cards` Socket.IO event to the backend
3. Backend calls the OpenRouter AI API to generate card content
4. Cards are emitted back one at a time via `card_chunk` events
5. Frontend renders each card as it arrives, with smooth animations

---

## 🛠️ Tech Stack

**Frontend**
- [React 18](https://react.dev/) — component-based UI
- [Vite](https://vitejs.dev/) — blazing-fast dev server & bundler
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling
- [Socket.IO Client](https://socket.io/) — real-time communication

**Backend**
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) — HTTP server
- [Socket.IO](https://socket.io/) — WebSocket layer
- [OpenAI SDK](https://github.com/openai/openai-node) — used to call OpenRouter's API
- [OpenRouter](https://openrouter.ai/) — LLM gateway (Llama 3.3 70B / DeepSeek fallback)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ installed
- An **OpenRouter API key** — get one free at [openrouter.ai](https://openrouter.ai/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Nandanmarepally/AI-card-Generator.git
cd AI-card-Generator
```

---

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create your .env file
# (already provided — just add your key)
```

Your `backend/.env` should contain:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=5000
```

Start the backend server:

```bash
node server.js
# Server running on http://localhost:5000
```

---

### 3. Frontend Setup

Open a **new terminal**:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
# App running on http://localhost:5173
```

---

## 🎮 Usage

1. Open **http://localhost:5173** in your browser
2. Confirm the status badge shows **"Connected"** (green)
3. Type any topic (e.g., *"Machine Learning"*, *"World War II"*, *"JavaScript Closures"*)
4. Click **Generate Cards** and watch the AI stream cards in real time!
5. Toggle **"Failure Mode"** to simulate Card 3 failing — then use the **Retry** button on the failed card

---

## 📁 Project Structure

```
AI-card-Generator/
├── backend/
│   ├── server.js          # Express + Socket.IO server entry point
│   ├── socket.js          # Socket.IO event handlers & card streaming logic
│   ├── services/          # AI service (OpenRouter integration)
│   ├── utils/             # Helper utilities
│   ├── .env               # Environment variables (API key, port)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main app component (state management, UI)
│   │   ├── App.css        # Global styles
│   │   ├── socket.js      # Socket.IO client connection
│   │   ├── components/
│   │   │   └── Card.jsx   # Individual flashcard component
│   │   └── main.jsx       # React entry point
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 🔑 Environment Variables

| Variable | Location | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | `backend/.env` | Your OpenRouter API key |
| `PORT` | `backend/.env` | Backend server port (default: `5000`) |

---

## 📺 Demo

[![Watch the Demo](https://img.shields.io/badge/Loom-Watch%20Demo-00BFFF?style=for-the-badge&logo=loom)](https://www.loom.com/share/df0dcac3a8764b9f8b08fbc05c207406)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ using React, Node.js, Socket.IO, and OpenRouter AI*
