const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  room: { type: Array },
  role: { type: String, default: "student" },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
