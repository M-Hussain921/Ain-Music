import { useContext, useState } from "react";
import { MusicContext } from "../context/MusicContext";
import {PlayButtonUI} from "./PlayButtonUI.jsx";

export const PlayButton=({song})=>{
    const {
    currentSong,
    isPlaying,
    playSong,
    togglePlayPause,
  } = useContext(MusicContext);

  const isThisSongPlaying = currentSong?.id === song.id && isPlaying;

  const handleClick=(e)=>{
    e.stopPropagation();
     if (currentSong?.id === song.id) {
      togglePlayPause();
    } else {
      playSong(song);
    }
  }

 return <PlayButtonUI isActive={isThisSongPlaying} onClick={handleClick} />;
}