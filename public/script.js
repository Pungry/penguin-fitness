// $(".workout-form").on("submit", function (event) {
//     event.preventDefault();
//     console.log("Worked")
//     var workout = $("#workout_name").val().trim();
//     console.log(workout);
//     var workoutObj = {name: workout};
//     console.log(workoutObj);
//     $.post("/api/workout", workoutObj).then(function (res) {
//         console.log(res);
//     })
// })