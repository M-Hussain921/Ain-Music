import { AlbumPlayButton } from "./AlbumPlayButton";
import { FavoriteButton } from "./FavoriteButton";
import { AuthContext } from "../context/AuthContext";

export const AlbumCard = ({ albums }) => {

  return (
    <div
      onClick={() => navigate(`/album/${albums.id}`)}
      className="w-full group relative cursor-pointer"
    >
      <div className="relative w-full aspect-square rounded-xl bg-zinc-800 overflow-hidden">
        <img
          src={albums.image}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div
          className="absolute bottom-2 right-2 sm:right-3 flex gap-2 sm:gap-3 md:gap-4 opacity-0 group-hover:opacity-100 z-10 "
          onClick={(e) => e.stopPropagation()}
        >
          <FavoriteButton item={albums} type="albums" />
        </div>
      </div>

      <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm font-semibold text-text-primary truncate">
        {albums.title}
      </p>
      <p className="text-[10px] sm:text-xs text-text-secondary truncate">
        {albums.artist}
      </p>
    </div>
  );
};
