import React, { useState, useEffect, useRef, useContext } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "../context/MusicContext";
import { useClickOutside } from "../hooks/useClickOutside.js";
import { useDebounce } from "../hooks/useDebounce.js";

export const Navbar = () => {
  const [input, setInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { searchResults, searchMusic, playSong,fetchArtistDetails,PlayArtistSongs } = useContext(MusicContext);
  const [loadingKey, setLoadingKey] = useState(null);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  const debouncedInput = useDebounce(input, 400);

  useEffect(() => {
    if (!debouncedInput.trim()) {
      setDropdownOpen(false);
      return;
    }
    searchMusic(debouncedInput);
    setDropdownOpen(true);
  }, [debouncedInput]);

  useClickOutside(containerRef, () =>{ setDropdownOpen(false),setInput("")});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   const closeDropdown = () => {
    setDropdownOpen(false);
    setInput("");
  };

  const handleSongClick = (song) => {
    playSong(song, searchResults.songs);
    closeDropdown();
    if (song.albumId) {
    navigate(`/album/${song.albumId}`);
  } else if (song.artistId) {
    navigate(`/artist/${song.artistId}`);  
  }
  };

  const handleArtistClick = async (artist) => {
    setLoadingKey(`artist-${artist.id}`);
    const details = await fetchArtistDetails(artist.id);
    setLoadingKey(null);

    if (details?.topSongs?.length) {
      PlayArtistSongs(details.topSongs, artist.id);
    }
    closeDropdown();
    navigate(`/artist/${artist.id}`);
  };

   const handlePlaylistClick = async (playlist) => {
    setLoadingKey(`playlist-${playlist.id}`);
    const details = await fetchAlbumDetails(playlist.id);
    setLoadingKey(null);

    if (details?.songs?.length) {
      playAlbum(details.songs, 0, playlist.id);
    }
    closeDropdown();
    navigate(`/album/${playlist.id}`);
  };

  const hasAnyResults =
    searchResults.songs.length > 0 ||
    searchResults.artists.length > 0 ||
    searchResults.playlists.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMusic(input);
    setDropdownOpen(true);
  };

  return (
    <header
      className={`w-full px-8 py-1.5 flex items-center justify-between sticky pointer-events-auto top-0 left-0 z-[999] transition-all border-b border-brand-light/40 ${
        scrolled ? "bg-surface backdrop-blur-3xl" : "bg-transparent backdrop-blur-3xl"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <form onSubmit={handleSubmit} ref={containerRef} className="relative w-96 group">
          <input
            type="text"
            placeholder="Search for artists, songs, or albums..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => input.trim() && setDropdownOpen(true)}
            className="w-full bg-surface text-sm text-text-primary pl-11 pr-4 py-2.5 rounded-2xl outline-none border border-brand-light/40 focus:border-brand-primary transition-all placeholder-text-secondary"
          />
          <button
            type="submit"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brandPink transition-colors"
          >
            <FiSearch className="text-lg" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-full bg-surface border border-brand-light/40 rounded-xl shadow-xl max-h-96 overflow-y-auto z-10">
              {!hasAnyResults ? (
                <p className="px-4 py-3 text-sm text-text-secondary">No results found.</p>
              ) : (
                searchResults.songs.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => handleSongClick(song)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-brand-light/20 cursor-pointer"
                  >
                    <img src={song.coverArt} className="w-9 h-9 rounded object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm text-text-primary truncate">{song.title}</p>
                      <p className="text-xs text-text-secondary truncate">{song.artist}</p>
                    </div>
                  </div>
                ))
              )}
              {searchResults.artists.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold text-text-secondary uppercase">Artists</p>
                  {searchResults.artists.map((artist) => (
                    <div
                      key={artist.id}
                      onClick={() => handleArtistClick(artist)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-brand-light/20 cursor-pointer"
                    >
                      <img src={artist.image} className="w-9 h-9 rounded-full object-cover" />
                      <p className="text-sm text-text-primary truncate">{artist.name}</p>
                      {loadingKey === `artist-${artist.id}` && (
                        <span className="text-xs text-text-secondary ml-auto">Loading...</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
               {searchResults.playlists.length > 0 && (
                <div>
                  <p className="px-4 pt-3 pb-1 text-xs font-semibold text-text-secondary uppercase">Playlists</p>
                  {searchResults.playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      onClick={() => handlePlaylistClick(playlist)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-brand-light/20 cursor-pointer"
                    >
                      <img src={playlist.image} className="w-9 h-9 rounded object-cover" />
                      <p className="text-sm text-text-primary truncate">{playlist.title}</p>
                      {loadingKey === `playlist-${playlist.id}` && (
                        <span className="text-xs text-text-secondary ml-auto">Loading...</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          

             
        </form>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => alert(" Backend not ready now! 🔒")}
            className="border border-brand-primary text-text-secondary text-sm flex justify-center font-semibold px-6 py-2 rounded-2xl hover:bg-brand-light hover:text-white hover:border-none transition-all"
          >
            <FiUser className="mr-2 text-base" /> Login
          </button>
        </div>
      </div>
    </header>
  );
};