const router = require("express").Router();
const exerciseController = require("../controller/exercise.controllers");

router.route("/").get(exerciseController.findAllExercises);

router.route("/add").post(exerciseController.createExercise);

router.route("/:id").get(exerciseController.findExerciseById);

router.route("/:id").delete(exerciseController.deleteExercise);

router.route("/update/:id").post(exerciseController.updateExercise);

module.exports = router;
