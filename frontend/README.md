# 🎵 Husnova Web Player

A **Spotify-inspired music streaming web application** built using **React + Vite**, featuring modular architecture, reusable components, and global state management using Context API.

---

## 🚀 Features

* ▶️ Play / Pause songs with custom audio controls
* ❤️ Add / Remove songs from Favorites
* 📂 Create and manage Playlists
* 🎧 Album & Artist browsing
* 🔁 Recently Added & Most Played sections
* 🔐 Authentication (Sign In / Sign Up UI)
* 🛡️ Protected Routes for authorized access
* 📱 Responsive UI with clean layout

---

## 🏗️ Tech Stack

* **Frontend:** React (Vite)
* **State Management:** Context API
* **Routing:** React Router
* **Styling:** TailwindCSS
* **Icons:** React Icons
* **API:** Unofficial JioSaavn API

---

## 📁 Folder Structure

```
frontend/
│── public/
│── src/
│   ├── assets/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   ├── components/
│   │   ├── AddToPlaylistButton.jsx
│   │   ├── AudioPlayButton.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── Navbar.jsx
│   │   ├── Player.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SongCard.jsx
│   │   └── ...
│   ├── context/
│   │   └── MusicContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Albums.jsx
│   │   ├── Artists.jsx
│   │   ├── YourPlaylist.jsx
│   │   └── ...
│   ├── Routes/
│   │   └── AppRoute.jsx
│   ├── utils/
│   │   └── SongDuration.js
│   ├── App.jsx
│   └── main.jsx
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/M-Hussain921/Husnova-web-player.git

# Navigate to project
cd music-app/frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🔌 API Information

This project uses an **unofficial JioSaavn API** for fetching songs, albums, and artist data.

> ⚠️ Note: This API is not officially supported and may break or change without notice.

---

## 🧠 Architecture Highlights

* Component-based scalable structure
* Reusable UI elements (Play, Favorite, Playlist buttons)
* Centralized state management using Context API
* Clean separation of concerns (components, pages, utils)

---

## 📌 Future Improvements

* 🔊 Volume & seek control enhancements
* 💾 Backend integration (Node.js + MongoDB)
* 🔑 Real authentication (JWT)
* 📊 User listening analytics
* 🎨 UI/UX improvements

---

## 👨‍💻 Author

**Mohammed Hussain**
MERN Stack Developer

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
