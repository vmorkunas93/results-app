const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RecordSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  player: {
    type: String,
    required: true
  },
  recordType: {
    type: String,
    required: true
  },
  recordValue: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = Team = mongoose.model("record", RecordSchema)
