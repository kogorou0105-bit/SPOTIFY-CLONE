import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Song = mongoose.model("Song", songSchema);
