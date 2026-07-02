import { useContext, useState } from "react";
import { MusicContext } from "../context/MusicContext";
import { FiPlay,FiPause } from "react-icons/fi";

export const PlayButton=({song})=>{
    const {
    currentSong,
    isPlaying,
    playSong,
    togglePlayPause,
  } = useContext(MusicContext);

  const [menuOpen,setMenuOpen]=useState(false);

  const isThisSongPlaying = currentSong?.id === song.id && isPlaying;

  const handlePlayClick=(e)=>{
    e.stopPropagation();
     if (currentSong?.id === song.id) {
      togglePlayPause();
    } else {
      playSong(song);
    }
  }

  return (
    <button
      onClick={handlePlayClick}
     className="w-10 h-10 flex items-center justify-center bg-brand-primary text-white rounded-full hover:scale-105 hover:bg-brand-dark transition-all shadow-md shadow-brand-primary/30"
    >
      {isThisSongPlaying 
      ? <FiPause className="text-xl" /> 
      : <FiPlay className="text-xl ml-1" />}
    </button>
  );
}