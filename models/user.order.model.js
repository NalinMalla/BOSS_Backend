const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserOrderSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      required: [true, "User is not set."],
    },
    products: [
      {
        productId: { type: schema.Types.ObjectId },
        count: { type: Number, default: 1},
      },
    ],
    address: {
      receiversName: {
        firstName: {
          type: String,
          required: [true, "First Name is mandatory."], // Or just required: true, works as well, if you want to forgo the error messages.
          minlength: [1, "First Name cannot be blank."],
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: [true, "Last Name is mandatory."],
          minlength: [1, "Last Name cannot be blank."],
        },
      },
  
      email: {
        type: String,
      },
  
      contact: { type: Number, required: [true, "Contact number is mandatory."] },
  
      addressDetail: { type: String, required: [true, "Address Detail is mandatory."] },
  
      province: { type: Number, required: [true, "Select a province."] },
  
      city: { type: String, required: [true, "Select a city."] },
  
      zipCode: {
        type: Number
      }
    }, 

    payment: {
      method: {type: String, required: [true, "Select a payment method."]}
    },
  },
  {
    timestamps: true,
  }
);

const UserOrder = mongoose.model("UserOrder", UserOrderSchema);

module.exports = UserOrder;