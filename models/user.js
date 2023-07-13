import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    require: [true, 'First name required!']
  },
  lastName: {
    type: String,
    require: [true, 'Last name required!']
  },
  age: {
    type: Number,
    require: [true, 'Age required!']
  },
  church: {
    type: String,
    require: [true, 'Church name required!']
  },
  email: {
    type: String,
    unique: [true, "Email must be unique"],
    require: [true, 'Email is required!']
  },
  why: {
    type: String,
    require: [true, 'The reason for participating is required!']
  }
}, {
  timestamps: true
})

const User = mongoose.models.User || model("User", UserSchema);

export default User