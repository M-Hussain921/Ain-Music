import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { FiPlusCircle } from "react-icons/fi";

export const AddToPlaylistButton = ({ song }) => {
  const { addSongToPlaylist } = useContext(MusicContext);

  return (
    <button onClick={() => addSongToPlaylist(song)}>
      <FiPlusCircle className="text-text-secondary hover:text-brand-primary cursor-pointer text-base sm:text-lg transition self-center" />
    </button>
  );
};