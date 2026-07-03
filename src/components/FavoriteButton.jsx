import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const FavoriteButton = ({ song }) => {
  const { favorites, toggleFavorite } = useContext(MusicContext);

  const isFavorite = favorites.some((s) => s.id === song.id);

  return (
    <button 
    onClick={() => toggleFavorite(song)}>
      {isFavorite ? <FaHeart className className={`text-lg transition ${isFav ? " fill-brand-primary scale-110" : "text-text-secondary hover:text-text-primary"}`} /> : <FaRegHeart />}
    </button>
  );
};