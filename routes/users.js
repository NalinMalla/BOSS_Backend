const router = require("express").Router();
const userController = require('../controller/user.controllers');

router.route('/').get(userController.findAllUsers);
router.route('/add').post(userController.createUser);
router.route('/:id').get(userController.findUserById);
router.route('/email/:email').get(userController.findUserByEmail);
router.route('/:id').delete(userController.deleteUser);
router.route('/update/:id').put(userController.updateUser);

router.route('/address/:userId').get(userController.findAddressByUserId);
router.route('/address/add').post(userController.addAddress);
router.route('/address/update/:userId').put(userController.updateAddress);

module.exports = router;