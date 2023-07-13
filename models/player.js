import mongoose, { Schema, model } from "mongoose";

const PlayerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  score: {
    type: Number,
    default: 0
  },
  question: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
})

const Player = mongoose.models.Player || model("Player", PlayerSchema);

export default Player