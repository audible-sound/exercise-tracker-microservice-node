const User = require("../models/user");
class ApiController {
  static async postUser(req, res) {
    try {
      const { username } = req.bodyPOST;
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
      const newExercise = {
        description,
        duration: +duration,
        date,
      };
      const result = await User.findByIdAndUpdate(
        _id,
        {
          $push: {
            exercises: newExercise,
          },
        },
        {
          new: true,
        }
      );
      const output = result.exercises[result.exercises.length - 1];
      res.status(200).send({
        username: result.username,
        description: output.description,
        duration: output.duration,
        date: output.date.toDateString(),
        _id: result._id,
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
      const from = req.query.from;
      const to = req.query.to;
      const limit = +req.query.limit;
      const _id = req.params._id;
      const user = await User.findOne({ _id });
      let exercises = user.exercises;
      if (from) {
        exercises = exercises.filter((el) => el.date >= new Date(from));
      }
      if (to) {
        exercises = exercises.filter((el) => el.date <= new Date(to));
      }
      if (limit) {
        exercises = exercises.slice(0, limit);
      }
      const output = {
        username: user.username,
        _id: user._id,
        count: exercises.length,
        log: exercises.map(el => {
          return {
            description: el.description,
            duration: el.duration,
            date: el.date.toDateString()
          }
        })
      };
      res.status(200).send(output);
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
