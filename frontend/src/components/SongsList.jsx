import { PlayButton } from "./AudioPlayButton";
import { FavoriteButton } from "./FavoriteButton";
import { formatTime } from "../utils/SongDuration";
import { useState } from "react";

export const SongsList = ({
  songs,
  currentSong,
  isPlaying,
  onSongClick,
  showIndex = true,
  showFavorite = true,
  showDuration = true,
  className = "",
  pageSize,
  showLoadMore
}) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  if (!songs || songs.length === 0) {
    return <p className="text-text-secondary py-4">No songs available.</p>;
  }

  const visibleSongs = songs.slice(0, visibleCount);
  const hasMore = visibleCount < songs.length;

  return (
    <div className={`flex flex-col ${className}`}>
      {visibleSongs.map((song, index) => {
        const isThisSongPlaying = currentSong?.id === song.id && isPlaying;

        return (
          <div
            key={song.id}
            onClick={() => onSongClick(song, index)}
            className="flex items-center gap-1.5 sm:gap-4 px-2 sm:px-5 py-1.5 sm:py-2 rounded-lg hover:bg-brand-dark cursor-pointer group w-full min-w-0"
          >
            {showIndex && (
              <span className="w-5 sm:w-6 text-text-secondary text-xs sm:text-sm text-center relative flex items-center justify-center shrink-0">
                <span
                  className={`${isThisSongPlaying ? "hidden" : "group-hover:hidden"}`}
                >
                  {index + 1}
                </span>
                <span
                  className={`absolute ${isThisSongPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
                >
                  <PlayButton song={song} />
                </span>
              </span>
            )}

            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <img
                src={song.coverArt}
                alt={song.title}
                className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded object-cover shrink-0"
              />
              <div className="flex-1 min-w-0 ">
                <p className="text-xs xs:text-sm font-medium text-text-primary truncate">
                  {song.title}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {song.artist}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-5 shrink-0">
              {showFavorite && <FavoriteButton item={song} type="song" />}
              {showDuration && (
                <div className="text-[10px] sm:text-xs text-text-secondary w-8 sm:w-10 text-left font-medium">
                  {formatTime(song.duration)}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {showLoadMore && hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 20)}
            className="px-5 py-2 bg-brand-primary text-white rounded-full font-semibold hover:scale-105 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
