import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { PlayButton } from "../components/AudioPlayButton";
import { FiMusic } from "react-icons/fi";
import { SongsList } from "../components/SongsList";

export const PlaylistDetailPage = () => {
  const { id } = useParams();
  const { playlists, fetchSongById, playAlbum, currentSong, isPlaying } =
    useContext(MusicContext);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const playlist = playlists.find((pl) => pl._id === id);

  useEffect(() => {
    if (!playlist) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(playlist.songs.map((songId) => fetchSongById(songId))).then(
      (results) => {
        setSongs(results.filter(Boolean));
        setLoading(false);
      },
    );
  }, [playlist]);

  if (!playlist) return <p className="p-6">Playlist not found.</p>;
  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-40 h-40 rounded-xl bg-linear-to-br from-brand-primary to-brand-dark flex items-center justify-center">
          <FiMusic className="text-4xl text-white/80" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            {playlist.name}
          </h1>
          <p className="text-text-secondary mt-1">{songs.length} songs</p>
          <button
            onClick={() => songs.length && playAlbum(songs, 0, playlist._id)}
            className="mt-3 px-5 py-2 bg-brand-primary text-white rounded-full font-semibold hover:scale-105 transition"
          >
            Play All
          </button>
        </div>
      </div>

      {songs.length === 0 ? (
        <p className="text-text-secondary">No songs in this playlist yet.</p>
      ) : (
        <SongsList
          songs={songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          pageSize={20}
          showLoadMore={true}
        />
      )}
    </div>
  );
};
