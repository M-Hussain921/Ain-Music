import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { PlayButton } from "../components/AudioPlayButton";
import { AlbumCard } from "../components/AlbumCard";

export const ArtistDetailPage = () => {
  const { id } = useParams();
  const { fetchArtistDetails, playAlbum } = useContext(MusicContext);

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("songs");

  useEffect(() => {
    setLoading(true);
    fetchArtistDetails(id).then((data) => {
      setArtist(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (artist && !artist.bio && activeTab === "biography") {
      setActiveTab("songs");
    }
  }, [artist]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!artist) return <p className="p-6">Artist not found.</p>;

  const hasBio = Boolean(artist.bio);
  const tabs = [
    { key: "songs", label: "Songs" },
    { key: "albums", label: "Albums" },
    ...(hasBio ? [{ key: "biography", label: "Biography" }] : []),
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-6 mb-8">
        <img src={artist.image} className="w-40 h-40 rounded-full object-cover" />
        <div>
          <h1 className="text-3xl font-bold">{artist.name}</h1>
          <button
            onClick={() => artist.topSongs.length && PlayArtistSongs(artist.topSongs, 0, artist.id)}
            className="mt-3 px-5 py-2 bg-brand-primary text-white rounded-full font-semibold hover:scale-105 transition"
          >
            Play All
          </button>
        </div>
      </div>

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
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "songs" && (
        <div className="flex flex-col gap-3">
          {artist.topSongs.map((song) => (
            <div key={song.id} className="flex items-center gap-4">
              <img src={song.coverArt} className="w-12 h-12 rounded object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{song.title}</p>
                <p className="text-xs text-text-secondary">{song.artist}</p>
              </div>
              <PlayButton song={song} />
            </div>
          ))}
        </div>
      )}

      {activeTab === "albums" && (
        <div className="grid grid-cols-5 gap-6">
          {artist.topAlbums.map((album) => (
            <AlbumCard key={album.id} albums={album} />
          ))}
        </div>
      )}

      {activeTab === "biography" && hasBio && (
        <p className="text-text-secondary whitespace-pre-line max-w-3xl leading-relaxed">
          {artist.bio}
        </p>
      )}

       <div>
              <h2 className="m-auto text-center text-text-secondary text-xl font-semibold font-mono mt-10">
                ----- Loop it. Live it. -----
              </h2>
            </div>
    </div>
  );
};