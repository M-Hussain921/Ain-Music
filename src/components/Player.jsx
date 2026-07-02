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
    handleEnded
  } = useContext(MusicContext);

  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!currentSong) return;
    const audio = audioRef.current;
    audio.src = currentSong.audioUrl;
    audio.play();
    setIsPlaying(true);
  }, [currentSong, setIsPlaying]);

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

    audio.addEventListener("ended", playNext);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

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

      <div className="w-full h-22.5 bg-surface border-t border-brand-light/40 px-4 flex items-center justify-between z-50 bottom-0 left-0">
        <div className="flex items-center gap-4 w-[30%] min-w-45">
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

          <div className="flex justify-center items-center gap-4 ">
            <button
              onClick={() => toggleFavorite(currentSong)}
              className="ml-2"
            >
              <FiHeart
                className={`text-lg transition ${isFav ? "text-brand-primary fill-brand-primary scale-110" : "text-text-secondary hover:text-text-primary"}`}
              />
            </button>
            <div className="relative">
              <button onClick={handleAddClick}>
                <FiPlusCircle className="text-lg text-text-secondary hover:text-text-primary transition" />
              </button>

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

        <div className="flex flex-col items-center justify-center w-[40%] max-w-150 gap-2">
          <div className="flex items-center gap-6">
            <FiShuffle className="text-text-secondary hover:text-brand-primary cursor-pointer text-lg transition" />
            <FiSkipBack
            onClick={playPrevious}
            className="text-text-secondary hover:text-text-primary cursor-pointer text-xl transition hover:scale-105" />

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
             className="text-text-secondary hover:text-text-primary cursor-pointer text-xl transition hover:scale-105" />
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

        <div className="flex items-center justify-end gap-3 w-[30%] min-w-45">
          <FiVolume2 className="text-text-secondary hover:text-text-primary cursor-pointer text-lg" />
          <input
            type="range"
            className="w-24 h-1.5 bg-brand-light/30 rounded-full appearance-none cursor-pointer accent-text-secondary hover:accent-brand-primary"
            defaultValue="80"
          />
        </div>
      </div>
    </>
  );
};
