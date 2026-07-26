import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { PlayButton } from "../components/AudioPlayButton";

export const YourFavoritesPage = () => {
  const { favorites, favArtists, favAlbums } = useContext(MusicContext);
  const [activeTab, setActiveTab] = useState("songs");
  const navigate = useNavigate();

  const tabs = [
    { key: "songs", label: "Songs", count: favorites?.length||0 },
    { key: "artists", label: "Artists", count: favArtists?.length||0 },
    { key: "albums", label: "Albums", count: favAlbums?.length||0 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Your Favorites</h1>

      <div className="flex gap-6 border-b border-brand-light/30 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 px-1 font-semibold transition ${
              activeTab === tab.key
                ? "text-brand-primary border-b-2 border-brand-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {activeTab === "songs" && (
        favorites.length === 0 ? (
          <p className="text-text-secondary">No liked songs yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {favorites.map((song) => (
              <div key={song.id} className="flex items-center gap-4">
                <img src={song.coverArt} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">
                    {song.title}
                  </p>
                  <p className="text-xs text-text-secondary truncate">{song.artist}</p>
                </div>
                <PlayButton song={song} />
              </div>
            ))}
          </div>
        )
      )}

      {activeTab === "artists" && (
        favArtists?.length === 0 ? (
          <p className="text-text-secondary">No liked artists yet.</p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6">
            {favArtists?.map((artist) => (
              <div
                key={artist.id}
                onClick={() => navigate(`/artist/${artist.id}`)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-800">
                  <img
                    src={artist.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </div>
                <p className="mt-2 text-sm text-text-primary truncate text-center">
                  {artist.name}
                </p>
              </div>
            ))}
          </div>
        )
      )}

      {activeTab === "albums" && (
        favAlbums?.length === 0 ? (
          <p className="text-text-secondary">No liked albums yet.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {favAlbums?.map((album) => (
              <div
                key={album.id}
                onClick={() => navigate(`/album/${album.id}`)}
                className="cursor-pointer group"
              >
                <img
                  src={album.image}
                  className="w-full aspect-square rounded-lg object-cover group-hover:scale-105 transition"
                />
                <p className="mt-2 text-sm font-semibold text-text-primary truncate">
                  {album.title}
                </p>
                <p className="text-xs text-text-secondary truncate">{album.artist}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};