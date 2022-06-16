const router = require("express").Router();
const userController = require('../controller/user.controllers');

router.route('/').get(userController.findAllUsers);

router.route('/add').post(userController.createUser);

module.exports = router;