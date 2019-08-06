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
<<<<<<< HEAD
  },
  logo: {
    type: String,
    required: true
=======
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
  }
})

module.exports = Team = mongoose.model("team", TeamSchema)
