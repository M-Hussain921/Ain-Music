import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { Footer } from "../components/Footer";

const ArtistGrid = ({ title, artists, navigate }) => {
  if (!artists || artists.length === 0) return null;
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-6 text-text-primary">{title}</h2>
      <div className="grid grid-cols-6 gap-5">
        {artists.map((artist) => (
          <div
            key={artist.id}
            onClick={() => navigate(`/artist/${artist.id}`)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-30 h-30 rounded-full overflow-hidden bg-zinc-800">
              <img
                src={artist.image}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-text-primary truncate text-center">
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
    <div className="px-6 pt-6">
      <ArtistGrid
        title="Popular Artists"
        artists={homeContent.allArtists}
        navigate={navigate}
      />
      <div className="m-auto text-center text-text-secondary text-xl font-semibold font-mono">
        <h2>----- Every note tells a story. -----</h2>
      </div>
      <Footer />
    </div>
  );
};
