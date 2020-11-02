const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs");

const PORT = process.env.PORT || 3001;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

//post route for new workout
app.post("/api/workout", (req, res) => {
    console.log("connected", req.body);
    db.Workout.create({name: req.body.name}).then(dbWorkout => {
        console.log(dbWorkout)
    }).catch(({ message }) => {
        console.log(message);
    })
})
//post route for new exercise
app.post("/api/workout/:id", (req, res) => {
    console.log(req.body);
    console.log("req.params.id: ", req.params.id);
    db.Exercise.create(req.body)
        .then(({ _id }) => db.Workout.findOneAndUpdate({_id: mongojs.ObjectId(req.params.id)}, { $push: { exercises: _id } }, { new: true }))
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
            res.json(dbWorkout);
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
        _id: req.params.id
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