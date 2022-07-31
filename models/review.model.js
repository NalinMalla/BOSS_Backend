const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ReviewSchema = new schema(
  {
    product: {
      type: schema.Types.ObjectId,
      required: [true, "Product Id is not set."],
    },
    rating: { type: Number, required },
    reviewer: {
      type: schema.Types.ObjectId,
      required: [true, "User Id is not set."],
    },
    review: { type: String },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
