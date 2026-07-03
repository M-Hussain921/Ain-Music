import { useContext, useEffect, useRef, useState } from "react";
import {
  FiPlay,
  FiPause,
  FiHeart,
  FiSkipBack,
  FiSkipForward,
  FiShuffle,
  FiRepeat,
  FiVolume2,
  FiPlusCircle,
} from "react-icons/fi";
import { MusicContext } from "../context/MusicContext";
import { formatTime } from "../utils/SongDuration.js";
import { FavoriteButton } from "../components/FavoriteButton.jsx";
import { AddToPlaylistButton } from "../components/AddToPlaylistButton.jsx";

export const Player = () => {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    favorites,
    toggleFavorite,
    playlists,
    addSongToPlaylist,
    playNext,
    playPrevious,
    handleEnded,
    shuffleQueue,
    isShuffled,
    currentIndex,
  } = useContext(MusicContext);

  const audioRef = useRef(null);
  const restartedRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.audioUrl;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [currentSong]);

  useEffect(() => {
    restartedRef.current = false;
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSong]);

  const handlePreviousClick = () => {
    const audio = audioRef.current;
    if (!restartedRef.current) {
      if (audio) {
        audio.currentTime = 0;
        setProgress(0);
      }
      restartedRef.current = true;
    } else {
      playPrevious();
    }
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleAddClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handlePlaylistSelect = (playlistId) => {
    addSongToPlaylist(playlistId, currentSong);
    setMenuOpen(false);
  };

  if (!currentSong) return null;
  const isFav = favorites.some((f) => f.id === currentSong.id);

  return (
    <>
      <audio ref={audioRef} />

      <div className="w-full m-auto h-22.5 bg-surface border-t rounded-t-3xl border-brand-light/40 px-5 flex items-center justify-between z-50 bottom-0 left-0">
        <div className="flex items-center gap-4 max-w-45 min-w-45">
          <img
            src={currentSong.coverArt}
            alt={currentSong.title}
            className="w-14 h-14 rounded-md object-cover shadow-sm"
          />
          <div className="flex flex-col justify-center ">
            <p className="text-sm text-text-primary font-bold truncate max-w-37.5 cursor-pointer hover:underline">
              {currentSong.title}
            </p>
            <p className="text-xs text-text-secondary truncate max-w-37.5 cursor-pointer hover:underline">
              {currentSong.artist}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-[40%] max-w-150 gap-2 m-auto">
          <div className="flex items-center gap-6">
            <FiShuffle
              onClick={shuffleQueue}
              className={`cursor-pointer text-lg transition 
    ${
      isShuffled
        ? "text-brand-primary"
        : "text-text-secondary hover:text-brand-primary"
    }`}
            />
            <FiSkipBack
              onClick={handlePreviousClick}
              className="text-text-secondary hover:text-text-primary cursor-pointer text-xl transition hover:scale-105"
            />

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 flex items-center justify-center bg-brand-primary text-white rounded-full hover:scale-105 hover:bg-brand-dark transition-all shadow-md shadow-brand-primary/30"
            >
              {isPlaying ? (
                <FiPause className="text-xl" />
              ) : (
                <FiPlay className="text-xl ml-1" />
              )}
            </button>

            <FiSkipForward
              onClick={playNext}
              className="text-text-secondary hover:text-text-primary cursor-pointer text-xl transition hover:scale-105"
            />
            <FiRepeat className="text-text-secondary hover:text-brand-primary cursor-pointer text-lg transition" />
          </div>

          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-text-secondary w-10 text-right font-medium">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-brand-light/30 rounded-full appearance-none cursor-pointer accent-brand-primary hover:accent-brand-dark transition"
            />
            <span className="text-xs text-text-secondary w-10 text-left font-medium">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5 pr-5 mr-5">
            <FavoriteButton song={currentSong} />
            <div className="relative">
              <AddToPlaylistButton song={currentSong} />

              {menuOpen && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-surface border border-brand-light/40 rounded-lg shadow-xl w-44 py-1 z-10">
                  {playlists.map((pl) => (
                    <button
                      key={pl.id}
                      onClick={() => handlePlaylistSelect(pl.id)}
                      className="block w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-brand-light/20 hover:text-text-primary"
                    >
                      {pl.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
      </div>
    </>
  );
};
