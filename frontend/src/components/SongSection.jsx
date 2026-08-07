import { SongCard } from "./SongCard";

export const SongSection = ({
  titleStart,
  titleHighlight,
  songs,
}) => {
  return (
    <section className="mt-12 w-full px-4 sm:px-2 md:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-5">
        {titleStart}{" "}
        <span className="text-brand-primary">{titleHighlight}</span>
      </h2>

      <div className="pb-2 grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-5 lg:grid-cols-5">
        {songs?.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
}
