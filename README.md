<div align="center">

# 🎯 CPStream

### A livestreaming platform built for competitive programmers.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![LiveKit](https://img.shields.io/badge/LiveKit-000000?style=for-the-badge&logo=livekit&logoColor=white)](https://livekit.io/)

[🔧 Backend](./cpstream-backend) • [🎨 Frontend](./cpstream-frontend) • [🐛 Report Bug](https://github.com/Neha7869/cpstream/issues)

</div>

---

## 📖 About

**CPStream** is a competitive-programming focused livestreaming platform where programmers can stream problem-solving sessions, contest practice, upsolving, and live coding discussions using OBS and LiveKit.

---

## 📁 Project Structure

    cpstream/
    ├── cpstream-frontend/     # Next.js 14 Frontend
    └── cpstream-backend/      # Spring Boot 3 Backend

---

## ✨ Features

<table>
<tr>
<td>

**🎥 Streaming**
- Live streaming with LiveKit
- OBS support through RTMP ingress
- Streamer dashboard
- Live badge updates via webhook

</td>
<td>

**💬 Chat**
- Real-time viewer chat
- Slow chat support
- Followers-only chat
- Redis-backed rate limiting

</td>
</tr>
<tr>
<td>

**👥 Social**
- Follow / Unfollow users
- Block / Unblock users
- Clerk-based authentication

</td>
<td>

**🔍 Discovery**
- Search by platform
- Search by difficulty
- Search by language
- Live streams first

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Frontend
| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | Clerk |
| Streaming | LiveKit Client SDK |
| File Upload | UploadThing |
| State | Zustand |

### Backend
| Category | Technology |
|----------|-----------|
| Language | Java 17 |
| Framework | Spring Boot 3 |
| Database | PostgreSQL |
| Cache | Redis |
| Streaming | LiveKit Server SDK |
| Build Tool | Maven |

---

## 🏗️ System Architecture

    OBS Studio
        │ RTMP
        ▼
    LiveKit Ingress
        │
        ▼
    LiveKit Room ──── webhook ────▶ Spring Boot Backend
                                           │
                                           ├── PostgreSQL
                                           └── Redis
                                           │
                                           ▼
                                   Next.js Frontend

---

## 🚀 Deployment

| Part | Platform |
|------|---------|
| Frontend | Vercel |
| Backend | Render |
| Database | Render PostgreSQL |
| Cache | Render Redis |

---

## 🔴 Live Streaming Flow

1. Streamer logs in using **Clerk**
2. Streamer generates a **LiveKit connection** from dashboard
3. Backend creates an **RTMP ingress** using LiveKit
4. Streamer copies credentials into **OBS**
5. OBS sends stream to **LiveKit**
6. LiveKit sends **webhook** events to backend
7. Backend updates the **live status**
8. Viewers watch using a **LiveKit viewer token**

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- Maven
- PostgreSQL
- Redis
- LiveKit project
- Clerk account
- UploadThing account

### 1. Clone the Repository

    git clone https://github.com/Neha7869/cpstream.git
    cd cpstream

### 2. Setup Backend

    cd cpstream-backend
    cp src/main/resources/application-example.properties src/main/resources/application.properties
    # Fill in your values in application.properties
    ./mvnw spring-boot:run

### 3. Setup Frontend

    cd cpstream-frontend
    npm install
    # Create .env.local and fill in your values
    npm run dev

---

## ✅ Current Status

- ✅ LiveKit streaming tested
- ✅ OBS RTMP ingress tested
- ✅ LiveKit webhook tested
- ✅ Live badge updates working
- ✅ Chat rate limiting working
- ✅ Follow / Block system working
- ✅ Thumbnail upload working
- ✅ Secret configuration protected

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