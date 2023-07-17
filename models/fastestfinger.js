import mongoose, { Schema, model } from "mongoose";

const FingersSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time: {
    type: Date,
    default: Date.now()
  }
}, {
  timestamps: true
})

const Fingers = mongoose.models.Fingers || model("Fingers", FingersSchema);

export default Fingers