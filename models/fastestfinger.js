import mongoose, { Schema, model } from "mongoose";

const FingersSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time: {
    type: String,
    required: [true, "Time is required"]
  }
}, {
  timestamps: true
})

const Fingers = mongoose.models.Fingers || model("Fingers", FingersSchema);

export default Fingers