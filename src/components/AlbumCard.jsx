import { PlayButton } from "./AudioPlayButton";
import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { useNavigate } from "react-router-dom";
import { FiPlay } from "react-icons/fi";

export  const AlbumCard = ({ albums }) => {
  const navigate = useNavigate();
  const { playAlbum,fetchAlbumDetails } = useContext(MusicContext);

  // const handleAlbumClick = async () => {
  //   navigate(`/album/${albums.id}`);
  // };

  const handleQuickPlay = async (e) => {
    e.stopPropagation();
    const albumDetails = await fetchAlbumDetails(albums.id);
    if(albumDetails && albumDetails.songs.length){
      playAlbum(albumDetails.songs,0);
    }
     navigate(`/album/${albums.id}`);
  };

  return (
    <div  className="min-w-40 max-w-40 shrink-0 group relative">
      <div className="relative w-full aspect-square rounded-xl  bg-zinc-800 overflow-hidden">
        <img
          src={albums.image}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ">
         <button
            onClick={handleQuickPlay}
            className="w-10 h-10 flex items-center justify-center bg-brand-primary text-white rounded-full hover:scale-105 transition-all shadow-md"
          >
            <FiPlay className="text-xl ml-1" />
          </button>
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold text-text-primary truncate">
        {albums.title}
      </p>
    </div>
  );
};