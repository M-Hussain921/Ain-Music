import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext.jsx";
import { FiArrowLeft, FiPlay, FiPause } from "react-icons/fi";
import { PlayButton } from "./AudioPlayButton.jsx";
import { formatTime } from "../utils/SongDuration.js";
import { FavoriteButton } from "./FavoriteButton.jsx";

export const SongLists = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    fetchAlbumDetails,
    playAlbum,
    currentSong,
    isPlaying,
    togglePlayPause,
  } = useContext(MusicContext);

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadAlbum = async () => {
      setLoading(true);
      const data = await fetchAlbumDetails(id);
      if (isMounted) {
        setAlbum(data);
        setLoading(false);
      }
    };

    loadAlbum();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <div className="p-6 text-text-primary">Loading album...</div>;
  }

  if (!album) {
    return <div className="p-6 text-text-primary">Album not found</div>;
  }

  const handlePlayAll = () => {
    playAlbum(album.songs, 0);
  };

  const handleSongClick = (index) => {
    const isThisSongPlaying =
      currentSong?.id === album.songs[index].id && isPlaying;

    if (isThisSongPlaying) {
      togglePlayPause();
    } else {
      playAlbum(album.songs, index);
    }
  };

  const totalDuration = album.songs.reduce(
    (acc, song) => acc + song.duration,
    0,
  );

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-text-secondary hover:text-text-primary"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="flex items-end gap-6 mb-8">
        <img
          src={album.image}
          alt={album.title}
          className="w-40 h-40 rounded-xl object-cover shadow-lg"
        />
        <div>
          <p className="text-xs uppercase text-text-secondary tracking-wide">
            Album
          </p>
          <h1 className="text-3xl font-bold text-text-primary">
            {album.title}
          </h1>
          <p className="text-text-secondary mt-1">
            {album.songs.length} songs {formatTime(totalDuration)}
          </p>

          <button
            onClick={handlePlayAll}
            className="mt-4 flex items-center gap-2 bg-brand-primary text-white px-5 py-2 rounded-full hover:scale-105 transition-all"
          >
            <FiPlay /> Play All
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        {album.songs.map((song, index) => {
          const isThisSongPlaying = currentSong?.id === song.id && isPlaying;

          return (
            <div
              key={song.id}
              onClick={() => handleSongClick(index)}
              className="flex items-center gap-4 px-5 py-2 rounded-lg hover:bg-brand-light cursor-pointer group"
            >
              <span className="w-6 text-text-secondary text-sm text-center relative flex items-center justify-center">
                <span
                  className={`${
                    isThisSongPlaying ? "hidden" : "group-hover:hidden"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`absolute ${
                    isThisSongPlaying
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  } transition-opacity`}
                >
                  <PlayButton song={song} />
                </span>
              </span>
              <div className="flex items-center gap-3 flex-1 ml-3">
                <img
                  src={song.coverArt}
                  alt={song.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {song.title}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {song.artist}
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <FavoriteButton song={song} />
                   <div className="text-xs text-text-secondary w-10 text-left font-medium">
                    {formatTime(song.duration)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
