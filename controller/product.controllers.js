let Product = require('../models/product.model');

const findAllProduct = (req, res) => {
    Product.find()
        .then( product => res.json(product))
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const createProduct = (req, res) => {
    const rating = Number(req.body.rating);
    const date = Date.parse(req.body.date);

    const newProduct = new Product({
      deals: req.body.deals,
      title: req.body.title,
      rating: rating,
      reviewsRating5: reviewsRating5,
      reviewsRating4: reviewsRating4,
      reviewsRating3: reviewsRating3,
      reviewsRating2: reviewsRating2,
      reviewsRating1: reviewsRating1,
      reviews: { type: Number, default: 0 },
      questions: { type: Number, default: 0 },
      answers: { type: Number, default: 0 },
      price: { type: Number, required: [true, "Product price is not set."] },
      discountPrice: { type: Number },
      discountRate: { type: Number },
      image: [ImageSchema],
      description: [{ type: String }],
      specification: [{ type: String }],
      reviewData: [
        {
          rating: { type: String, required },
          reviewer: { type: String, required },
          review: { type: String },
        },
      ],
      questionAnswerData: [QuestionAnswerSchema],
    });

    newProduct.save()
        .then( () => res.json(`Product ${userName} Added.`))
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const findProductById = (req, res) => {
    Product.findById(req.params.id)
        .then( Product => 
            Product === null ? 
                res.status(404).json(`Product with Id ${req.params.id} does not exists.`) : 
                res.json(Product)
        )
        .catch( err => res.status(400).json(`Error: ${err}`));
};


const deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then( () => res.json(`Product ${req.params.id} deleted.`))
        .catch( err => res.status(400).json(`Error: ${err}`));
};

const updateProduct = (req, res) => {
    Product.findById(req.params.id)
        .then( Product => {
            userName = req.body.userName;
            date = Date.parse(req.body.date);
            duration = Number(req.body.duration);
            Product.userName = userName;
            Product.description = req.body.description;
            Product.date = date;
            Product.duration = duration;

            Product.save()
                .then(() => res.json(`Product ${req.params.id} updated.`))
                .catch( err => res.status(400).json(`Error: ${err}`));
        })
        .catch( err => res.status(400).json(`Error: ${err}`));
};

exports.findAllProduct = findAllProduct;
exports.createProduct = createProduct;
exports.findProductById = findProductById;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;


