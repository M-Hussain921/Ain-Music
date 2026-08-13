import { useContext, useRef, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import { ArtistCard } from "./ArtistCard";
import { ViewAllCard } from "./ViewAllCard";

export const ArtistSection = () => {
  const { homeContent } = useContext(MusicContext);

  const scrollRef = useRef(null);

  setTimeout(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mb-6 sm:mb-10">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-text-primary">
          Popular <span className="text-brand-primary">Artists</span>
        </h2>
        <ViewAllCard to="/artists" />
      </div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-3 no-scrollbar scroll-smooth -mx-2 px-2"
      >
        {homeContent.popularArtist?.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </section>
  );
};
