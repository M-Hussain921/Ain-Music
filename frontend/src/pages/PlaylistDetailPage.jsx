import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { PlayButton } from "../components/AudioPlayButton";
import { FiMusic, FiPlay } from "react-icons/fi";
import { SongsList } from "../components/SongsList";
import { formatTime } from "../utils/SongDuration";
import placeholder from "../assets/images/album-placeholder.png"

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

  const totalDuration = songs.reduce((acc, song) => acc + song.duration, 0);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 mb-6 sm:mb-8 text-center sm:text-left">
         <img
          src={placeholder}
          alt="playlist"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover shadow-lg"
        />
        <div>
          <p className="text-xs uppercase text-text-secondary tracking-wide">
            Album
          </p>
          <h1 className="text-3xl font-bold text-text-primary">
            {playlist.name}
          </h1>
          <p className="text-text-secondary mt-1">
            {songs.length} songs {formatTime(totalDuration)}
          </p>

          <button
            onClick={() => songs.length && playAlbum(songs, 0, playlist._id)}
            className="mt-4 flex items-center justify-center sm:justify-start gap-2 bg-brand-primary text-white px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base rounded-full hover:scale-105 transition-all mx-auto sm:mx-0"
          >
            <FiPlay /> Play All
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
