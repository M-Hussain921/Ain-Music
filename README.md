<div align="center">

<img src="frontend/src/assets/brand-logo.png" alt="Ain Music logo" width="160"/>

**A full-stack MERN music streaming web app — discover, play, and organize songs, albums, artists, and playlists.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Caching-DC382D?logo=redis&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-Not_Specified-lightgrey)

</div>

---

## 📖 Overview

**Husnova** is a Spotify-inspired music streaming platform built with the MERN stack. It lets users search and stream songs, browse albums and artists, build and manage playlists, like their favorites, and pick up where they left off with recently-played and most-played tracking — all behind passwordless, OTP-based email authentication.

Song, album, and artist data is proxied from the (unofficial) JioSaavn API through a caching backend layer, with an automatic fallback API if the primary source is unavailable.

---

## ✨ Features

### 🎧 Music Experience
- 🔍 Search songs, albums, and artists
- ▶️ Custom audio player with play/pause, forward/back controls
- 💿 Browse albums and artist detail pages
- 🕓 Recently played tracking
- 🔥 Most played songs, artists & playlists (usage-based ranking)

### ❤️ Personalization
- ❤️ Like/unlike songs, artists, and playlists
- 📂 Create custom playlists and add/remove songs
- 👤 Personal library — "Your Favorites" & "Your Playlists" pages

### 🔐 Authentication
- ✉️ Passwordless sign-in via **email OTP** (no passwords stored)
- ⚡ OTPs cached in **Redis** with a 5-minute expiry
- 🔑 JWT-based sessions (30-day expiry)
- 🛡️ Protected routes on the frontend + auth middleware on the backend
- 🌐 Global auth modal that preserves the user's intended action until they sign in

### ⚙️ Engineering Highlights
- 🧠 Redis caching layer in front of the JioSaavn proxy for faster repeat lookups
- 🔁 Automatic fallback to a secondary JioSaavn API if the primary source fails
- 🐳 Dockerized MongoDB + Redis for local development
- 📱 Fully responsive UI across mobile, tablet, and desktop breakpoints

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Frontend**
- ⚛️ React 19 + Vite
- 🎨 Tailwind CSS 4
- 🧭 React Router 7
- 🪝 Context API (Auth, Music, Auth Modal)
- 🎭 React Icons
- 🔓 jwt-decode

</td>
<td valign="top" width="50%">

**Backend**
- 🟢 Node.js + Express 5
- 🍃 MongoDB + Mongoose
- ⚡ Redis (OTP store + caching)
- 🔐 JSON Web Tokens
- 📧 Nodemailer + Gmail API (`googleapis`) for OTP emails
- 🐳 Docker Compose (Mongo + Redis)

</td>
</tr>
</table>

---

## 📁 Project Structure

```
Ain-Music/
├── backend/
│   ├── config/            # MongoDB & Redis client setup
│   ├── controllers/       # auth, user, and JioSaavn-proxy logic
│   ├── middleware/        # JWT auth middleware
│   ├── models/            # User, Playlist (Mongoose schemas)
│   ├── routes/            # /api/auth, /api/user, /api routes
│   ├── services/          # JioSaavn API service layer
│   ├── utils/             # OTP generation, mail sender, email templates,
│   │                      #   fallback fetcher, like/unlike helper
│   ├── scripts/           # Gmail OAuth token generator
│   ├── docker-compose.yml # Local MongoDB + Redis
│   └── server.js          # App entry point
│
└── frontend/
    ├── public/             # Favicons, OG image
    └── src/
        ├── assets/         # Logo & images
        ├── auth/           # ProtectedRoute
        ├── components/     # Player, Navbar, Sidebar, Cards, Buttons...
        ├── context/        # AuthContext, AuthModalContext, MusicContext
        ├── hooks/          # useDebounce, useClickOutside
        ├── pages/          # Home, Albums, Artists, Playlists, Favorites
        ├── routes/         # App.Route.jsx
        └── utils/          # apiClient, mapRawSong, SongDuration, etc.
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (Atlas URI, or run locally via Docker — see below)
- Redis (via Docker, or a hosted instance like Upstash)
- A Google Cloud project with Gmail API access (for sending OTP emails), **or** swap in your own mail sender in `backend/utils/mailSender.js`

### 1️⃣ Clone the repo

```bash
git clone https://github.com/M-Hussain921/Ain-Music.git
cd Ain-Music
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Spin up MongoDB & Redis locally with Docker (optional, if not using hosted services):

```bash
docker-compose up -d
```

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

> Run `node scripts/generateGmailToken.js` to walk through the Google OAuth flow and generate a refresh token.

Start the backend:

```bash
npm run dev
```

### 3️⃣ Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

The app will be available at the Vite dev server URL (default `http://localhost:5173`).

---

## 🔌 API Reference

### Auth — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/send-otp` | Send a one-time login code to an email address |
| POST | `/api/auth/verify-otp` | Verify the OTP and receive a JWT (creates the user if new) |

### JioSaavn Proxy — `/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/search/songs` | Search songs by query |
| GET | `/api/songs` | Get song details by ID |
| GET | `/api/search/artists` | Search artists by query |
| GET | `/api/search/albums` | Search albums by query |
| GET | `/api/albums` | Get album details by ID |
| GET | `/api/artists` | Get artist details by ID |

### User — `/api/user` *(requires auth)*

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
| GET | `/api/user/most-played-songs` | Get top played songs |
| GET | `/api/user/most-played-artists` | Get top played artists |
| GET | `/api/user/most-played-playlists` | Get top played playlists |

**Auth header for protected routes:**
```
Authorization: Bearer <your_jwt_token>
```

---

## 🗺️ Roadmap

- [ ] Deploy production build (frontend + backend) and link it here
- [ ] Volume & seek bar enhancements for the player
- [ ] User listening analytics/dashboard
- [ ] Playlist sharing / public playlists
- [ ] Resolve the "Ain Music" vs "Husnova" branding split across the codebase

---

## 📄 License

Not specified.

## 👨‍💻 Author

**Mohammed Hussain**
MERN Stack Developer
[GitHub — @M-Hussain921](https://github.com/M-Hussain921)

---

<div align="center">

⭐ If you like this project, consider giving it a star on GitHub!

</div>
