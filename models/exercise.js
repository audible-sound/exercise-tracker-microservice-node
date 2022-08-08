const mongoose = require("../config/connection");
const schema = new mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: String
});
const Exercise = mongoose.model("Exercise", schema);
module.exports = Exercise;