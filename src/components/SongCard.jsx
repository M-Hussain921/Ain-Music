import { PlayButton } from "./AudioPlayButton";

export const SongCard = ({ song }) => {
  return (
    <div className="min-w-40 max-w-40 shrink-0 group relative">
      <div className="relative w-full aspect-square rounded-xl  bg-zinc-800 overflow-hidden">
        <img
          src={song.coverArt}
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ">
          <PlayButton song={song} />
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold text-text-primary truncate">
        {song.title}
      </p>
      <p className="text-xs text-text-secondary truncate">{song.artist}</p>
    </div>
  );
};