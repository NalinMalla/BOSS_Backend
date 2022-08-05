let User = require("../models/user.model");
let Address = require("../models/user.address.model");
let Payment = require("../models/user.payment.model");
let TaggedItem = require("../models/taggedItem.model");

const findAllUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const createUser = (req, res) => {
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
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
      user.contact = Number(req.body.contact);
      user.gender = req.body.gender;
      user.receiveOffer = req.body.receiveOffer;
      if (req.file !== undefined) {
        user.profilePic = req.file.path;
      } else {
        user.profilePic = user.profilePic;
      }
      user
        .save()
        .then(() => res.json(`User ${req.params.id} updated.`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

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
    province: Number(req.body.province),
    city: req.body.city,
    zipCode: Number(req.body.zipCode),
  });

  newAddress
    .save()
    .then(() => res.json(`User ${firstName} Added.`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const updateAddress = (req, res) => {
  Address.findOne({ userId: req.params.userId })
    .then((address) => {
      firstName = req.body.firstName;
      middleName = req.body.middleName;
      lastName = req.body.lastName;
      address.receiversName = { firstName, middleName, lastName };
      address.email = req.body.email;
      address.contact = req.body.contact;
      (address.userId = req.body.userId),
        (address.addressDetail = req.body.addressDetail),
        (address.province = Number(req.body.province)),
        (address.city = req.body.city),
        (address.zipCode = Number(req.body.zipCode)),
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

const createTaggedItem = (req, res) => {
  const taggedItem = new TaggedItem();
  taggedItem.user = req.params.userId;
  taggedItem.products.push(req.body.productId);
  taggedItem
    .save()
    .then(() => res.json(`TaggedItem for User ${req.params.userId} created.`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const addTaggedItem = (req, res) => {
  TaggedItem.findOne({ user: req.params.userId })
    .then((taggedItem) => {
      taggedItem.user = req.params.userId;
      taggedItem.products.push(req.body.productId);
      taggedItem
        .save()
        .then(() => res.json(`Question ${req.params.userId} add.`))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const findTaggedItemByUserId = (req, res) => {
  TaggedItem
    .findOne({ user: req.params.userId })
    .then((taggedItem) =>
      taggedItem === null
        ? res
            .status(404)
            .json(
              `taggedItem with userId ${req.params.userId} does not exists.`
            )
        : res.json(taggedItem)
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
exports.createTaggedItem = createTaggedItem;
exports.addTaggedItem = addTaggedItem;
exports.findTaggedItemByUserId = findTaggedItemByUserId;
