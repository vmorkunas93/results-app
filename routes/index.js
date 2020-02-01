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
  const won = {};
  let vytautasScored = 0;
  let erikasScored = 0;

  const kiek = await Score.countDocuments({});
  stats["gamesPlayed"] = kiek;

  const scores = await Score.find({});

  scores.forEach(score => {
    // Find the winner of each game
    if (score.score1.points > score.score2.points) {
      winners.push(score.score1.player);
    } else {
      winners.push(score.score2.player);
    }

    // Find average scored points
    if (score.score1.player === "Vytautas") {
      vytautasScored += score.score1.points;
      erikasScored += score.score2.points;
    } else if (score.score1.player === "Erikas") {
      erikasScored += score.score1.points;
      vytautasScored += score.score2.points;
    }
  });

  winners.forEach(name => {
    won[name] = (won[name] || 0) + 1;
  });

  stats["ErikasWon"] = won["Erikas"];
  stats["VytautasWon"] = won["Vytautas"];
  stats["ErikasTotalPts"] = erikasScored;
  stats["VytautasTotalPts"] = vytautasScored;
  stats["ErikasAvgPts"] = (erikasScored / kiek).toFixed(2);
  stats["VytautasAvgPts"] = (vytautasScored / kiek).toFixed(2);
  stats["ErikasWonPct"] = ((stats["ErikasWon"] / kiek) * 100).toFixed(2);
  stats["VytautasWonPct"] = ((stats["VytautasWon"] / kiek) * 100).toFixed(2);

  res.json(stats);
});

router.post("/addScore", async (req, res) => {
  const score = new Score(req.body);
  score.save();
  res.json(score);
});

router.get("/getRecords", async (req, res) => {
  const recordType = req.query.recordType;

  const records = await Record.find({ recordType })
    .sort({
      recordValue: -1
    })
    .limit(5);
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
