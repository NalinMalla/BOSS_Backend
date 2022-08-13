const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CartSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      required: [true, "User is not set."],
      unique: [true, "User already has a cart."],
    },
    products: [
      {
        productId: { type: schema.Types.ObjectId },
        count: { type: Number, default: 1},
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
