import { useContext, useEffect } from "react";
import { MusicContext } from "../context/MusicContext";
import { ViewAllCard } from "./ViewAllCard";
import {AlbumCard} from "./AlbumCard"

export const AlbumSection = () => {
 const { homeContent } = useContext(MusicContext);

  return (
    <section className="mt-12 mx-2.5">

      <h2 className="text-2xl font-bold text-text-primary mb-5 ml-2">
        Top <span className="text-brand-primary">Albums</span>
      </h2>

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
       {homeContent.topAlbums?.map((albums) => (
                 <AlbumCard  key={albums.id} albums={albums} />
               ))}
               <ViewAllCard to="/albums" />
      </div>
    </section>
    
  );
};