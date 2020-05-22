const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  edition: {
    type: String,
    required: true,
  },
  score1: {
    player: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  score2: {
    player: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Score = mongoose.model("score", ScoreSchema);
