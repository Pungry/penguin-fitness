const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  //Define what exercises have (exercises NOT NECESSARILY DAYS)
  name: {
      type: String,
      trim: true,
      required: true
  },
  reps: {
      type: Number,
      default: 0,
      trim: true,
  },
  description: {
      type: String,
      default: "",
      trim: true
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;