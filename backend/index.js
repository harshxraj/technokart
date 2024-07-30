const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth.routes");
const cors = require("cors");
const blogRouter = require("./routes/blog.routes");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", (req, res) => {
  res.send("WORKING");
});

app.use("/blog", blogRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 9090;

// module.exports = app;
app.listen(PORT, () => {
  console.log(`LISTENTING ON ${PORT}`);
});
