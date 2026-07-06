import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Sidebar } from "../components/Sidebar.jsx";
import { SignIn } from "../pages/SignInPage.jsx";
import { SignUpPage } from "../pages/SignUpPage.jsx";
import { AddPlaylist } from "../pages/AddPlaylist.jsx";
import { AlbumDetailPage } from "../components/AlbumDetailPage.jsx";
import {  ArtistsPage } from "../pages/ArtistsPage.jsx";
import { ArtistDetailPage } from "../pages/ArtistDetailPage.jsx";
import { Home } from "../pages/Home.jsx";
import { MostPlayed } from "../pages/MostPlayed.jsx";
import { RecentlyAdded } from "../pages/RecentlyAdded.jsx";
import { YourFavorites } from "../pages/YourFavorites.jsx";
import { YourPlaylist } from "../pages/YourPlaylist.jsx";
import { Layout } from "../components/Layout.jsx";
import { Settings } from "../pages/settingsPage.jsx";
import { AlbumPage } from "../pages/AlbumPage.jsx";

export const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="albums" element={<AlbumPage />} />
        <Route path="artists" element={<ArtistsPage />} />
        <Route path="recently-added" element={<RecentlyAdded />} />
        <Route path="most-played" element={<MostPlayed />} />
        <Route path="your-playlists" element={<YourPlaylist />} />
        <Route path="your-favorites" element={<YourFavorites />} />
        <Route path="add-playlist" element={<AddPlaylist />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/album/:id" element={<AlbumDetailPage />} />
        <Route path="/artist/:id" element={<ArtistDetailPage />} />
      </Route>
    </Routes>
  );
};
