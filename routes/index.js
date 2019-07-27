const express = require('express');
const router = express.Router();

// Models
const Team = require('../models/Team');
const User = require('../models/User');
const Score = require('../models/Score');

router.get('/getTeams', (req, res) => {
  Team.find()
    .sort({ teamName: 1 })
    .then(teams => res.json(teams));
});

router.get('/getUsers', (req, res) => {
  User.find()
    .sort({ name: 1 })
    .then(users => res.json(users));
});

router.get('/getScores', (req, res) => {
  const limit = parseInt(req.query.limit);

  Score.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .then(teams => res.json(teams));
});

router.post('/addScore', (req, res) => {
  const score = new Score(req.body);

  score.save().then(score => res.json(score));
});

router.delete('/deleteScore/:id', (req, res) => {
  Score.findById(req.params.id).then(score =>
    score.remove().then(() => res.json({ succes: true }))
  );
});

module.exports = router;
