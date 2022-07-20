let User = require('../models/user.model');

const findAllUsers = (req, res) => {
    User.find()
        .then( users => res.json(users))
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const createUser = (req, res) => {
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    // res.json(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);
    const contact = Number(req.body.contact);

    const newUser = new User({
        // userName: req.body.userName,
        userName: {
            firstName, middleName, lastName
        }, 
        email: email,
        password: password, 
        dateOfBirth: dateOfBirth,
        contact: contact,
        gender: req.body.gender,
        receiveOffer: req.body.receiveOffer,
    });

    newUser.save()
        .then( () => res.json(`User ${firstName} Added.`))
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const findUserById = (req, res) => {
    User.findById(req.params.id)
        .then( user => 
            user === null ? 
                res.status(404).json(`User with Id ${req.params.id} does not exists.`) : 
                res.json(user)
        )
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const findUserByEmail = (req, res) => {
    User.findOne({email: req.params.email})
        .then( user => 
            user === null ? 
                res.status(404).json(`User with Email ${req.params.email} does not exists.`) : 
                res.json(user)
        )
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then( () => res.json(`User ${req.params.id} deleted.`))
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const updateUser = (req, res) => {
    User.findById(req.params.id)
        .then( user => {
            firstName = req.body.firstName;
            middleName = req.body.middleName;
            lastName = req.body.lastName;
            user.userName = {firstName, middleName, lastName}
            user.email = req.body.email;
            user.password = req.body.password;
            user.dateOfBirth = req.body.dateOfBirth;
            user.contact = req.body.contact;
            user.gender = req.body.gender;
            user.receiveOffer = req.body.receiveOffer;

            user.save()
                .then(() => res.json(`User ${req.params.id} updated.`))
                .catch( err => res.status(400).json(`Error: ${err}`));
        })
        .catch( err => res.status(400).json(`Error: ${err}`));
};

exports.findAllUsers = findAllUsers;
exports.createUser = createUser;
exports.findUserById = findUserById;
exports.findUserByEmail = findUserByEmail;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;


