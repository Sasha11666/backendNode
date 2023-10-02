const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const loggerOne = require("./middlewares/loggerOne");

const {
  PORT = 3005,
  API_URL = "http://127.0.0.1",
  MONGO_URL = "mongodb://127.0.0.1:27017/backend",
} = process.env;

const handleError = (error) => {
  console.log(error);
};

async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    handleError(error);
  }
}

connectMongo();

const app = express();

app.use(cors());
app.use(loggerOne);
app.use(bodyParser.json());
app.use(userRouter);
app.use(bookRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
