const mongoose = require("../config/connection");
const schema = new mongoose.Schema(
  {
    username: String,
    exercises: [
      {
        description: String,
        duration: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);
const User = mongoose.model("User", schema);
module.exports = User;
