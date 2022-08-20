let Product = require("../models/product.model");
let QuestionAnswer = require("../models/questionAnswer.model");

const findAllProduct = (req, res) => {
  if (req.params.searchType === "hotDeals") {
    Product.find().sort({discountRate: -1})
      .then((product) => res.json(product))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } else {
    Product.find()
      .then((product) => res.json(product))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  }
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

  product.tags = req.body.tags;

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

const findProductByCategory = (req, res) => {
  Product.find({ category: req.params.category })
    .then((Product) =>
      Product === null
        ? res
            .status(404)
            .json(
              `Products with category ${req.params.category} were not found.`
            )
        : res.json(Product)
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const findProductByTitle = (req, res) => {
  Product.find({ title: req.params.title })
    .then((Product) =>
      Product === null
        ? res
            .status(404)
            .json(`Products with title ${req.params.title} were not found.`)
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

      product
        .save()
        .then(() => res.json(`Product ${req.params.id} updated.`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const createProductQuestionAnswer = (req, res) => {
  const questionAnswer = new QuestionAnswer();
  questionAnswer.product = req.params.productId;
  questionAnswer.questionAnswerData.push({
    questionerId: req.body.userId,
    questioner: req.body.userName,
    question: req.body.question,
    date: Date.now(),
  });

  questionAnswer
    .save()
    .then(() => res.json(`QuestionAnswer ${req.params.productId} created.`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const addProductQuestion = (req, res) => {
  QuestionAnswer.findOne({ product: req.params.productId })
    .then((questionAnswer) => {
      questionAnswer.product = req.params.productId;
      questionAnswer.questionAnswerData.push({
        questionerId: req.body.userId,
        questioner: req.body.userName,
        question: req.body.question,
        date: Date.now(),
      });
      questionAnswer
        .save()
        .then(() => res.json(`Question ${req.params.productId} add.`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const findQuestionAnswerByProductId = (req, res) => {
  QuestionAnswer.findOne({ product: req.params.productId })
    .then((QuestionAnswer) =>
      QuestionAnswer === null
        ? res
            .status(404)
            .json(
              `QuestionAnswer with productId ${req.params.productId} does not exists.`
            )
        : res.json(QuestionAnswer)
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

exports.findAllProduct = findAllProduct;
exports.createProduct = createProduct;
exports.findProductById = findProductById;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.createProductQuestionAnswer = createProductQuestionAnswer;
exports.addProductQuestion = addProductQuestion;
exports.findQuestionAnswerByProductId = findQuestionAnswerByProductId;
exports.findProductByCategory = findProductByCategory;
exports.findProductByTitle = findProductByTitle;
