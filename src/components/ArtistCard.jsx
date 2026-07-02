export const ArtistCard = ({ artist }) => {
  return (
    <div className="min-w-25 shrink-0 flex flex-col items-center group cursor-pointer">
      
      <div className="w-22.5 h-22.5 rounded-full overflow-hidden bg-zinc-800">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />
      </div>

      <p className="mt-3 text-xs text-text-primary text-center truncate w-full">
        {artist.name}
      </p>
    </div>
  );
};