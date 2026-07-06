import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { PlayButtonUI } from "../components/PlayButtonUI";

export const ArtistPlayButton = ({ artist }) => {
  const {
    PlayArtistSongs,
    currentArtistId,
    isPlaying,
    fetchArtistDetails,
    togglePlayPause,
  } = useContext(MusicContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isThisArtistPlaying = currentArtistId === artist.id && isPlaying;

  const handlePlayClick = async (e) => {
    e.stopPropagation();

    if (isThisArtistPlaying) {
      togglePlayPause();
      return;
    }
    setLoading(true);

    const details = await fetchArtistDetails(artist.id);
    setLoading(false);

    if (details?.topSongs?.length) {
      PlayArtistSongs(details.topSongs, 0, artist.id);
    }
    return (
      <PlayButtonUI
        isActive={isThisArtistPlaying}
        isLoading={loading}
        onClick={handleClick}
      />
    );
  };
};
