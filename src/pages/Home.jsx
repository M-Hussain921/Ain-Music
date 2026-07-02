import { useContext } from "react";
import HeroImg from "../assets/images/hero-image.png";
import { MusicContext } from "../context/MusicContext";
import {SongSection} from "../components/SongSection";
import { ArtistSection } from "../components/ArtistSection";
import {AlbumSection} from "../components/AlbumSection";
import {SignUpPage} from "./SignUpPage.jsx";
import { Footer } from "../components/Footer.jsx";

export const Home = () => {
  const {homeContent}=useContext(MusicContext);

  return (
    <div>
      <section className="hero-section   relative w-full h-[95vh] flex items-center overflow-x-hidden bg-black">
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent z-10"/>
        <div className="hero-img absolute right-0 top-0 h-full w-full ">
          <img
            src={HeroImg} 
            alt="hero"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        <div className="hero-text relative z-20 max-w-6xl px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            All the <span className="text-brandPink">Best Songs</span> <br />
            in One Place
          </h1>

          <p className="mt-6 max-w-xl text-zinc-400 text-sm md:text-base">
            On our website, you can access an amazing collection of popular and
            new songs. Stream your favorite tracks in high quality and enjoy
            without interruptions.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-brandPink px-6 py-3 rounded-md text-white font-semibold hover:scale-105 transition">
              Discover Now
            </button>

            <button className="border border-brandPink px-6 py-3 rounded-md text-white hover:bg-brandPink/10 transition">
              Create Playlist
            </button>
          </div>
        </div>
      </section>

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

      <ArtistSection/>
      <AlbumSection/>
      <SignUpPage/>
      <Footer/>

    </div>
  );
};
