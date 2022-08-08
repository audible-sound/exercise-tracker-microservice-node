require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/index"));

app.listen(process.env.PORT, () => {
  console.log("app listening on port " + process.env.PORT);
});
