import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
