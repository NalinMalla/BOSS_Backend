const router = require("express").Router();
const productController = require("../controller/product.controllers");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log(file);
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
});

const uploadName = [
  { name: "productPic0", maxCount: 1 },
  { name: "productPic1", maxCount: 1 },
  { name: "productPic2", maxCount: 1 },
  { name: "productPic3", maxCount: 1 },
  { name: "productPic4", maxCount: 1 },
  { name: "productPic5", maxCount: 1 },
  { name: "productPic6", maxCount: 1 },
];

router.route("/").get(productController.findAllProduct);
router
  .route("/add")
  .post(upload.fields(uploadName), productController.createProduct);
router.route("/:id").get(productController.findProductById);
router.route("/:id").delete(productController.deleteProduct);
router.route("/update/:id").put(upload.any(), productController.updateProduct);

module.exports = router;
