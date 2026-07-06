const PlaylistSection = () => {
  const playlists = [
    { title: "Sad Songs", image: "/img/sad.jpg" },
    { title: "Chill Songs", image: "/img/chill.jpg" },
    { title: "Workout Songs", image: "/img/workout.jpg" },
    { title: "Love Songs", image: "/img/love.jpg" },
    { title: "Happy Songs", image: "/img/happy.jpg" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Mood <span className="text-pink-500">Playlist</span>
      </h2>

      <div className="flex gap-4 overflow-x-auto">
        {playlists.map((p, i) => (
          <PlaylistCard key={i} playlist={p} />
        ))}
      </div>
    </div>
  );
};