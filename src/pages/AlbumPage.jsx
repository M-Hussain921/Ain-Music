import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { AlbumPlayButton } from "../components/AlbumPlayButton";

const AlbumGrid = ({ title, albums, navigate }) => {
  if (!albums || albums.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-text-primary">{title}</h2>
      <div className="grid grid-cols-5 gap-6">
        {albums.map((album) => (
           <div
           key={album.id}
                onClick={() => navigate(`/album/${album.id}`)}
                className="min-w-40 max-w-40 shrink-0 group relative cursor-pointer"
              >
                <div className="relative w-full aspect-square rounded-xl bg-zinc-800 overflow-hidden">
                  <img
                    src={album.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <AlbumPlayButton album={album} />
                  </div>
                </div>
          
                <p className="mt-3 text-sm font-semibold text-text-primary truncate">{album.title}</p>
                <p className="text-xs text-text-secondary truncate">{album.artist}</p>
              </div>
        ))}
      </div>
    </div>
  );
};

export const AlbumPage = () => {
  const { homeContent } = useContext(MusicContext);
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <AlbumGrid title="Trending Albums" albums={homeContent.trendingAlbums} navigate={navigate} />
      <AlbumGrid title="New Release Albums" albums={homeContent.newReleaseAlbums} navigate={navigate} />
      <AlbumGrid title="Popular Artist Albums" albums={homeContent.topAlbums} navigate={navigate} />
    </div>
  );
};