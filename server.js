const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// When the user loads the page, they should be given the option to create a new workout or continue with their last workout.

// The user should be able to:

//   * Add exercises to a previous workout plan.

//   * Add new exercises to a new workout plan.

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });