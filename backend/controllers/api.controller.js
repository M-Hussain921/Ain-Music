import * as apiService from "../services/api.service.js";
import { withFallback } from "../utils/fallbackFetcher.js";

const FALLBACK_API = "https://jiosaavn-api.vercel.app/api";

export const searchSongs = async (req, res) => {
  const { query, limit } = req.query;

  try {
    const data = await withFallback(
      async () => {
        const result = await apiService.fetchSongsByQuery(query, limit);
        return { results: result };
      },

      async () => {
        const response = await fetch(
          `${FALLBACK_API}/search/songs?query=${encodeURIComponent(query)}&limit=${limit}`
        );

        if (!response.ok) throw new Error(`Fallback ${response.status}`);

        const data = await response.json();
        return { results: data?.data?.results || [] };
      }
    );

    res.json({ data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSong = async (req, res) => {
  try {
    const data = await apiService.fetchSongById(req.query.id);
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchArtists = async (req, res) => {
  const { query, limit } = req.query;

  try {
    const data = await withFallback(

      async () => {
        const result = await apiService.fetchArtistsByQuery(query, limit);
        return { results: result };
      },

      async () => {
        const response = await fetch(
          `${FALLBACK_API}/search/artists?query=${encodeURIComponent(query)}&limit=${limit}`
        );

        if (!response.ok) throw new Error();

        const data = await response.json();
        return { results: data?.data?.results || [] };
      }
    );

    res.json({ data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const searchAlbums = async (req, res) => {
  const { query, limit } = req.query;

  try {
    const data = await withFallback(

      async () => {
        const result = await apiService.fetchAlbumsByQuery(query, limit);
        return { results: result };
      },

      async () => {
        const response = await fetch(
          `${FALLBACK_API}/search/albums?query=${encodeURIComponent(query)}&limit=${limit}`
        );

        if (!response.ok) throw new Error();

        const data = await response.json();
        return { results: data?.data?.results || [] };
      }
    );

    res.json({ data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAlbumDetails = async (req, res) => {
  const { id } = req.query;

  try {
    const data = await withFallback(

      async () => {
        return await apiService.fetchAlbumDetails(id);
      },

      async () => {
        const response = await fetch(`${FALLBACK_API}/albums?id=${id}`);
        if (!response.ok) throw new Error();

        const data = await response.json();
        return data?.data;
      }
    );

    res.json({ data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getArtistDetails = async (req, res) => {
  const { id } = req.query;

  try {
    const data = await withFallback(

      async () => {
        return await apiService.fetchArtistDetails(id);
      },

      async () => {
        const response = await fetch(`${FALLBACK_API}/artists?id=${id}`);
        if (!response.ok) throw new Error();

        const data = await response.json();
        return data?.data;
      }
    );

    res.json({ data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};