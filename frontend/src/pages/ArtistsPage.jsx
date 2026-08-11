import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";

export const ArtistGrid = ({ title, artists, navigate }) => {
  if (!artists || artists.length === 0) return null;
  return (
    <div className="mb-6 sm:mb-10 ">
      <h2 className="text-xl font-bold mb-6 text-text-primary">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
        {artists.map((artist) => (
          <div
            key={artist.id}
            onClick={() => navigate(`/artist/${artist.id}`)}
            className="flex flex-col items-center cursor-pointer group relative"
          >
            <div className="rw-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 rounded-full overflow-hidden bg-zinc-800 relative">
              <img
                src={artist.image}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-full" />
            </div>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-text-primary group-hover:underline truncate text-center w-full max-w-[6rem] sm:max-w-none">
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ArtistsPage = () => {
  const { homeContent } = useContext(MusicContext);
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-4 sm:px-6 sm:pt-6">
      <ArtistGrid
        title="Popular Artists"
        artists={homeContent.allArtists}
        navigate={navigate}
      />
      <div className="m-auto text-center text-text-secondary text-base sm:text-xl font-semibold mt-10 px-2 ">
        <h2>----- Every note tells a story. -----</h2>
      </div>
    </div>
  );
};
