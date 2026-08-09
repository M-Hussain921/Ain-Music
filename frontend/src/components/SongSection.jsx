import { SongCard } from "./SongCard";

export const SongSection = ({
  titleStart,
  titleHighlight,
  songs,
}) => {
  return (
    <section className="mt-8 sm:mt-12 w-full px-2 sm:px-4 md:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-5">
        {titleStart}{" "}
        <span className="text-brand-primary">{titleHighlight}</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 ">
        {songs?.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
}
