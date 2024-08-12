import mongoose from "mongoose";

const userSchema2 = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

const User2 = mongoose.model('tempdb2', userSchema2,'user2');

export default User2;
