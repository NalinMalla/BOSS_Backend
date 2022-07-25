let User = require("../models/user.model");
let Address = require("../models/user.address.model");
let Payment = require("../models/user.payment.model");

const findAllUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const createUser = (req, res) => {
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  // res.json(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const dateOfBirth = Date.parse(req.body.dateOfBirth);
  const contact = Number(req.body.contact);

  const newUser = new User({
    userName: {
      firstName,
      middleName,
      lastName,
    },
    email: email,
    password: password,
    dateOfBirth: dateOfBirth,
    contact: contact,
    gender: req.body.gender,
    receiveOffer: req.body.receiveOffer,
  });

  newUser
    .save()
    .then(() => res.json(`User ${firstName} Added.`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const findUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) =>
      user === null
        ? res.status(404).json(`User with Id ${req.params.id} does not exists.`)
        : res.json(user)
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const findUserByEmail = (req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) =>
      user === null
        ? res
            .status(404)
            .json(`User with Email ${req.params.email} does not exists.`)
        : res.json(user)
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json(`User ${req.params.id} deleted.`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const updateUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      firstName = req.body.firstName;
      middleName = req.body.middleName;
      lastName = req.body.lastName;
      user.userName = { firstName, middleName, lastName };
      user.email = req.body.email;
      user.password = req.body.password;
      user.dateOfBirth = req.body.dateOfBirth;
      user.contact = req.body.contact;
      user.gender = req.body.gender;
      user.receiveOffer = req.body.receiveOffer;
      user._id = req.params.id;
      user
        .save()
        .then(() => res.json(`User ${req.params.id} updated.`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

// const updateUser = (req, res) => {
//   User.updateOne(
//     { _id: req.params.id },
//     {
//       $set: {
//         userName: {
//           firstName: req.body.firstName,
//           middleName: req.body.middleName,
//           lastName: req.body.lastName,
//         },
//         email: req.body.email,
//         contact: Number(req.body.contact),
//         dateOfBirth: Date.parse(req.body.dateOfBirth),
//         gender: req.body.gender,
//       },
//     }
//   );
//   User.findById(req.params.id)
//     .then(
//       User.updateOne(
//         { _id: req.params.id },
//         {
//           $set: {
//             userName: {
//               firstName: req.body.firstName,
//               middleName: req.body.middleName,
//               lastName: req.body.lastName,
//             },
//             email: req.body.email,
//             contact: Number(req.body.contact),
//             dateOfBirth: Date.parse(req.body.dateOfBirth),
//             gender: req.body.gender,
//           },
//         }
//       )
//     )
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// };

const findAddressByUserId = (req, res) => {
  Address.findOne({ userId: req.params.userId })
    .then((address) =>
      address === null
        ? res
            .status(404)
            .json(
              `The address related data of user ${req.params.userId} doesn't exist.`
            )
        : res.json(address)
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const addAddress = (req, res) => {
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contact = Number(req.body.contact);
  
    const newAddress = new Address({
      receiversName: {
        firstName,
        middleName,
        lastName,
      },
      email: email,
      contact: contact,
      userId: req.body.userId,
      addressDetail: req.body.addressDetail,
      province: req.body.province,
      city: req.body.city,
      zipCode: req.body.zipCode,
    });
  
    newUser
      .save()
      .then(() => res.json(`User ${firstName} Added.`))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  };

  const updateAddress = (req, res) => {
    Address.findOne({ userId: req.params.userId })
    .then((address) =>{
        firstName = req.body.firstName;
        middleName = req.body.middleName;
        lastName = req.body.lastName;
        address.receiversName = { firstName, middleName, lastName };
        address.email = req.body.email;
        address.contact = req.body.contact;
        address.userId= req.body.userId,
        address.addressDetail= req.body.addressDetail,
        address.province= req.body.province,
        address.city= req.body.city,
        address.zipCode= req.body.zipCode,
        address._id = req.params.id;
        address
          .save()
          .then(() => res.json(`User Address ${req.params.id} updated.`))
          .catch((err) => res.status(400).json(`Error: ${err}`));
      })
      .catch((err) => res.status(400).json(`Error: ${err}`));
  };

const findPaymentByUserId = (req, res) => {
    Payment.findOne({ userId: req.params.userId })
      .then((payment) =>
        payment === null
          ? res
              .status(404)
              .json(
                `The payment related data of user ${req.params.userId} doesn't exist.`
              )
          : res.json(payment)
      )
      .catch((err) => res.status(400).json(`Error: ${err}`));
  };

exports.findAllUsers = findAllUsers;
exports.createUser = createUser;
exports.findUserById = findUserById;
exports.findUserByEmail = findUserByEmail;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.findAddressByUserId = findAddressByUserId;
exports.addAddress = addAddress;
exports.updateAddress = updateAddress;
