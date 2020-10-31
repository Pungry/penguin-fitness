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

//On load, get all workout names; display each workout as a button
//When button is clicked, get all exercises in workout and display them
//Have field to enter name of workout, then once that is submitted bring up another form to fill out exercises for that workout

//post route for new workout
app.post("/api/workout", (req, res) => {
    db.Workout.create({ name: req.body.name }).then(dbWorkout => {
        console.log(dbWorkout)
    }).catch(({ message }) => {
        console.log(message);
    })
})
//post route for new exercise
app.post("/api/workout/exercise", ({ body }, res) => {
    db.Exercise.create(body)
        .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/workout", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbBook);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/exercises", (req, res) => {
    db.Exercise.find({})
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/workout/:id", (req, res) => {
    db.Workout.find({
        _id: mongojs.ObjectId(req.params.id)
    })
        .populate("exercises")
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});