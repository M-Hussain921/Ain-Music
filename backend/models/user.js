import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim
    },
    likedSongs:[{type:Object}],
    likedPlaylist:[{type:Object}],
  },
  { timestamps: true },
);
