const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ImageSchema = new schema({
  imgData: Buffer,
  alt: { type: String },
});

const QuestionAnswerSchema = new schema(
  {
    questioner: {type: schema.Types.ObjectId, required:[true, "Questioner Id is not set."]},
    questionedDate: {type: Date},
    question: {type: String, required:[true, "Question not found."]},
    answer: {type: String},
    answeredDate:{type: Data},
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new schema(
  {
    deals: { type: String },
    title: { type: String, required: [true, "Product Title is not set."] },
    rating: { type: Number, default: 0 },
    reviewsRating5: { type: Number, default: 0 },
    reviewsRating4: { type: Number, default: 0 },
    reviewsRating3: { type: Number, default: 0 },
    reviewsRating2: { type: Number, default: 0 },
    reviewsRating1: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    questions: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    price: { type: Number, required: [true, "Product price is not set."], default: 0 },
    discountRate: { type: Number, },
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
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
