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
    likedArtists: [
      {
        type: String,
        trim: true,
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
    songPlayCounts: {
      type: Map,
      of: Number,
      default: {},
    },
    artistPlayCounts: {
      type: Map,
      of: Number,
      default: {},
    },
    playlistPlayCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
