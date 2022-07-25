const mongoose = require("mongoose");

const schema = mongoose.Schema;

const UsersPaymentSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      required: [true, "User Id is not set."],
      unique: true
    },

    cashOnDelivery: { type: Boolean },

    creditDebitCard: {
      holdersName: { type: String },
      cardNum: { type: Number },
      date: { type: Date },
      cvv: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const UsersPayment = mongoose.model("UsersPayment", UsersPaymentSchema);

module.exports = UsersPayment;
