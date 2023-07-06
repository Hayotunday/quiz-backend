import mongoose, { Schema, model } from "mongoose";

const PlayerSchema = new Schema({
  Player: {
    type: String,
    required: [true, 'Player is required!']
  },
  answers: {
    type: Array,
    require: [true, 'Answers is required!'],
  },
  correct_answer: {
    type: String,
    require: [true, 'correct answer is required!'],
  },
  category: {
    type: String,
    require: [true, 'Category of Player is required!'],
  },
  level: {
    type: String,
    require: [true, 'Level of Player is required!'],
  },
  image: {
    type: String,
  },
}, {
  timestamps: true
})

const Player = mongoose.models.Player || model("Player", PlayerSchema);

export default Player