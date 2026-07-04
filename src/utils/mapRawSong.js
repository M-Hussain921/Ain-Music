export const mapRawSongToSongs = (song) => {
  return {
    id: song.id,
    title: song.name,
    artist: song.artists?.primary?.[0]?.name || "Unknown Artist",
    coverArt:
      song.image?.[2]?.url ||
      song.image?.[2]?.link ||
      "https://via.placeholder.com/150",
    audioUrl:
      song.downloadUrl?.[song.downloadUrl.length - 1]?.url ||
      song.downloadUrl?.[song.downloadUrl.length - 1]?.link,
    duration: song.duration,
  };
};
