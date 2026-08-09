import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

export const FavoriteButton = ({ item, type }) => {
  const { favorites, favArtists, favAlbums, playlists, toggleFavorite } =
    useContext(MusicContext);

  const { token } = useContext(AuthContext);

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
    toggleFavorite(item, type, token);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center sm:hover:scale-105 sm:hover:bg-brand-dark  text-white rounded-full hover:scale-105 hover:bg-brand-dark transition-all shadow-sm sm:shadow-md shadow-brand-primary/20 sm:shadow-brand-primary/30 disabled:opacity-60 ${isFavorite ? "bg-black/30 sm:bg-transparent" : "bg-brand-primary"}`}
    >
      {isFavorite ? (
        <FaHeart
          className={`text-sm sm:text-lg transition ${isFavorite ? " fill-brand-primary scale-110" : "text-text-secondary hover:text-text-primary"}`}
        />
      ) : (
        <FaRegHeart />
      )}
    </button>
  );
};
