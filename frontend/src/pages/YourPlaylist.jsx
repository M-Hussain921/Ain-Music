import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { FiMusic } from "react-icons/fi";

export const YourPlaylistsPage = () => {
  const { playlists } = useContext(MusicContext);
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Your Playlists</h1>
        <button
          onClick={() => navigate("/add-playlist")}
          className="bg-brand-primary text-white px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
        >
          + New Playlist
        </button>
      </div>

      {playlists.length === 0 ? (
        <p className="text-text-secondary">
          You haven't created any playlists yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {playlists.map((pl) => (
            <div
              key={pl._id}
              onClick={() => navigate(`/playlist/${pl._id}`)}
              className="cursor-pointer group"
            >
              <div className="w-full aspect-square rounded-xl bg-linear-to-br from-brand-primary to-brand-dark flex items-center justify-center group-hover:scale-105 transition">
                <FiMusic className="text-4xl text-white/80" />
              </div>
              <p className="mt-3 text-sm font-semibold text-text-primary truncate">
                {pl.name}
              </p>
              <p className="text-xs text-text-secondary">
                {pl.songs.length} {pl.songs.length === 1 ? "song" : "songs"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};