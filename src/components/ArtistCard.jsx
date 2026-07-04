import { ArtistPlayButton } from "./ArtistPlayButton";
import { useNavigate } from "react-router-dom";

export const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/artist/${artist.id}`)}
      className="min-w-25 shrink-0 flex flex-col items-center group cursor-pointer"
    >
      <div className="relative w-22.5 h-22.5 rounded-full overflow-hidden bg-zinc-800">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />
      </div>

      <p className="mt-3 text-xs text-text-primary text-center group-hover:underline transition truncate w-full">
        {artist.name}
      </p>
    </div>
  );
};
