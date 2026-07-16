import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    likedSongs: [
      {
        type: String,
        trim: true,
      },
    ],
    likedPlaylists: [
      {
        type: String,
        trim: true,
      },
    ],
    myPlaylist: [
      {
        title: {
          type: String,
          trim: true,
        },
        songs: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],
    recentlyPlayed: [
      {
        songId: {
          type: String,
          trim: true,
        },
        playedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
