const router = require("express").Router();
const userController = require("../controller/user.controllers");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },

  filename: (req, file, callback) => {
    callback(
      null,
      new Date().toISOString().slice(0, 10) + "--" + file.originalname
    );
  },
});

const upload = multer({
  storage: Storage,
  // limits:{fileSize: 1024*1024*16}
});

router.route("/").get(userController.findAllUsers);
router.route("/add").post(userController.createUser);
router.route("/:id").get(userController.findUserById);
router.route("/email/:email").get(userController.findUserByEmail);
router.route("/:id").delete(userController.deleteUser);
router
  .route("/update/:id")
  .put(upload.single("profilePic"), userController.updateUser);

router.route("/address/:userId").get(userController.findAddressByUserId);
router.route("/address/add").post(userController.addAddress);
router.route("/address/update/:userId").put(userController.updateAddress);
router.route("/taggedItem/:userId").get(userController.findTaggedItemByUserId);
router.route("/taggedItem/create/:userId").post(userController.createTaggedItem);
router.route("/taggedItem/add/:userId").put(userController.addTaggedItem);
router.route("/taggedItem/delete/:taggedItemId").put(userController.deleteTaggedItem);
router.route("/cart/:userId").get(userController.findCartByUserId);
router.route("/cart/create/:userId").post(userController.createCart);
router.route("/cart/add/:userId").put(userController.addCart);
router.route("/cart/updateCount/:cartId").put(userController.updateCartCount);
router.route("/cart/delete/:cartId").put(userController.deleteCart);

module.exports = router;
