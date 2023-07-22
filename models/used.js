import mongoose, { Schema, model } from "mongoose";

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Question is required!']
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
    require: [true, 'Category of question is required!'],
  },
  level: {
    type: String,
    require: [true, 'Level of question is required!'],
  },
  image: {
    type: String,
  },
}, {
  timestamps: true
})

const Question = mongoose.models.Question || model("Question", QuestionSchema);

export default Question