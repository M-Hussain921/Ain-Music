import { useContext, useEffect, useState } from "react";
import HeroImg from "../assets/images/hero-image.png";
import { MusicContext } from "../context/MusicContext.jsx";
import { SongSection } from "../components/SongSection.jsx";
import { ArtistSection } from "../components/ArtistSection.jsx";
import { AlbumCard } from "../components/AlbumCard.jsx";

export const Home = () => {
  const { homeContent } = useContext(MusicContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative ">
      <section className="relative  min-h-[60vh] sm:min-h-[70vh] md:min-h-screen flex items-end overflow-hidden bg-black isolate">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={HeroImg}
            alt="hero"
            fetchPriority="high"
            decoding="async"
            className={`w-full h-full object-cover transition-transform duration-[20000ms] ease-linear ${
              loaded ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/30 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 md:px-6 xl:px-12 pb-12 sm:pb-20 md:pb-28">
          <div className="max-w-3xl ">
            <h1
              className={`text-xl xs:text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight sm:leading-[1.05] tracking-tight transition-all duration-1000 delay-200 ${
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
          </div>
        </div>
      </section>

      <div className="px-4 pt-4 sm:px-6 sm:pt-6">
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
        <AlbumCard title="Top Playist" albums={homeContent.newReleaseAlbums} />
      </div>
    </div>
  );
};
