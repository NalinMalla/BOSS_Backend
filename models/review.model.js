const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ReviewSchema = new schema(
  {
    product: {
      type: schema.Types.ObjectId,
      required: [true, "Product Id is not set."],
      unique: [true, "Product already has a Review file."],
    },
    reviewData: [
      {
        rating: { type: Number, required: [true, "Rating was not set."] },
        reviewerId: {
          type: String,
          required: [true, "User Id is not set."],
          // unique: [true, "User has already reviewed this product."],
        },
        reviewerName: {
          type: String,
          required: [true, "Reviewer Name is not set."],
        },
        reviewText: { type: String },
      },
    ],
    validReviewers: [
      {
        type: schema.Types.ObjectId,
      },
    ],
    
    reviewsRating5: {type: Number, default: 0, required: true},
    reviewsRating4: {type: Number, default: 0, required: true},
    reviewsRating3: {type: Number, default: 0, required: true},
    reviewsRating2: {type: Number, default: 0, required: true},
    reviewsRating1: {type: Number, default: 0, required: true},
    rating: {type: Number, default: 0, required: true}
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
