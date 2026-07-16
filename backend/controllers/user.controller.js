import users from "../models/user.js";
import { toggleLike } from "../utils/toggleLike.js";

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

export const likedPlaylist = async (req, res) => {
  const { playlistId } = req.body;
  if (!playlistId)
    return res.status(400).json({ message: "Playlist Id is missing" });

  try {
    const user = await users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { updatedArray, exists } = toggleLike(user.likedPlaylists, playlistId);
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
