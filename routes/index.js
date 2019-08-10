const express = require("express");
const router = express.Router();

// Models
const Team = require("../models/Team");
const User = require("../models/User");
const Score = require("../models/Score");
const Record = require("../models/Record");

router.get("/getTeams", async (req, res) => {
  const teams = await Team.find().sort({ teamName: 1 });
  res.json(teams);
});

router.get("/getUsers", async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.json(users);
});

router.get("/getScores", async (req, res) => {
  const limit = parseInt(req.query.limit);

  const scores = await Score.find()
    .sort({ createdAt: -1 })
    .limit(limit);

  res.json(scores);
});

router.get("/getStats", async (req, res) => {
  const stats = {};
  const winners = [];
  const played = [];
  const won = {};

  const kiek = await Score.countDocuments({});
  stats["gamesCount"] = kiek;

  const scores = await Score.find({});

  scores.forEach(score => {
    if (score.score1.points > score.score2.points) {
      winners.push(score.score1.player);
    } else {
      winners.push(score.score2.player);
    }
    played.push(score.score1.player, score.score2.player);
  });

  winners.forEach(name => {
    won[name] = (won[name] || 0) + 1;
  });

  played.forEach(name => {
    played[name] = (played[name] || 0) + 1;
  });

  stats["ErikasWon"] = won["Erikas"];
  stats["VytautasWon"] = won["Vytautas"];
  stats["DariusWon"] = won["Darius"];

  stats["ErikasPlayed"] = played["Erikas"];
  stats["VytautasPlayed"] = played["Vytautas"];
  stats["DariusPlayed"] = played["Darius"];

  res.json(stats);
});

router.post("/addScore", async (req, res) => {
  const score = new Score(req.body);
  score.save();
  res.json(score);
});

router.get("/getRecords", async (req, res) => {
  const recordType = req.query.recordType;

  const records = await Record.find({ recordType }).sort({
    recordValue: -1
  });
  res.json(records);
});

router.post("/addRecord", async (req, res) => {
  const record = new Record(req.body);
  record.save();
  res.json(record);
});

router.delete("/deleteScore/:id", async (req, res) => {
  try {
    const score = await Score.findById(req.params.id);
    score.remove();
    res.json(score);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
