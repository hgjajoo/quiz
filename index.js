import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Question from "./models/Question.js";
import Score from "./models/Score.js";

dotenv.config();

const app = express();
const port = 3000;

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection error:", err));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the quiz API");
});

// GET method to fetch all questions
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).send("Error fetching questions");
  }
});

// POST method to submit answers
app.post("/api/submit-answer", async (req, res) => {
  const { userId, answers } = req.body; // array format: [{ questionId, answer }]

  if (!userId || !answers) {
    return res.status(400).send("User ID and answers are required");
  }
  try {
    let score = 0;
    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (question.correctAnswer === answer.answer) {
        score++; // if answer is correct we increment score
      }
    }
    const existingScore = await Score.findOne({ userId }); // check if user already has a score
    if (existingScore) {
      existingScore.score = score; // if user has a score, update it
      await existingScore.save();
    } else {
      const newScore = new Score({ userId, score }); // if user doesn't have a score, create a new one
      await newScore.save();
    }

    res.json({ score });
  } catch (error) {
    res.status(500).send("Error submitting answers");
  }
});

// GET method to fetch all scores
app.get("/api/scores", async (req, res) => {
  try {
    const scores = await Score.find();
    res.json(scores);
  } catch (error) {
    res.status(500).send("Error fetching scores");
  }
});

// GET methods to fetch score by userId
app.get("/api/scores/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const score = await Score.findOne({ userId });
    if (score) {
      res.json(score);
    } else {
      res.status(404).send("Score not found for this user");
    }
  } catch (error) {
    res.status(500).send("Error fetching score");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
