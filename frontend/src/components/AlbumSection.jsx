import { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import { AlbumCard } from "./AlbumCard";
import { ViewAllCard } from "./ViewAllCard";

export const AlbumSection = () => {
  const { homeContent } = useContext(MusicContext);

  return (
    <section className="mt-8 sm:mt-12 w-full px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary ml-0">
          Top <span className="text-brand-primary">Albums</span>
        </h2>
        <ViewAllCard to="/albums" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6  gap-3 sm:gap-4 md:gap-5 lg:gap-6 pb-2">
        {homeContent.topAlbums?.map((albums) => (
          <AlbumCard key={albums.id} albums={albums} />
        ))}
      </div>
    </section>
  );
};