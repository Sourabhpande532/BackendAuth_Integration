import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "it is mandatory"],
  },
  password: {
    type: String,
    unique: true,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user",userSchema)