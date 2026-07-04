<div align="center">

# 🎨 CPStream Frontend

### The Next.js frontend for CPStream — a livestreaming platform built for competitive programmers.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![LiveKit](https://img.shields.io/badge/LiveKit-000000?style=for-the-badge&logo=livekit&logoColor=white)](https://livekit.io/)

[🔧 Backend Repo](https://github.com/Neha7869/cpstream-backend) • [🐛 Report Bug](https://github.com/Neha7869/cpstream-frontend/issues) • [✨ Request Feature](https://github.com/Neha7869/cpstream-frontend/issues)

</div>

---

## 📖 About

**CPStream** is a competitive-programming focused livestreaming platform where programmers can stream problem-solving sessions, contest practice, upsolving, and live coding discussions using OBS and LiveKit.

This repository contains the **Next.js frontend** for CPStream. It connects with a Spring Boot backend that handles stream metadata, LiveKit ingress generation, viewer tokens, chat APIs, Redis-based chat rate limiting, follow / block features, and webhook-driven live status updates.

---

## ✨ Features

<table>
<tr>
<td>

**🎥 Streaming**
- Live streaming with LiveKit
- OBS support through RTMP ingress
- Streamer dashboard for managing stream details
- Generate connection flow for OBS streaming credentials
- Live badge with LiveKit webhook updates

</td>
<td>

**💬 Chat**
- Real-time viewer chat
- Slow chat support
- Followers-only chat
- Enable / disable chat
- Redis-backed rate limiting

</td>
</tr>
<tr>
<td>

**👥 Social**
- Follow / Unfollow users
- Block / Unblock users
- Community management
- Clerk-based authentication
- Verified user badges

</td>
<td>

**🎨 UI / UX**
- Dark themed responsive UI
- Collapsible sidebar and chat
- Thumbnail upload via UploadThing
- Search page for discovering streamers
- Public home showing live streams first

</td>
</tr>
</table>

### 🧩 CP-Focused Stream Metadata

- 🏆 **Platform** (Codeforces, LeetCode, CodeChef, etc.)
- 📊 **Difficulty** level
- 💻 **Programming language**

---

## 🛠️ Tech Stack

### Frontend

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **UI Library** | React |
| **Styling** | Tailwind CSS |
| **Auth** | Clerk |
| **State** | Zustand |
| **Streaming** | LiveKit Client SDK |
| **File Upload** | UploadThing |

### Backend Integration

- Spring Boot
- PostgreSQL
- Redis
- LiveKit Server SDK
- OBS RTMP Ingress
- Webhook-based live status sync

---

## 🏗️ System Architecture

```
   OBS Studio
       │ RTMP
       ▼
  LiveKit Ingress
       │
       ▼
  LiveKit Room ──── webhook ────▶ Spring Boot Backend
                                        │
                                        ▼
                              PostgreSQL / Redis
                                        │
                                        ▼
                                Next.js Frontend
```

The frontend communicates with the backend for:

- 👤 User sync
- 📺 Stream metadata
- 🔴 Live stream listing
- 🎟️ Viewer token generation
- 🎥 Ingress generation
- 💬 Chat messages
- ⚙️ Chat settings
- 👥 Follow / Block actions

---

## 🔴 Live Streaming Flow

1. Streamer logs in using **Clerk**
2. Streamer opens the creator dashboard
3. Streamer generates a **LiveKit connection**
4. Backend creates an **RTMP ingress** using LiveKit
5. Streamer copies the generated OBS credentials into **OBS**
6. OBS sends the stream to LiveKit
7. LiveKit sends webhook events to the backend
8. Backend updates the stream live status
9. Frontend displays the stream as **live**
10. Viewers open the stream page and watch using a **LiveKit viewer token**

---

## 🖼️ Thumbnail Upload Flow

Streamers can upload a thumbnail from their local device. The frontend handles the upload flow using **UploadThing** and stores the uploaded thumbnail URL with the stream metadata.

The thumbnail is displayed on:

- 🏠 Home page stream cards
- 🔍 Search results
- 📺 Stream preview sections

---

## 📂 Project Structure

```
app/              📱 Next.js app router pages and layouts
actions/          ⚡ Server actions and API interaction helpers
components/       🧩 Reusable UI and stream player components
hooks/            🎣 Custom React hooks
lib/              🛠️  Service functions and utilities
store/            📦 Zustand state stores
public/           🖼️  Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- 📗 Node.js 18+
- 📦 npm or yarn
- 🎥 Running CPStream Backend
- 🔐 Clerk account (free)
- 🎬 LiveKit project (free tier)
- 📤 UploadThing account (free)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Neha7869/cpstream-frontend.git
cd cpstream-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root using `.env.example` as reference:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# LiveKit
NEXT_PUBLIC_LIVEKIT_WS_URL=

# Backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

# UploadThing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

> ⚠️ **Never commit real environment variables.** Keep secrets only in `.env`.

LiveKit API keys, LiveKit API secrets, database credentials, PostgreSQL configuration, and Redis configuration are handled by the **Spring Boot backend**, not by the frontend.

### 4️⃣ Run the Dev Server

```bash
npm run dev
```

Open 👉 **http://localhost:3000**

---

## 🔧 Backend Requirement

The frontend expects the CPStream backend to be running.

Default backend URL:

```
http://localhost:8080
```

The backend handles:

- 🐘 PostgreSQL persistence
- 🧠 Redis chat rate limiting
- 🎥 LiveKit ingress creation
- 🎟️ LiveKit viewer token generation
- 📡 LiveKit webhook handling
- 📺 Stream metadata updates
- 💬 Chat APIs
- 👥 Follow / Block APIs
- 👤 User sync APIs

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run development server |
| `npm run build` | Build the production app |
| `npm run start` | Start the production build |
| `npm run lint` | Run lint checks |

---

## 🔐 Security Notes

Public stream APIs **must never expose** sensitive streaming credentials such as:

- `streamKey`
- `serverUrl`
- `ingressId`

These values should only be visible inside the authenticated streamer dashboard.

The public stream listing should only expose safe metadata such as:

- ✅ Stream title
- ✅ Thumbnail
- ✅ Username
- ✅ Live status
- ✅ Platform
- ✅ Difficulty
- ✅ Language
- ✅ Chat settings

---

## 🚢 Deployment Notes

For production deployment:

1. Deploy the **Spring Boot backend**
2. Deploy **PostgreSQL** and **Redis**
3. Set the deployed backend URL in the frontend environment variables:

```env
NEXT_PUBLIC_BACKEND_URL=
```

4. Configure the **LiveKit webhook** to point to the deployed backend webhook endpoint
5. Add frontend environment variables in the hosting platform (Vercel recommended)
6. Build and deploy the Next.js frontend

Example production backend URL:

```
https://cpstream-backend.example.com
```

Example LiveKit webhook URL:

```
https://cpstream-backend.example.com/api/livekit/webhook
```

---

## ✅ Current Status

- ✅ LiveKit streaming tested successfully
- ✅ OBS connection tested successfully
- ✅ Live badge tested successfully
- ✅ Chat tested successfully
- ✅ Redis chat rate limiting tested successfully
- ✅ Thumbnail upload from local device tested
- ✅ Public stream key exposure fixed
- ✅ Environment files protected from Git commits

---

## 💡 About CPStream

CPStream is built for **competitive programmers** who want to stream problem-solving, upsolving, contest practice, and live coding sessions in a focused environment designed around programming platforms, difficulty levels, and language-based discovery.

---

## 👩‍💻 Author

<div align="center">

### **Neha Suryawanshi**

[![GitHub](https://img.shields.io/badge/GitHub-Neha7869-181717?style=for-the-badge&logo=github)](https://github.com/Neha7869)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Neha_Suryawanshi-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/neha-suryawanshi123/)

</div>

---

## 📄 License

This project is open source and available for learning and personal use.

---

<div align="center">

**⭐ If you found this project useful, please give it a star!**

Built with ❤️ by **Neha Suryawanshi** for the competitive programming community.

</div>