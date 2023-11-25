import mongoose, { Schema, model } from "mongoose";

const AnsweredSchema = new Schema({
  question: {
    type: Object,
    require: true
  }
}, {
  timestamps: true
})

const Answered = mongoose.models.Answered || model("Answered", AnsweredSchema);

export default Answered