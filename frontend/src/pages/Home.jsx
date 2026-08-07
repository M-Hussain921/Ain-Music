import { useContext, useEffect, useState } from "react";
import HeroImg from "../assets/images/hero-image.png";
import { MusicContext } from "../context/MusicContext";
import { SongSection } from "../components/SongSection";
import { ArtistSection } from "../components/ArtistSection";
import { AlbumSection } from "../components/AlbumSection";

export const Home = () => {
  const { homeContent } = useContext(MusicContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-end overflow-hidden bg-black isolate">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={HeroImg}
            alt="hero"
            className={`w-full h-full object-cover transition-transform duration-[20000ms] ease-linear ${
              loaded ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/30 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 md:pb-28">
          <div className="max-w-3xl">

            <h1
              className={`text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight sm:leading-[1.05] tracking-tight transition-all duration-1000 delay-200 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              All the <span className="text-brand-primary">Best</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-dark">
                Songs
              </span>{" "}
              in One Place
            </h1>

            <p
              className={`mt-4 sm:mt-6 max-w-lg text-text-secondary text-base md:text-lg leading-relaxed transition-all duration-1000 delay-500 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Access an amazing collection of popular and new songs. Stream your
              favorite tracks in high quality and enjoy without interruptions.
            </p>

            <div
              className={`mt-6 sm:mt-10 flex items-stretch sm:items-center gap-3 sm:gap-4 transition-all duration-1000 delay-700${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <button className="group relative max-w-max sm:w-auto text-center px-5 py-2.5 sm:px-8 sm:py-3.5 bg-brand-primary text-white font-semibold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-brand-primary/25 active:scale-95">
                <span className="relative z-10 text-sm sm:text-base">Discover Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>

              <button className="max-w-max sm:w-auto text-center px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-xl text-white font-semibold border border-white/20 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all active:scale-95">
                <span className="relative z-10 text-sm sm:text-base">Create Playlist</span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="px-0 sm:px-3 py-2 sm:py-12 space-y-8 sm:space-y-14 md:space-y-16">
        <SongSection
          titleStart="Weekly Top"
          titleHighlight="Songs"
          songs={homeContent.weeklyTop}
          viewAllLink="/category/weekly-top"
        />

        <SongSection
          titleStart="New Release"
          titleHighlight="Songs"
          songs={homeContent.newReleases}
          viewAllLink="/category/new-releases"
        />

        <ArtistSection />
        <AlbumSection />
      </div>
    </div>
  );
};