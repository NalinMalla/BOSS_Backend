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

router.route("/all/:searchType").get(productController.findAllProduct);
router
  .route("/add")
  .post(upload.fields(uploadName), productController.createProduct);
router.route("/categories/:category").get(productController.findProductByCategory);
router.route("/search/:title").get(productController.findProductByTitle);
router.route("/:id").get(productController.findProductById);
router.route("/:id").delete(productController.deleteProduct);
router.route("/update/:id").put(upload.fields(uploadName), productController.updateProduct);
router.route("/createQuestionAnswer/:productId").post(productController.createProductQuestionAnswer);
router.route("/addQuestion/:productId").put(productController.addProductQuestion);
router.route("/addAnswer/:productId").put(productController.addAnswerByQuestionId);
router.route("/questionAnswer/:productId").get(productController.findQuestionAnswerByProductId)
router.route("/createReview/:productId").post(productController.createProductReview);
router.route("/review/:productId").get(productController.findReviewByProductId);
router.route("/addReview/:productId").put(productController.addReview);
router.route("/addValidReviewer/:productId").put(productController.addValidReviewer);


module.exports = router;
