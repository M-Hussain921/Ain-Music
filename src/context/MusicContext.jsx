import React, { createContext, useState, useEffect } from "react";

export const MusicContext = createContext();

const SAAVN_API = "https://saavn.sumit.co/api";

async function fetchSongsByQuery(query, limit = 10) {
  try {
    console.log(`Trying to connect API Server: ${SAAVN_API}...`);

    const res = await fetch(
      `${SAAVN_API}/search/songs?query=${encodeURIComponent(query)}&limit=${limit}`,
    );

    if (!res.ok) throw new Error("Server down");

    const data = await res.json();
    const results = data?.data?.results || [];
    if (results.length === 0) return [];

    return results.map((song) => ({
      id: song.id || null,
      title: song.name,
      artist: song.artists?.primary?.[0]?.name || "Unknown Artist",
      coverArt:
        song.image?.[2]?.url ||
        song.image?.[2]?.link ||
        "https://via.placeholder.com/150",
      audioUrl:
        song.downloadUrl?.[song.downloadUrl.length - 1]?.url ||
        song.downloadUrl?.[song.downloadUrl.length - 1]?.link,
      duration: song.duration,
    }));
  } catch (error) {
    console.warn(`Server failed. error:${error}`);
  }
}

async function fetchArtistByQuery(query, limit = 10) {
  try {
    const res = await fetch(
      `${SAAVN_API}/search/artists?query=${encodeURIComponent(query)}&limit=${limit}`,
    );

    if (!res.ok) throw new Error("Server down");

    const data = await res.json();
    const results = data?.data?.results || [];
    if (results.length === 0) return [];

    return results.map((artist) => ({
      id: artist.id,
      name: artist.name,
      image: artist.image?.[2]?.url || "https://via.placeholder.com/150",
    }));
  } catch (error) {
    console.warn(`Server failed. error:${error}`);
  }
}

async function fetchAlbumsByQuery(query, limit = 10) {
  try {
    const res = await fetch(
      `${SAAVN_API}/search/albums?query=${encodeURIComponent(query)}&limit=${limit}`,
    );

    if (!res.ok) throw new Error("Server down");

    const data = await res.json();
    const results = data?.data?.results || [];

    return results.map((album) => ({
      id: album.id,
      title: album.name,
      artist: album.primaryArtists || "Unknown",
      image: album.image?.[2]?.url || "https://via.placeholder.com/150",
      year: album.year,
    }));
  } catch (err) {
    console.warn("Album fetch error:", err);
    return [];
  }
}

async function fetchAlbumDetails(id) {
  try {
    const res = await fetch(`${SAAVN_API}/albums?id=${id}`);
    if (!res.ok) throw new Error("Server down");

    const data = await res.json();
    const album = data?.data;
    if (!album) return null;

    const songs = (album.songs || []).map((song) => ({
      id: song.id,
      title: song.name,
      artist: song.artists?.primary?.[0]?.name || "Unknown Artist",
      coverArt:
        song.image?.[2]?.url ||
        song.image?.[2]?.link ||
        "https://via.placeholder.com/150",
      audioUrl:
        song.downloadUrl?.[song.downloadUrl.length - 1]?.url ||
        song.downloadUrl?.[song.downloadUrl.length - 1]?.link,
      duration: song.duration,
    }));
    return{
      id: album.id,
      title: album.name,
      image: album.image?.[2]?.url || "https://via.placeholder.com/150",
      songs,
    };
  } catch (err) {
    console.warn("Album details fetch error:", err);
    return null;
  }
}

export function MusicProvider({ children }) {
  const [homeContent, setHomeContent] = useState({
    weeklyTop: [],
    newReleases: [],
    popularArtist: [],
    topAlbums: [],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My First Playlist", tracks: [] },
  ]);

  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAlbum=(songs,startIndex=0)=>{
    if(!songs || songs.length===0) return;
    setQueue(songs);
    setCurrentIndex(startIndex);
    setCurrentSong(songs[startIndex]);
    setIsPlaying(true);
  };

const playNext=()=>{
  if(queue.length===0) return;
  const nextIndex=(currentIndex+1)%queue.length;
  setCurrentIndex(nextIndex);
  setCurrentSong(queue[nextIndex]);
  setIsPlaying(true);
};

const playPrevious=()=>{
  if(queue.length===0) return;
  const prevIndex=(currentIndex-1+queue.length)%queue.length;
  setCurrentIndex(prevIndex);
  setCurrentSong(queue[prevIndex]);
  setIsPlaying(true);
};

const handleEnded = () => {
  playNext();
};

  const loadHomePageContent = async () => {
    try {
      const [weeklyTop, newReleases] = await Promise.all([
        fetchSongsByQuery("trending bollywood", 12),
        fetchSongsByQuery("New bollywood", 12),
      ]);

      const internationalArtists = [
        "Taylor Swift",
        "Billie Eilish",
        "Ed Sheeran",
        "A.R. Rahman",
        "Sonu Nigam",
      ];

      const indianArtists = [
        "Arijit Singh",
        "Shreya Ghoshal",
        "Armaan Malik",
        "Neha Kakkar",
        "Haney singh",
        "Amitabh Bhattacharya",
      ];

      const artistResults = await Promise.all([
        ...internationalArtists.map((name) => fetchArtistByQuery(name, 1)),
        ...indianArtists.map((q) => fetchArtistByQuery(q, 1)),
      ]);

      const albumsResults = await Promise.all([
        ...internationalArtists.map((name) => fetchAlbumsByQuery(name, 1)),
        ...indianArtists.map((q) => fetchAlbumsByQuery(q, 1)),
      ]);

      const popularArtist = artistResults.flat();
      const topAlbums = albumsResults.flat();

      const uniqueAlbums = Array.from(
        new Map(topAlbums.map((a) => [a.id, a])).values(),
      );

      setHomeContent({
        weeklyTop,
        newReleases,
        popularArtist,
        topAlbums: uniqueAlbums,
      });
    } catch (error) {
      console.error("Home content fetching error", error);
    }
  };

  const searchMusic = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const results = await fetchSongsByQuery(query, 20);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error", error);
    }
  };

  const toggleFavorite = (track) => {
    setFavorites((prevFavs) => {
      const isAlreadyFav = prevFavs.some((item) => item.id === track.id);
      return isAlreadyFav
        ? prevFavs.filter((item) => item.id !== track.id)
        : [...prevFavs, track];
    });
  };

  const createPlaylist = (name) => {
    setPlaylists((prev) => [...prev, { id: Date.now(), name, tracks: [] }]);
  };

  const addSongToPlaylist = (playlistId, track) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((pl) => {
        if (pl.id !== playlistId) return pl;
        const exists = pl.tracks.some((t) => t.id === track.id);
        return exists ? pl : { ...pl, tracks: [...pl.tracks, track] };
      }),
    );
  };

  useEffect(() => {
    loadHomePageContent();
  }, []);

  return (
    <MusicContext.Provider
      value={{
        homeContent,
        searchResults,
        searchMusic,
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        favorites,
        toggleFavorite,
        playlists,
        createPlaylist,
        addSongToPlaylist,
        fetchSongsByQuery,
        fetchArtistByQuery,
        fetchAlbumsByQuery,
        fetchAlbumDetails,
        playSong,
        playAlbum,
        playNext,
        playPrevious,
        togglePlayPause,
        currentIndex,
        queue,
        handleEnded
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
