import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { ArtistCard } from "./ArtistCard";
import { ViewAllCard } from "./ViewAllCard";

export const ArtistSection = () => {
  const { homeContent } = useContext(MusicContext);

  return (
    <section className="mt-12 mx-2.5">
      
      <h2 className="text-2xl font-bold text-text-primary mb-5 ml-2">
        Popular <span className="text-brand-primary">Artists</span>
      </h2>

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
        {homeContent.popularArtist?.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
 
        <ViewAllCard to="/artists" />
      </div>
    </section>
  );
};