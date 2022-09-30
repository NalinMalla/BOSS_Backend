let Product = require("../models/product.model");
let QuestionAnswer = require("../models/questionAnswer.model");
let Review = require("../models/review.model");

const findAllProduct = (req, res) => {
  if (req.params.searchType === "hotDeals") {
    Product.find()
      .sort({ discountRate: -1 })
      .then((product) => res.json(product))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } else if (req.params.searchType === "trending") {
    Product.find()
      .sort({ sales: -1, rating: -1 })
      .then((product) => res.json(product))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  } else if (req.params.searchType === "popular") {
    Product.find()
      .sort({ rating: -1, sales: -1 })
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

  product.save(function (err, result) {
    if (err) {
      response = { error: true, message: err };
    } else {
      response = { error: false, message: result._id };
    }
    res.json(response);
  });
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
      product.tags = req.body.tags;

      product.deals = req.body.deals;

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
        let index = val[0].fieldname.substr(10, 1);
        console.log("index: " + index);
        product.image[index] = val[0].path;
        console.log("Request file: ");
        console.log(val);
      });

      product
        .save()
        .then(() => res.json(`Product ${req.params.id} updated.`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};
const updateInventory = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      console.log(product.quantity);
      console.log(req.body.count);
      if (req.body.return) {
        product.quantity = product.quantity + Number(req.body.count);
        product.sales = product.sales - Number(req.body.count);
      } else {
        product.quantity = product.quantity - Number(req.body.count);
        product.sales = product.sales + Number(req.body.count);
      }
      console.log(product.quantity);
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

const addAnswerByQuestionId = (req, res) => {
  QuestionAnswer.findOne({ product: req.params.productId })
    .then((questionAnswer) => {
      questionAnswer.answers = questionAnswer.answers + 1;

      questionAnswer.questionAnswerData.forEach((val) => {
        if (val._id == req.body.questionId) {
          val.answer = req.body.answer;
        }
      });

      console.log(questionAnswer);
      questionAnswer
        .save()
        .then(() =>
          res.json(`Answer added to question ${req.body.questionId}.`)
        )
        .catch((err) => res.status(400).json(`${err}`));
    })
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

const createProductReview = (req, res) => {
  const review = new Review();
  review.product = req.params.productId;
  review
    .save()
    .then(() => res.json(`Review ${req.params.productId} added.`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const addValidReviewer = (req, res) => {
  Review.findOne({ product: req.params.productId })
    .then((review) => {
      review.validReviewers.push(req.body.userId);

      review
        .save()
        .then(() =>
          res.json(`Valid Reviewer for Product ${req.params.productId} added.`)
        )
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const addReview = (req, res) => {
  Review.findOne({ product: req.params.productId })
    .then((review) => {
      review.reviewData.push({
        reviewerId: req.body.userId,
        reviewerName: req.body.userName,
        reviewText: req.body.review,
        rating: req.body.rating,
      });
      console.log(typeof req.body.rating);

      if (req.body.rating == 5) {
        review.reviewsRating5 = review.reviewsRating5 + 1;
        console.log("rating 5 add");
      }

      if (req.body.rating == 4) {
        review.reviewsRating4 += 1;
        console.log("rating 4 add");
      }

      if (req.body.rating == 3) {
        review.reviewsRating3 += 1;
        console.log("rating 3 add");
      }

      if (req.body.rating == 2) {
        review.reviewsRating2 += 1;
        console.log("rating 2 add");
      }

      if (req.body.rating == 1) {
        review.reviewsRating1 += 1;
        console.log("rating 1 add");
      }

      review.rating =
        ((review.reviewsRating5 * 5 +
          review.reviewsRating4 * 4 +
          review.reviewsRating3 * 3 +
          review.reviewsRating2 * 2 +
          review.reviewsRating1 * 1) /
          (review.reviewData.length * 5)) *
        5;

      review
        .save()
        .then(() => {
          Product.findById(req.params.productId)
            .then((product) => {
              product.rating = review.rating;
              console.log(product.rating);
              product
                .save()
                .then(() => {
                  console.log(
                    `Product ${req.params.productId} rating updated.`
                  );
                })
                .catch();
            })
            .catch();
          return res.json(`Review for Product ${req.params.productId} added.`);
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const findReviewByProductId = (req, res) => {
  Review.findOne({ product: req.params.productId })
    .then((Review) =>
      Review === null
        ? res
            .status(404)
            .json(
              `Review with productId ${req.params.productId} does not exists.`
            )
        : res.json(Review)
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
exports.addAnswerByQuestionId = addAnswerByQuestionId;
exports.findQuestionAnswerByProductId = findQuestionAnswerByProductId;
exports.findProductByCategory = findProductByCategory;
exports.findProductByTitle = findProductByTitle;
exports.createProductReview = createProductReview;
exports.addReview = addReview;
exports.findReviewByProductId = findReviewByProductId;
exports.addValidReviewer = addValidReviewer;
exports.updateInventory = updateInventory;
