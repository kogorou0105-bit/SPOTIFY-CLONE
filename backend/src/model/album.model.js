import mongoose from "mongoose";
const albumSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    releaseYear: {
      required: true,
      type: Number,
    },
    artist: {
      required: true,
      type: String,
    },
    imageUrl: {
      required: true,
      type: String,
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

export const Album = mongoose.model("Album", albumSchema);
