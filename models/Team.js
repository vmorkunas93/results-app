const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TeamSchema = new Schema({
  teamName: {
    type: String,
    required: true
  },
  abbrev: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  }
})

module.exports = Team = mongoose.model("team", TeamSchema)
