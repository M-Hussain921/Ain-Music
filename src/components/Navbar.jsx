import React, { useState,useEffect, useContext } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { MusicContext } from "../context/MusicContext";
import BrandLogo from "../assets/brand-logo2.png";

export const Navbar = () => {
  const [input, setInput] = useState("");
  const { searchMusic } = useContext(MusicContext);
  const [scrolled, setScrolled] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    searchMusic(input);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
  className="w-full px-8 py-1.5 flex items-center justify-between sticky top-0 left-0 z-50 transition-all bg-transparent backdrop-blur-3xl border-b border-brand-light/40"
>
  <div className="flex items-center justify-between w-full">
      <form onSubmit={handleSearch} className="relative w-96 group">
          <input
            type="text"
            placeholder="Search for artists, songs, or albums..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-surface text-sm text-text-primary pl-11 pr-4 py-2.5 rounded-2xl outline-none border border-brand-light/40 focus:border-brand-primary transition-all placeholder-text-secondary"
          />
          <button
            type="submit"
            className="absolute left-4 top-1/2 -translate-y-1/2 placeholder-text-secondary group-focus-within:text-brandPink transition-colors"
          >
            <FiSearch className="text-lg" />
          </button>
        </form>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => alert(" Backend not ready now! 🔒")}
            className="border border-brand-primary text-text-secondary text-sm flex justify-center font-semibold px-6 py-2 rounded-2xl hover:bg-brand-light  hover:text-white hover:border-none transition-all "
          >
            <FiUser className="mr-2 text-base" /> Login
          </button>
        </div>
  </div>
        
      </header>
    </>
  );
};
