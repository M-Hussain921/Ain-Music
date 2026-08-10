import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { AuthModalContext } from "../context/AuthModalContext";

export const FavoriteButton = ({ item, type }) => {
  const { favorites, favArtists, favAlbums, playlists, toggleFavorite } =
    useContext(MusicContext);
  const { token } = useContext(AuthContext);
  const { requireAuth } = useContext(AuthModalContext);

  const getList = () => {
    switch (type) {
      case "song":
        return favorites;
      case "artist":
        return favArtists;
      case "album":
        return favAlbums;
      case "playlist-song":
        return playlists;
      default:
        return [];
    }
  };

  const list = getList();

  const isFavorite = Array.isArray(list)
    ? list.some((i) => i.id === item.id)
    : false;

  const handleClick = (e) => {
    e.stopPropagation();
    requireAuth(() => toggleFavorite(item, type, token));
  };

  return (
    <button
      onClick={handleClick}
      className={`w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 flex items-center justify-center sm:hover:scale-105 sm:hover:bg-brand-dark  text-white rounded-full hover:scale-105 hover:bg-brand-dark transition-all disabled:opacity-60 ${isFavorite ? "bg-black/30 sm:bg-transparent" : "bg-brand-primary"}`}
    >
      {isFavorite ? (
        <FaHeart
          className={`text-xs xs:text-sm sm:text-lg transition ${isFavorite ? " fill-brand-primary scale-110" : "text-text-secondary hover:text-text-primary"}`}
        />
      ) : (
        <FaRegHeart className="text-xs xs:text-sm sm:text-lg" />
      )}
    </button>
  );
};