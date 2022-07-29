const mongoose = require("mongoose");

const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    userName: {
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
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    receiveOffer: { type: Boolean },
    contact: { type: Number, required: true },
    profilePic: { type:String },

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
