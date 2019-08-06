const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ScoreSchema = new Schema({
  score1: {
    player: {
      type: String,
      required: true
    },
    team: {
      type: String,
      required: true
    },
<<<<<<< HEAD
    logo: {
      type: String,
      required: true
    },
=======
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
    points: {
      type: Number,
      required: true
    }
  },
  score2: {
    player: {
      type: String,
      required: true
    },
    team: {
      type: String,
      required: true
    },
<<<<<<< HEAD
    logo: {
      type: String,
      required: true
    },
=======
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
    points: {
      type: Number,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = Score = mongoose.model("score", ScoreSchema)
