<div align="center">

# 🎯 CPStream Backend

### The Spring Boot API server powering **CPStream** — a livestreaming platform built for competitive programmers.

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![LiveKit](https://img.shields.io/badge/LiveKit-000000?style=for-the-badge&logo=livekit&logoColor=white)](https://livekit.io/)

[🎨 Frontend Repo](https://github.com/Neha7869/cpstream-frontend) • [🐛 Report Bug](https://github.com/Neha7869/cpstream-backend/issues) • [✨ Request Feature](https://github.com/Neha7869/cpstream-backend/issues)

</div>

---

## 📖 About

**CPStream Backend** is the core API server for the CPStream platform. It handles everything server-side for a livestreaming experience built specifically for the **competitive programming community**.

This backend is responsible for:

- 🎥 **Stream Management** — create, update, and fetch stream metadata
- 🔴 **LiveKit Integration** — RTMP ingress creation, viewer token generation, and webhook-based live status updates
- 💬 **Chat Controls** — Redis-backed rate limiting, slow mode, followers-only chat, and chat toggles
- 👥 **Social Features** — follow, unfollow, block, and unblock functionality
- 🔐 **Secure APIs** — sensitive stream secrets are never exposed through public endpoints

---

## ✨ Features

<table>
<tr>
<td valign="top">

### 🎥 Streaming
- LiveKit RTMP ingress generation
- Viewer token generation
- Webhook-driven live status updates
- Stream metadata management
- Secure streamer-only stream configuration

</td>
<td valign="top">

### 💬 Chat
- Redis-backed rate limiting
- Slow chat support
- Followers-only chat
- Enable / disable chat
- Anti-spam safeguards

</td>
</tr>
<tr>
<td valign="top">

### 👥 Social
- Follow system
- Block system
- User synchronization
- Creator-viewer relationship management

</td>
<td valign="top">

### 🔍 Discovery
- Public live stream listing
- Search by title
- Search by platform
- Search by programming language
- Difficulty-based filtering

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Language** | Java 17 |
| **Framework** | Spring Boot 3 |
| **ORM** | Spring Data JPA / Hibernate |
| **Database** | PostgreSQL |
| **Cache / Rate Limiting** | Redis |
| **Streaming** | LiveKit Server SDK |
| **Build Tool** | Maven |

---

## 🏗️ System Architecture

```text
   OBS Studio
       │
       │ RTMP
       ▼
  LiveKit Ingress
       │
       ▼
  LiveKit Room ───── webhook ─────▶ Spring Boot Backend
                                           │
                                           ├── PostgreSQL
                                           │      └── users, streams, follows, blocks, metadata
                                           │
                                           ├── Redis
                                           │      └── chat rate limits, moderation rules
                                           │
                                           ▼
                                     Next.js Frontend
```

---

## 📂 Project Structure

```text
src/
└── main/
    ├── java/com/cpstream/backend/
    │   ├── block/            # Block feature
    │   ├── chat/             # Chat APIs + rate limiting flow
    │   ├── config/           # Backend configuration
    │   ├── follow/           # Follow system
    │   ├── health/           # Health check endpoints
    │   ├── livekit/          # LiveKit token, ingress, webhook
    │   ├── stream/           # Stream metadata and APIs
    │   ├── user/             # User sync and APIs
    │   └── BackendApplication.java
    │
    └── resources/
        ├── application-example.properties
        └── application.properties   # ignored by Git
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- ☕ **Java 17+**
- 📦 **Maven**
- 🐘 **PostgreSQL**
- 🧠 **Redis**
- 🎥 **LiveKit project** ([livekit.io](https://livekit.io))

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Neha7869/cpstream-backend.git
cd cpstream-backend
```

---

### 2️⃣ Configure Environment

Copy the example properties file:

```bash
cp src/main/resources/application-example.properties src/main/resources/application.properties
```

Then update `application.properties`:

```properties
spring.application.name=backend

# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/cpstream
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# LiveKit
livekit.ws-url=wss://YOUR_LIVEKIT_PROJECT.livekit.cloud
livekit.api-key=YOUR_LIVEKIT_API_KEY
livekit.api-secret=YOUR_LIVEKIT_API_SECRET

# Redis
spring.data.redis.host=localhost
spring.data.redis.port=6379

# Chat rate limiting
chat.rate-limit.window-seconds=10
chat.rate-limit.max-messages=5
```

> ⚠️ **Never commit real credentials.**  
> `application.properties` should remain gitignored.

---

### 3️⃣ Start PostgreSQL

Create a database named:

```text
cpstream
```

---

### 4️⃣ Start Redis

Using Docker:

```bash
docker run --name cpstream-redis -p 6379:6379 -d redis:7-alpine
```

---

### 5️⃣ Run the Backend

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
.\mvnw spring-boot:run
```

Backend will start at:

```text
http://localhost:8080
```

---

## 📡 API Overview

### 🎥 Streams

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/streams` | Get all streams |
| `GET` | `/api/streams/live` | Get live streams only |
| `GET` | `/api/streams/search?term=` | Search streams |
| `GET` | `/api/streams/user/{username}` | Get stream by username |
| `PATCH` | `/api/streams/{streamId}` | Update stream metadata |

### 🎬 LiveKit

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/livekit/token` | Generate viewer token |
| `POST` | `/api/livekit/ingress` | Create RTMP ingress |
| `POST` | `/api/livekit/webhook` | LiveKit webhook receiver |

### 💬 Chat / 👥 Users / Follow / Block

Additional endpoints exist for:

- chat controls
- user synchronization
- follow / unfollow
- block / unblock

See the source code inside:

```text
src/main/java/com/cpstream/backend/
```

---

## 🔐 Security

Security is a core part of this backend.

### Public stream APIs **never expose**:
- `streamKey`
- `serverUrl`
- `ingressId`

### Public responses include only safe metadata:
- title
- thumbnail
- username
- live status
- platform
- difficulty
- language
- chat settings

Sensitive stream details are available only where needed for the authenticated streamer.

---

## 🌐 LiveKit Webhook Setup

### Local Testing with ngrok

```bash
ngrok http 8080
```

Then add this webhook URL in your LiveKit dashboard:

```text
https://your-ngrok-url.ngrok-free.app/api/livekit/webhook
```

### Production Webhook URL

```text
https://your-backend-domain.com/api/livekit/webhook
```

---

## 🚢 Deployment

This backend is production-ready and can be deployed on:

- **Render**
- **Railway**
- **Fly.io**
- **Any Docker-compatible VPS / host**

### Recommended Deployment Flow

1. Deploy PostgreSQL
2. Deploy Redis
3. Deploy the backend and configure production environment variables
4. Add the LiveKit webhook URL
5. Update the frontend `NEXT_PUBLIC_BACKEND_URL`

---

## ✅ Current Status

- ✅ LiveKit streaming tested
- ✅ OBS RTMP ingress tested
- ✅ LiveKit webhook tested
- ✅ Live badge updates working
- ✅ Chat rate limiting working
- ✅ Follow / Block system working
- ✅ Public stream key exposure fixed
- ✅ Secret configuration protected

---

## 🧠 Architecture Notes

This backend follows a **feature-based modular structure** for better maintainability and scalability.

### Key design choices:
- **Spring Boot** for robust REST API development
- **PostgreSQL** for structured relational data
- **Redis** for fast chat moderation and rate limiting
- **LiveKit** for real-time livestream infrastructure
- **Feature-based package organization** for cleaner development

This structure makes it easier to extend the platform in the future with features such as:
- notifications
- stream analytics
- moderation dashboard
- chat persistence
- subscriptions or premium features

---

## 👩‍💻 Author

<div align="center">

## **Neha Suryawanshi**

[![GitHub](https://img.shields.io/badge/GitHub-Neha7869-181717?style=for-the-badge&logo=github)](https://github.com/Neha7869)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Neha_Suryawanshi-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/neha-suryawanshi123/)

</div>

---

## 📄 License

This project is open source and available for **learning** and **personal use**.

---

<div align="center">

### ⭐ If you found this project useful, please give it a star!

Built with ❤️ by **Neha Suryawanshi** for the competitive programming community.

</div>