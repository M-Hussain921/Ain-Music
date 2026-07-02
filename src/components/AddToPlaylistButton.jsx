import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { FiPlus } from "react-icons/fi";

export const AddToPlaylistButton = ({ song }) => {
  const { addToPlaylist } = useContext(MusicContext);

  return (
    <button onClick={() => addToPlaylist(song)}>
      <FiPlus />
    </button>
  );
};