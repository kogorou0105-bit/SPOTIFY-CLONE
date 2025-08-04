import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      required: true,
      type: String,
    },
    imageUrl: {
      required: true,
      type: String,
    },
    clerkId: {
      required: true,
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true, //created updated
  }
);

export const User = mongoose.model("User", userSchema);
