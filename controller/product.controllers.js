let Product = require("../models/product.model");

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
  product.quantity = Number(req.body.quantity);

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

  Object.values(req.files).forEach(val => {
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
    .then((Product) => {
      userName = req.body.userName;
      date = Date.parse(req.body.date);
      duration = Number(req.body.duration);
      Product.userName = userName;
      Product.description = req.body.description;
      Product.date = date;
      Product.duration = duration;

      Product.save()
        .then(() => res.json(`Product ${req.params.id} updated.`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

exports.findAllProduct = findAllProduct;
exports.createProduct = createProduct;
exports.findProductById = findProductById;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
