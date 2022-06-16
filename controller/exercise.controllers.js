let Exercise = require('../models/exercise.model');

const findAllExercises = (req, res) => {
    Exercise.find()
        .then( exercises => res.json(exercises))
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const createExercise = (req, res) => {
    const userName = req.body.userName;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        userName: userName,
        description: description,
        duration: duration,
        date: date,
    });

    newExercise.save()
        .then( () => res.json(`exercise ${userName} Added.`))
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const findExerciseById = (req, res) => {
    Exercise.findById(req.params.id)
        .then( Exercise => 
            Exercise === null ? 
                res.status(404).json(`exercise with Id ${req.params.id} does not exists.`) : 
                res.json(Exercise)
        )
        .catch( err => res.status(400).json(`Error: ${err}`));
};


const deleteExercise = (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then( () => res.json(`exercise ${req.params.id} deleted.`))
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const updateExercise = (req, res) => {
    Exercise.findById(req.params.id)
        .then( Exercise => {
            userName = req.body.userName;
            date = Date.parse(req.body.date);
            duration = Number(req.body.duration);
            Exercise.userName = userName;
            Exercise.description = req.body.description;
            Exercise.date = date;
            Exercise.duration = duration;

            Exercise.save()
                .then(() => res.json(`exercise ${req.params.id} updated.`))
                .catch( err => res.status(400).json(`Error: ${err}`));
        })
        .catch( err => res.status(400).json(`Error: ${err}`));
};

exports.findAllExercises = findAllExercises;
exports.createExercise = createExercise;
exports.findExerciseById = findExerciseById;
exports.deleteExercise = deleteExercise;
exports.updateExercise = updateExercise;


