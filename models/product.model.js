const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProductSchema = new schema(
  {
    deals: { type: String },
    title: { type: String, required: [true, "Product Title is not set."] },

    price: {
      type: Number,
      required: [true, "Product's price is not set."],
      default: 0,
    },
    discountRate: { type: Number },

    quantity: {
      type: Number,
      required: [true, "Product's quantity is not set."],
      default: 0,
    },

    image: [{type: String}],
    description: { type: String },
    specification: { type: String },
    review: [{ type: schema.Types.ObjectId }],
    questionAnswerData: [{ type: schema.Types.ObjectId }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
