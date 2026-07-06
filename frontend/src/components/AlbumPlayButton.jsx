import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { PlayButtonUI } from "./PlayButtonUI";

export const AlbumPlayButton = ({ album }) => {
  const { currentAlbumId, isPlaying, playAlbum, togglePlayPause, fetchAlbumDetails } = useContext(MusicContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isThisAlbumPlaying = currentAlbumId === album.id && isPlaying;

  const handleClick = async (e) => {
    e.stopPropagation();

    if (currentAlbumId === album.id) {
      togglePlayPause();
      navigate(`/album/${album.id}`);
      return;
    }

    setLoading(true);
    const albumDetails = await fetchAlbumDetails(album.id);
    setLoading(false);

    if (albumDetails?.songs?.length) {
      playAlbum(albumDetails.songs, 0, album.id);
    }
    navigate(`/album/${album.id}`);
  };

  return <PlayButtonUI isActive={isThisAlbumPlaying} isLoading={loading} onClick={handleClick} />;
};