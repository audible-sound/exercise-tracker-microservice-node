const express = require("express");
const ApiController = require("../controllers/api");
const router = express.Router();

router.post('/api/users', ApiController.postUser);
router.get('/api/users', ApiController.getUsers);

router.post("/api/users/:_id/exercises", ApiController.postExercise);

router.get("/api/users/:_id/logs", ApiController.getLogs);
module.exports = router;