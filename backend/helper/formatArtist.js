const getArtistImage = (images, fallback = "https://via.placeholder.com/500") => {
  return (
    images?.find((img) => img.quality === "500x500")?.url ||
    images?.find((img) => img.quality === "150x150")?.url ||
    images?.[0]?.url ||
    fallback
  );
};

export const formatArtist = (artist) => ({
  id: artist.id,
  name: artist.name,
  image: getArtistImage(artist.image),

  url: artist.url,

  followerCount: artist.followerCount || 0,
  fanCount: artist.fanCount || 0,

  dominantLanguage: artist.dominantLanguage || null,
  dominantType: artist.dominantType || null,

  availableLanguages: artist.availableLanguages || [],

  bio: artist.bio || [],

  topSongs: artist.topSongs || [],
  topAlbums: artist.topAlbums || [],
  songs: artist.singles || [],

  similarArtists: (artist.similarArtists || []).map((item) => ({
    id: item.id,
    name: item.name,
    image: getArtistImage(item.image, "https://via.placeholder.com/150"),
    url: item.url,
  })),
});