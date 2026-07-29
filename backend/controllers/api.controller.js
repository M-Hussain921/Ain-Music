import * as apiService from "../services/api.service.js";

export const searchSongs = async (req, res) => {
  try {
    const { query, limit } = req.query;

    const data = await apiService.fetchSongsByQuery(query, limit);
    res.json({ data: { results: data } });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error("searchSongs error:", err); 
  }
};

export const getSong = async (req, res) => {
  try {
    const data = await apiService.fetchSongById(req.query.id);
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error("searchSongs error:", err); 
  }
};

export const searchArtists = async (req, res) => {
  try {
    const { query, limit } = req.query;
    const data = await apiService.fetchArtistsByQuery(query, limit);
    res.json({ data: { results: data } });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error("searchSongs error:", err); 
  }
};

export const searchAlbums = async (req, res) => {
  try {
    const { query, limit } = req.query;
    const data = await apiService.fetchAlbumsByQuery(query, limit);
    res.json({ data: { results: data } });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error("searchSongs error:", err); 
  }
};

export const getAlbumDetails = async (req, res) => {
  try {
    const data = await apiService.fetchAlbumDetails(req.query.id);
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error("searchSongs error:", err); 
  }
};

export const getArtistDetails = async (req, res) => {
  try {
    const data = await apiService.fetchArtistDetails(req.query.id);
    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error("searchSongs error:", err); 
  }
};

