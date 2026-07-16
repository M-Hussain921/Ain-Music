import users from "../models/user.js";

export const likedSongs = async (req, res) => {
  const { songId } = req.body;
  if (!songId) return res.status(400).json({ message: "Song Id is missing" });

  try {
    const user = await users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isLikedSong = user.likedSongs.includes(songId);
    if (isLikedSong) {
      user.likedSongs = user.likedSongs.filter(
        (likedSongId) => likedSongId !== songId,
      );
    } else {
      user.likedSongs.push(songId);
    }
    await user.save();

    if (!isLikedSong) {
      return res
        .status(200)
        .json({ success: true, message: "song added successfully" });
    }

    res.status(200).json({
      success: true,
      message: "song removed successfully",
    });
  } catch (error) {
    console.error("server error: ", error);
    res.status(500).json({ message: "server error" });
  }
};
