import fetch from "node-fetch";

const SAAVN_API = "https://saavn.sumit.co/api";

const cache = new Map();

const getCached = (key) => cache.get(key);
const setCache = (key, data) => {
  cache.set(key, data);
  setTimeout(() => cache.delete(key), 5 * 60 * 1000); 
};

export const fetchSongsByQuery = async (query, limit = 10) => {
  const key = `songs:${query}:${limit}`;

  if (getCached(key)) return getCached(key);

  const res = await fetch(
    `${SAAVN_API}/search/songs?query=${encodeURIComponent(query)}&limit=${limit}`
  );

  if (!res.ok) {
  const errorBody = await res.text();
  console.error(`Saavn API failed — status: ${res.status}, body: ${errorBody}`);
  throw new Error("Saavn API failed");
}

  const data = await res.json();
  const results = data?.data?.results || [];

  setCache(key, results);
  return results;
};

export const fetchSongById = async (id) => {
  const key = `song:${id}`;
  if (getCached(key)) return getCached(key);

  const res = await fetch(`${SAAVN_API}/songs?id=${id}`);
  if (!res.ok) {
  const errorBody = await res.text();
  console.error(`Saavn API failed — status: ${res.status}, body: ${errorBody}`);
  throw new Error("Saavn API failed");
}

  const data = await res.json();
  const result = data?.data?.[0] || null;

  setCache(key, result);
  return result;
};

export const fetchArtistsByQuery = async (query, limit = 10) => {
  const key = `artists:${query}:${limit}`;
  if (getCached(key)) return getCached(key);

  const res = await fetch(
    `${SAAVN_API}/search/artists?query=${encodeURIComponent(query)}&limit=${limit}`
  );

 if (!res.ok) {
  const errorBody = await res.text();
  console.error(`Saavn API failed — status: ${res.status}, body: ${errorBody}`);
  throw new Error("Saavn API failed");
}

  const data = await res.json();
  const results = data?.data?.results || [];

  setCache(key, results);
  return results;
};

export const fetchAlbumsByQuery = async (query, limit = 10) => {
  const key = `albums:${query}:${limit}`;
  if (getCached(key)) return getCached(key);

  const res = await fetch(
    `${SAAVN_API}/search/albums?query=${encodeURIComponent(query)}&limit=${limit}`
  );

if (!res.ok) {
  const errorBody = await res.text();
  console.error(`Saavn API failed — status: ${res.status}, body: ${errorBody}`);
  throw new Error("Saavn API failed");
}

  const data = await res.json();
  const results = data?.data?.results || [];

  setCache(key, results);
  return results;
};

export const fetchAlbumDetails = async (id) => {
  const key = `album:${id}`;
  if (getCached(key)) return getCached(key);

  const res = await fetch(`${SAAVN_API}/albums?id=${id}`);
  if (!res.ok) {
  const errorBody = await res.text();
  console.error(`Saavn API failed — status: ${res.status}, body: ${errorBody}`);
  throw new Error("Saavn API failed");
}

  const data = await res.json();
  const album = data?.data || null;

  setCache(key, album);
  return album;
};

export const fetchArtistDetails = async (id) => {
  const key = `artist:${id}`;
  if (getCached(key)) return getCached(key);

  const res = await fetch(`${SAAVN_API}/artists?id=${id}`);
 if (!res.ok) {
  const errorBody = await res.text();
  console.error(`Saavn API failed — status: ${res.status}, body: ${errorBody}`);
  throw new Error("Saavn API failed");
}


  const data = await res.json();
  const artist = data?.data || null;

  setCache(key, artist);
  return artist;
}; 