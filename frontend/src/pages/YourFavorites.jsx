import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { PlayButton } from "../components/AudioPlayButton";
import { SongsList } from "../components/SongsList";
import { FavoriteButton } from "../components/FavoriteButton";
import { AlbumPlayButton } from "../components/AlbumPlayButton";
import { AlbumCard } from "../components/AlbumCard";
import { ArtistCard } from "../components/ArtistCard";

export const YourFavoritesPage = () => {
  const {
    favorites,
    favArtists,
    favAlbums,
    currentSong,
    isPlaying,
    togglePlayPause,
  } = useContext(MusicContext);

  const [activeTab, setActiveTab] = useState("songs");
  const navigate = useNavigate();

  const tabs = [
    { key: "songs", label: "Songs", count: favorites?.length || 0 },
    { key: "artists", label: "Artists", count: favArtists?.length || 0 },
    { key: "albums", label: "Albums", count: favAlbums?.length || 0 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        Your Favorites
      </h1>

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
        <SongsList
          songs={favorites}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onSongClick={(song, index) => {
            if (currentSong?.id === song.id && isPlaying) {
              togglePlayPause();
            } else {
              playArtistSongs(artist.topSongs, index, artist.id);
            }
          }}
        />
      )}

      {activeTab === "artists" &&
        (favArtists?.length === 0 ? (
          <p className="text-text-secondary">No liked artists yet.</p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6">
            {favArtists?.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ))}

      {activeTab === "albums" &&
        (favAlbums?.length === 0 ? (
          <p className="text-text-secondary">No liked albums yet.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {favAlbums.map((album) => (
              <AlbumCard key={album.id} albums={album} />
            ))}
          </div>
        ))}
    </div>
  );
};
