const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  //Define what exercises have (exercises NOT NECESSARILY DAYS)
  
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;