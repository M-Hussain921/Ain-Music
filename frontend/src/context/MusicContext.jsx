import React, { createContext, useState, useEffect } from "react";
import { mapRawSongToSongs } from "../utils/mapRawSong";

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

    return results.map(mapRawSongToSongs);
  } catch (error) {
    console.warn(`Server failed. error:${error}`);
    return [];
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
    return [];
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
      artist: album.artists.primary[0].name || "Unknown",
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

    const songs = (album.songs || []).map(mapRawSongToSongs);
    return {
      id: album.id,
      title: album.name,
      artist: album.primaryArtists || "Unknown Artist",
      image: album.image?.[2]?.url || "https://via.placeholder.com/150",
      songs,
    };
  } catch (err) {
    console.warn("Album details fetch error:", err);
    return null;
  }
}

async function fetchArtistDetails(id) {
  try {
    const res = await fetch(`${SAAVN_API}/artists?id=${id}`);
    if (!res.ok) throw new Error("Server down");

    const data = await res.json();
    const artist = data?.data;
    if (!artist) return null;

    const bioText = (artist.bio || [])
      .filter((b) => b?.text)
      .sort((a, b) => (a.sequence || 0) - (b.sequence || 0))
      .map((b) => b.text)
      .join("\n\n");

    const topSongs = (artist.topSongs || []).map(mapRawSongToSongs);
    const allSongs = (artist.songs || []).map(mapRawSongToSongs);

    const topAlbums = (artist.topAlbums || []).map((album) => ({
      id: album.id,
      title: album.name,
      artist: album.artists?.primary?.[0]?.name || "Unknown",
      image: album.image?.[2]?.url || "https://via.placeholder.com/150",
      songCount: album.songCount,
    }));

    return {
      id: artist.id,
      name: artist.name,
      image: artist.image?.[2]?.url || "https://via.placeholder.com/150",
      bio: bioText || null,
      topSongs,
      topAlbums,
    };
  } catch (err) {
    console.warn("Artist details fetch error:", err);
    return null;
  }
}

export function MusicProvider({ children }) {
  const [homeContent, setHomeContent] = useState({
    weeklyTop: [],
    newReleases: [],
    popularArtist: [],
    topAlbums: [],
    trendingAlbums: [],
    newReleaseAlbums: [],
  });
  const [searchResults, setSearchResults] = useState({
    songs: [],
    artists: [],
    playlists: [],
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My First Playlist", tracks: [] },
  ]);

  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [originalQueue, setOriginalQueue] = useState([]);
  const [history, setHistory] = useState([]);

  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off");

  const currentSong = queue[currentIndex];

  const [currentAlbumId, setCurrentAlbumId] = useState(null);
  const [currentArtistId, setCurrentArtistId] = useState(null);

  const playSong = (song, songList = queue) => {
    const index = songList.findIndex((s) => s.id === song.id);
    if (index === -1) {
      setQueue([song]);
      setOriginalQueue([song]);
      setCurrentIndex(0);
    } else {
      setQueue(songList);
      setOriginalQueue(songList);
      setCurrentIndex(index);
    }
    setCurrentAlbumId(null);
    setCurrentArtistId(null);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  };

  const playAlbum = (songs, startIndex = 0, albumId = null) => {
    if (!songs || songs.length === 0) return;

    setQueue(songs);
    setOriginalQueue(songs);
    setCurrentIndex(startIndex);
    setCurrentAlbumId(albumId);
    setCurrentArtistId(null);
    setIsPlaying(true);
  };

  const playArtistSongs = (songs, startIndex = 0, artistId = null) => {
    if (!songs || songs.length === 0) return;
    setQueue(songs);
    setOriginalQueue(songs);
    setCurrentIndex(startIndex);
    setCurrentAlbumId(null);
    setCurrentArtistId(artistId);
    setIsPlaying(true);
  };

  const playNext = () => {
    if (repeatMode === "one") {
      return;
    }

    setHistory((prev) => [...prev, queue[currentIndex]]);

    if (currentIndex < queue.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (repeatMode === "all") {
        setCurrentIndex(0);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const playPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (repeatMode === "all") {
      setCurrentIndex(queue.length - 1);
    }
  };
  const shuffleQueue = () => {
    if (queue.length === 0) return;

    if (isShuffled) {
      const index = originalQueue.findIndex(
        (s) => s.id === queue[currentIndex].id,
      );

      setQueue(originalQueue);
      setCurrentIndex(index);
      setIsShuffled(false);
      return;
    }

    const current = queue[currentIndex];
    const newQueue = [...queue];

    for (let i = newQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newQueue[i], newQueue[j]] = [newQueue[j], newQueue[i]];
    }

    const newIndex = newQueue.findIndex((s) => s.id === current.id);

    setOriginalQueue(queue);
    setQueue(newQueue);
    setCurrentIndex(newIndex);
    setIsShuffled(true);
  };

  const handleEnded = () => {
    playNext();
  };

  const loadHomePageContent = async () => {
    try {
      const [weeklyTop, newReleases, trendingAlbums, newReleaseAlbums] =
        await Promise.all([
          fetchSongsByQuery("trending bollywood", 12),
          fetchSongsByQuery("New bollywood", 12),
          fetchAlbumsByQuery("trending bollywood", 15),
          fetchAlbumsByQuery("new bollywood", 15),
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

      const broadArtistQueries = [
        "Arijit Singh",
        "Shreya Ghoshal",
        "Sonu Nigam",
        "Armaan Malik",
        "Neha Kakkar",
        "A.R. Rahman",
        "Jubin Nautiyal",
        "KK singer",
        "Mohit Chauhan",
        "Divine rapper",
        "Ritviz singer",
        "Badshah rapper",
        "Diljit Dosanjh",
        "Honey Singh",
        "AP Dhillon",
        "Sidhu Moosewala",
        "Darshan Raval",
        "Neeti Mohan",
        "Sunidhi Chauhan",
        "Vishal Mishra singer",
        "Anuv Jain",
        "Prateek Kuhad",
        "Atif Aslam",
        "Rahat Fateh Ali Khan",
        "Shaan singer",
        "Kailash Kher",
        "Javed Ali",
        "Sachet Tandon",
        "Jonita Gandhi",
        "Dhvani Bhanushali",
        "Guru Randhawa",
        "B Praak",
        "Ammy Virk",
        "Jassie Gill",
        "Karan Aujla",
        "Nusrat Fateh Ali Khan",
        "Shankar Mahadevan",
        "Ilaiyaraaja",
        "Anirudh Ravichander",
        "Sid Sriram",
        "Amit Trivedi",
        "Pritam composer",
        "Papon singer",
        "Ankit Tiwari",
        "Tulsi Kumar",
        "Palak Muchhal",
        "Shilpa Rao",
        "Monali Thakur",
        "Asees Kaur",
        "Jasleen Royal",
      ];

      const broadArtistResults = await Promise.all(
        broadArtistQueries.map((q) => fetchArtistByQuery(q, 1)),
      );

      const allArtistsFlat = broadArtistResults.flat();

      const uniqueAllArtists = Array.from(
        new Map(allArtistsFlat.map((a) => [a.id, a])).values(),
      );

      setHomeContent({
        weeklyTop,
        newReleases,
        popularArtist,
        topAlbums: uniqueAlbums,
        trendingAlbums,
        newReleaseAlbums,
        allArtists: uniqueAllArtists,
      });
    } catch (error) {
      console.error("Home content fetching error", error);
    }
  };

  const searchMusic = async (query) => {
  if (!query.trim()) {
    setSearchResults({ songs: [], artists: [], playlists: [] });
    return;
  }
  try {
    const [songs, artists, playlists] = await Promise.all([
      fetchSongsByQuery(query, 8),
      fetchArtistByQuery(query, 4),
      fetchAlbumsByQuery(query, 4),   
    ]);
    setSearchResults({ songs, artists, playlists });
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
        currentIndex,
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
        handleEnded,
        shuffleQueue,
        isShuffled,
        toggleRepeat,
        repeatMode,
        currentAlbumId,
        currentArtistId,
        fetchArtistDetails,
        playArtistSongs,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
