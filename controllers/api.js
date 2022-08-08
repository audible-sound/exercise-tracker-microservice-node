const User = require("../models/user");
const Exercise = require("../models/exercise");
class ApiController {
  static async postUser(req, res) {
    try {
      const { username } = req.body;
      const newUser = new User({
        username,
      });
      const result = await newUser.save();
      res.status(201).send({
        _id: result._id,
        username: result.username,
      });
    } catch (error) {
      console.log("error occured", error);
      let code = 500;
      let message = error;
      res.status(code).send({
        error: message,
      });
    }
  }
  static async getUsers(req, res) {
    try {
      const result = await User.find({}, "_id username");
      res.status(200).send(result);
    } catch (error) {
      console.log("error occured", error);
      let code = 500;
      let message = error;
      res.status(code).send({
        error: message,
      });
    }
  }
  static async postExercise(req, res) {
    try {
      const _id = req.params._id;
      let { description, duration, date } = req.body;
      if (date) {
        date = new Date(date).toDateString();
      } else {
        date = new Date().toDateString();
      }
      const user = await User.findOne({ _id });
      const newExercise = new Exercise({
        username: user.username,
        description,
        duration: +duration,
        date,
      });
      const result = await newExercise.save();
      res.status(201).send({
        username: result.username,
        description: result.description,
        duration: result.duration,
        date: result.date,
        _id: user._id,
      });
    } catch (error) {
      console.log("error occured", error);
      let code = 500;
      let message = error;
      res.status(code).send({
        error: message,
      });
    }
  }
  static async getLogs(req, res) {
    try {
      const _id = req.params._id;
      const user = await User.findOne({ _id });
      const log = await Exercise.find(
        { username: user.username },
        "description duration date -_id"
      );
      const count = log.length;
      const result = {
        username: user.username,
        count,
        _id: user._id,
        log,
      };
      res.status(200).send(result);
    } catch (error) {
      console.log("error occured", error);
      let code = 500;
      let message = error;
      res.status(code).send({
        error: message,
      });
    }
  }
}
module.exports = ApiController;
