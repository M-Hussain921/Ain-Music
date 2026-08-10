import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { AuthContext } from "../context/AuthContext";
import { AuthModalContext } from "../context/AuthModalContext";
import { FiPlusCircle } from "react-icons/fi";

export const AddToPlaylistButton = ({ song }) => {
  const { addSongToPlaylist } = useContext(MusicContext);
  const { token } = useContext(AuthContext);
  const { requireAuth } = useContext(AuthModalContext);

  const handleClick = (e) => {
    e.stopPropagation();
    requireAuth(() => addSongToPlaylist(song, token));
  };

  return (
    <button onClick={handleClick}>
      <FiPlusCircle className="text-text-secondary hover:text-brand-primary cursor-pointer text-base sm:text-lg transition self-center" />
    </button>
  );
};