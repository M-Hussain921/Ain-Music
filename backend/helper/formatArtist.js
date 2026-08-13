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
  songs: artist.songs || [],

  similarArtists: (artist.similarArtists || []).map((item) => ({
    id: item.id,
    name: item.name,
    image: getArtistImage(item.image, "https://via.placeholder.com/150"),
    url: item.url,
  })),
});