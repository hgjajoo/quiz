import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Score = mongoose.model("Score", scoreSchema);

export default Score;
