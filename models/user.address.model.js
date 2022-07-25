const mongoose = require("mongoose");

const schema = mongoose.Schema;

const UsersAddressSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      required: [true, "User Id is not set."],
      unique: true
    },

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
      unique: true,
    },

    contact: { type: Number, required: [true, "Contact number is mandatory."] },

    addressDetail: { type: String },

    province: { type: String, required: [true, "Select a province."] },

    city: { type: String, required: [true, "Select a city."] },

    zipCode: {
      type: String,
      minlength: [5, "Zip Code needs to be at least 5 character"],
    },
  },
  {
    timestamps: true,
  }
);

const UsersAddress = mongoose.model("UsersAddress", UsersAddressSchema);

module.exports = UsersAddress;
