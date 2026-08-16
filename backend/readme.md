<div align="center">

# ⚙️ Husnova — Backend

**REST API powering the Husnova music streaming platform — auth, user data, and a cached JioSaavn proxy.**

![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Caching-DC382D?logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

</div>

---

## 📖 Overview

This is the backend API for **Husnova**, a MERN stack music streaming app. It handles:

- ✉️ Passwordless, OTP-based email authentication
- 👤 User data — liked songs/artists/playlists, playlists, recently-played & most-played tracking
- 🎵 A caching proxy in front of the (unofficial) JioSaavn API for songs, albums, and artists — with automatic fallback if the primary source fails

---

## 🛠️ Tech Stack

- 🟢 **Node.js** + **Express 5**
- 🍃 **MongoDB** + **Mongoose**
- ⚡ **Redis** — OTP storage (5-min expiry) & JioSaavn response caching
- 🔐 **JWT** (jsonwebtoken) — 30-day session tokens
- 📧 **Nodemailer** + **Gmail API** (`googleapis`) — sending OTP emails
- 🐳 **Docker Compose** — local MongoDB + Redis
- 🔧 **dotenv**, **cors**, **nodemon**

---

## 📁 Folder Structure

```
backend/
├── config/
│   ├── mongoClient.js       # MongoDB connection
│   └── redisClient.js       # Redis connection
├── controllers/
│   ├── auth.controller.js   # sendOTP, otpVerify
│   ├── user.controller.js   # likes, playlists, recently/most played
│   └── api.controller.js    # JioSaavn search/details endpoints
├── middleware/
│   └── auth.middleware.js   # JWT verification
├── models/
│   ├── user.js               # phoneNumber, email, likes, play counts
│   └── playlist.js           # name, user, songs, isPublic
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   └── api.routes.js
├── services/
│   └── api.service.js        # JioSaavn API calls
├── helper/
│   └── formatArtist.js       # artist response formatting
├── utils/
│   ├── generateOtp.js        # OTP generation
│   ├── mailSender.js         # Nodemailer + Gmail API sender
│   ├── emailTemplate.js      # OTP email HTML template
│   ├── fallBackFetcher.js    # primary → fallback API logic
│   └── toggleLike.js         # like/unlike helper
├── scripts/
│   └── generateGmailToken.js # Gmail OAuth refresh-token generator
├── docker-compose.yml         # Local MongoDB + Redis
└── server.js                  # App entry point
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Atlas URI, or run locally via Docker)
- Redis (via Docker, or a hosted instance like Upstash)
- A Google Cloud project with Gmail API access (for sending OTP emails), **or** swap in your own mail sender in `utils/mailSender.js`

### Installation

```bash
git clone https://github.com/M-Hussain921/Husnova-web-player.git
cd Husnova-web-player/backend
npm install
```

### Local MongoDB + Redis (optional)

If you're not using hosted services, spin them up with Docker:

```bash
docker-compose up -d
```

### Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
JWT_TOKEN=your_jwt_secret

# Gmail API (for sending OTP emails via Nodemailer)
GMAIL_CLIENT_ID=your_google_client_id
GMAIL_CLIENT_SECRET=your_google_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token
GMAIL_USER=your_gmail_address
```

> 💡 Run `node scripts/generateGmailToken.js` to walk through the Google OAuth flow and generate a refresh token for `GMAIL_REFRESH_TOKEN`.

### Run

```bash
npm run dev     # with nodemon (auto-restart)
npm start        # plain node
```

Server starts at `http://localhost:<PORT>`. It connects to MongoDB (required) and Redis (optional — caching disables gracefully if Redis is unreachable).

---

## 🔌 API Reference

### 🔐 Auth — `/api/auth`

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/auth/send-otp` | `{ email }` | Sends a 6-digit OTP to the email, cached in Redis for 5 minutes |
| POST | `/api/auth/verify-otp` | `{ email, OTP }` | Verifies the OTP, creates the user if new, returns a JWT (30-day expiry) |

### 🎵 JioSaavn Proxy — `/api`

| Method | Endpoint | Query Params | Description |
|---|---|---|---|
| GET | `/api/search/songs` | `query`, `limit` | Search songs |
| GET | `/api/songs` | `id` | Get song details |
| GET | `/api/search/artists` | `query`, `limit` | Search artists |
| GET | `/api/search/albums` | `query`, `limit` | Search albums |
| GET | `/api/albums` | `id` | Get album details |
| GET | `/api/artists` | `id` | Get artist details |

> Each of these first tries the primary JioSaavn service; if it fails, it automatically falls back to `https://jiosaavn-api.vercel.app/api`.

### 👤 User — `/api/user` *(requires auth)*

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/liked-song` | Like/unlike a song |
| GET | `/api/user/liked-songs` | Get liked songs |
| POST | `/api/user/liked-playlist` | Like/unlike a playlist |
| GET | `/api/user/liked-playlists` | Get liked playlists |
| POST | `/api/user/liked-artist` | Like/unlike an artist |
| GET | `/api/user/liked-artists` | Get liked artists |
| POST | `/api/user/create-playlist` | Create a new playlist |
| POST | `/api/user/my-playlist` | Add/remove songs from a playlist |
| GET | `/api/user/my-playlists` | Get the user's playlists |
| POST | `/api/user/recently-played-songs` | Track a recently played song |
| GET | `/api/user/recently-played` | Get recently played songs |
| GET | `/api/user/most-played-songs` | Get top played songs (by play count) |
| GET | `/api/user/most-played-artists` | Get top played artists |
| GET | `/api/user/most-played-playlists` | Get top played playlists |

**Auth header for protected routes:**
```
Authorization: Bearer <your_jwt_token>
```

---

## 🗄️ Data Models

**User**
- `phoneNumber` *(optional, unique)*
- `email` *(required, unique)*
- `likedSongs`, `likedPlaylists`, `likedArtists` — arrays of IDs
- `recentlyPlayed` — `[{ songId, playedAt }]`
- `songPlayCounts`, `artistPlayCounts`, `playlistPlayCounts` — `Map<id, count>`

**Playlist**
- `name` *(required)*
- `user` *(ref → User)*
- `songs` — array of song IDs
- `isPublic` *(default: false)*

---


---

## 📄 License

Not specified.

## 👨‍💻 Author

**Mohammed Hussain**
MERN Stack Developer
[GitHub — @M-Hussain921](https://github.com/M-Hussain921)
