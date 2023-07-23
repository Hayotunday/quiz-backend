import mongoose, { Schema, model } from "mongoose";

const GameSchema = new Schema({
  question: {
    type: Object,
    require: true
  },
}, {
  timestamps: true
})

const Game = mongoose.models.Game || model("Game", GameSchema);

export default Game