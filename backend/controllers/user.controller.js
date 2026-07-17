import users from "../models/user.js";
import playlists from "../models/playlist.js";
import { toggleLike } from "../utils/toggleLike.js";

const getUserField = (fieldName) => async (req, res) => {
  try {
    const user = await users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ success: true, data: user[fieldName] });
  } catch (error) {
    console.error("server error: ", error);
    res.status(500).json({ message: "server error" });
  }
};

const getMostPlayedField = (fieldName) => async (req, res) => {
  try {
    const user = await users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const mostPlayed = [...user[fieldName].entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([id, count]) => ({ id, count }));

    res.status(200).json({ success: true, data: mostPlayed });
  } catch (error) {
    console.error("server error: ", error);
    res.status(500).json({ message: "server error" });
  }
};

export const likedSongs = async (req, res) => {
  const { songId } = req.body;
  if (!songId) return res.status(400).json({ message: "Song Id is missing" });

  try {
    const user = await users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { updatedArray, exists } = toggleLike(user.likedSongs, songId);
    user.likedSongs = updatedArray;

    await user.save();

    res.status(200).json({
      success: true,
      liked: !exists,
      message: !exists
        ? "song added successfully"
        : "song removed successfully",
    });
  } catch (error) {
    console.error("server error: ", error);
    res.status(500).json({ message: "server error" });
  }
};

export const getLikedSongs = getUserField("likedSongs");

export const likedPlaylist = async (req, res) => {
  const { playlistId } = req.body;
  if (!playlistId)
    return res.status(400).json({ message: "Playlist Id is missing" });

  try {
    const user = await users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { updatedArray, exists } = toggleLike(
      user.likedPlaylists,
      playlistId,
    );
    user.likedPlaylists = updatedArray;

    await user.save();

    res.status(200).json({
      success: true,
      liked: !exists,
      message: !exists
        ? "playlist added successfully"
        : "playlist removed successfully",
    });
  } catch (error) {
    console.error("server error: ", error);
    res.status(500).json({ message: "server error" });
  }
};

export const getLikedPlaylists = getUserField("likedPlaylists");

export const likedArtists = async (req, res) => {
  const { artistId } = req.body;
  if (!artistId)
    return res.status(400).json({ message: "artist Id is missing" });

  try {
    const user = await users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { updatedArray, exists } = toggleLike(user.likedArtists, artistId);
    user.likedArtists = updatedArray;

    await user.save();

    res.status(200).json({
      success: true,
      liked: !exists,
      message: !exists
        ? "Artist added successfully"
        : "Artist removed successfully",
    });
  } catch (error) {
    console.error("server error: ", error);
    res.status(500).json({ message: "server error" });
  }
};

export const getLikedArtists = getUserField("likedArtists");

export const createPlaylist = async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ success: false, message: "name is require" });

  try {
    const user = await users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPlaylist = await playlists.create({
      name,
      user: user._id,
    });

    res.status(201).json({
      success: true,
      message: "Playlist created successfull",
      data: newPlaylist,
    });
  } catch (error) {
    console.error("server error: ", error);
    res.status(500).json({ message: "server error" });
  }
};

export const addAndRemoveSongsToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;
  if (!playlistId)
    return res.status(400).json({ message: "Playlist Id is missing" });
  if (!songId) return res.status(400).json({ message: "Song Id is missing" });

  try {
    const user = await users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const playlist = await playlists.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You don't have permission to modify this playlist" });
    }

    const { updatedArray, exists } = toggleLike(playlist.songs, songId);
    playlist.songs = updatedArray;

    await playlist.save();

    res.status(200).json({
      success: true,
      liked: !exists,
      message: !exists
        ? "Song added successfully"
        : "Song removed successfully",
    });
  } catch (error) {
    console.error("server error: ", error);
    res.status(500).json({ message: "server error" });
  }
};

export const getMyPlaylists = async (req, res) => {
  try {
    const myPlaylists = await playlists.find({ user: req.user.userId });
    if (!myPlaylists)
      return res
        .status(404)
        .json({ success: false, message: "playlists not found", data: null });

    res.status(200).json({ success: true, data: myPlaylists });
  } catch (error) {
    console.error("server error: ", error);
    res.status(500).json({ message: "server error" });
  }
};

export const trackRecentlyPlayed = async (req, res) => {
  const { songId, artistId, playlistId } = req.body;
  if (!songId) return res.status(400).json({ message: "Song Id is missing" });

  try {
    const user = await users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.recentlyPlayed = user.recentlyPlayed.filter(
      (entry) => entry.songId !== songId,
    );
    user.recentlyPlayed.unshift({ songId, playedAt: new Date() });
    user.recentlyPlayed = user.recentlyPlayed.slice(0, 50);

    const currSongCount = user.songPlayCounts.get(songId) || 0;
    user.songPlayCounts.set(songId, currSongCount + 1);

    if (artistId) {
      const currArtistCount = user.artistPlayCounts.get(artistId) || 0;
      user.artistPlayCounts.set(artistId, currArtistCount + 1);
    }

    if (playlistId) {
      const currPlaylistCount = user.playlistPlayCounts.get(playlistId) || 0;
      user.playlistPlayCounts.set(playlistId, currPlaylistCount + 1);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "song tracks successfull",
      data: user.recentlyPlayed,
    });
  } catch (error) {
    console.error("server error: ", error);
    res.status(500).json({ message: "server error" });
  }
};

export const getRecentlyPlayed = getUserField("recentlyPlayed");

export const getMostPlayedSongs = getMostPlayedField("songPlayCounts");
export const getMostPlayedArtists = getMostPlayedField("artistPlayCounts");
export const getMostPlayedPlaylists = getMostPlayedField("playlistPlayCounts");
