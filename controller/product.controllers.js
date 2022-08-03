let Product = require("../models/product.model");
let QuestionAnswer = require("../models/questionAnswer.model");

const findAllProduct = (req, res) => {
  Product.find()
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const createProduct = (req, res) => {
  console.log("Request: ");
  console.log(req.body);
  console.log("Request file: ");
  console.log(req.files);
  const product = new Product();

  product.title = req.body.title;
  product.price = Number(req.body.price);
  product.discountPrice = Number(req.body.discountPrice);
  product.quantity = Number(req.body.quantity);
  product.category = req.body.category;

  if (req.body.deals !== "") {
    product.deals = req.body.deals;
  }

  if (req.body.discountRate !== "") {
    product.discountRate = req.body.discountRate;
  }

  if (req.body.description !== "") {
    product.description = req.body.description;
  }

  if (req.body.specification !== "") {
    product.specification = req.body.specification;
  }

  Object.values(req.files).forEach((val) => {
    product.image.push(val[0].path);
  });

  product
    .save()
    .then(() => res.json(`Product ${product.title} Added.`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const findProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((Product) =>
      Product === null
        ? res
            .status(404)
            .json(`Product with Id ${req.params.id} does not exists.`)
        : res.json(Product)
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Product ${req.params.id} deleted.`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const updateProduct = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.title = req.body.title;
      product.price = Number(req.body.price);
      product.discountPrice = Number(req.body.discountPrice);
      product.quantity = Number(req.body.quantity);
      product.category = req.body.category;

      if (req.body.deals !== "") {
        product.deals = req.body.deals;
      }

      if (req.body.discountRate !== "") {
        product.discountRate = req.body.discountRate;
      }

      if (req.body.description !== "") {
        product.description = req.body.description;
      }

      if (req.body.specification !== "") {
        product.specification = req.body.specification;
      }

      if (req.file !== undefined) {
        Object.values(req.files).forEach((val) => {
          product.image.push(val[0].path);
        });
      }
      // else
      // {
      //   product.image = product.image;
      // }

      product
        .save()
        .then(() => res.json(`Product ${req.params.id} updated.`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const productQuestion = (req, res) => {
  QuestionAnswer.findOne({ product: req.params.productId })
    .then((questionAnswer) => {
      questionAnswer.product = req.params.productId;
      let question = {
        questioner: req.body.userId,
        question: req.body.question,
      };
      questionAnswer.questionAnswerData.push(question);
      questionAnswer
        .save()
        .then(() => res.json(`questionAnswer ${req.params.id} updated.`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

exports.findAllProduct = findAllProduct;
exports.createProduct = createProduct;
exports.findProductById = findProductById;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.productQuestion = productQuestion;
