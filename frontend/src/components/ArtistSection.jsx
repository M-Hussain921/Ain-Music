import { useContext,useRef,useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import { ArtistCard } from "./ArtistCard";
import { ViewAllCard } from "./ViewAllCard";

export const ArtistSection = () => {
  const { homeContent } = useContext(MusicContext);

   const scrollRef = useRef(null);


   setTimeout(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
  }
}, 100);

useEffect(() => {
  const timer = setTimeout(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, 100);
  return () => clearTimeout(timer);
}, []);

  return (
    <section className="mt-8 sm:mt-12 w-full px-2 sm:px-4 md:px-6 lg:px-8 ">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary ml-0">
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