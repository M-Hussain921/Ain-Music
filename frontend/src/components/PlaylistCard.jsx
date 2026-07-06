import { PlayButton } from "./AudioPlayButton";

const PlaylistCard = ({ playlist }) => {
  return (
    <div className="min-w-40 max-w-40 shrink-0 group relative">
      <div className="relative w-full aspect-square rounded-xl  bg-zinc-800 overflow-hidden">
        <img
          src={playlist.image}
          alt={playlist.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ">
          {/* <PlayButton song={song} /> */}
        </div>
      </div>

      
        <p className="text-white font-semibold">{playlist.title}  
        </p>
      
    </div>
  );
};
