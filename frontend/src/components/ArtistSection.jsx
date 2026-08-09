import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { ArtistCard } from "./ArtistCard";
import { ViewAllCard } from "./ViewAllCard";

export const ArtistSection = () => {
  const { homeContent } = useContext(MusicContext);

  return (
    <section className="mt-8 sm:mt-12 w-full px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary ml-0">
          Popular <span className="text-brand-primary">Artists</span>
        </h2>
        <ViewAllCard to="/artists" />
      </div>

      <div className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2">
        {homeContent.popularArtist?.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </section>
  );
};