import { PlayButton } from "./AudioPlayButton";
import { FavoriteButton } from "./FavoriteButton";
import { formatTime } from "../utils/SongDuration";

export const SongsList = ({ 
  songs, 
  currentSong, 
  isPlaying, 
  onSongClick,
  showIndex = true,
  showFavorite = true,
  showDuration = true,
  className = ""
}) => {
  if (!songs || songs.length === 0) {
    return <p className="text-text-secondary py-4">No songs available.</p>;
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {songs.map((song, index) => {
        const isThisSongPlaying = currentSong?.id === song.id && isPlaying;

        return (
          <div
            key={song.id}
            onClick={() => onSongClick(song, index)}
            className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2 rounded-lg hover:bg-brand-light cursor-pointer group"
          >
            {showIndex && (
              <span className="w-6 text-text-secondary text-sm text-center relative flex items-center justify-center shrink-0">
                <span className={`${isThisSongPlaying ? "hidden" : "group-hover:hidden"}`}>
                  {index + 1}
                </span>
                <span className={`absolute ${isThisSongPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>
                  <PlayButton song={song} />
                </span>
              </span>
            )}

            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <img 
                src={song.coverArt} 
                alt={song.title} 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded object-cover shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {song.title}
                </p>
                <p className="text-xs text-text-secondary truncate">
                  {song.artist}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-5 shrink-0">
              {showFavorite && <FavoriteButton item={song} type="song" />}
              {showDuration && (
                <div className="text-xs text-text-secondary w-10 text-left font-medium">
                  {formatTime(song.duration)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};