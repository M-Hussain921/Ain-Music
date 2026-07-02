import { SongCard } from "./SongCard";
import {ViewAllCard} from "./ViewAllCard"

export const SongSection = ({
  titleStart,
  titleHighlight,
  songs,
  viewAllLink,
}) => {
  return (
    <section className="mt-12 mx-2.5">
      <h2 className="text-2xl font-bold text-text-primary mb-5 ml-2">
        {titleStart}{" "}
        <span className="text-brand-primary">{titleHighlight}</span>
      </h2>

      <div className="flex gap-5 pb-2 overflow-x-auto no-scrollbar">
        {songs?.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
        <ViewAllCard to={viewAllLink} />
      </div>
    </section>
  );
}
