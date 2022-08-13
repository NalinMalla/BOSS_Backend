const mongoose = require("mongoose");
const schema = mongoose.Schema;

const TaggedItemSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      required: [true, "User is not set."],
      unique: [true, "User already has a taggedItem record."],
    },
    products: [{ type: schema.Types.ObjectId}],
  },
  {
    timestamps: true,
  }
);

const TaggedItem = mongoose.model("TaggedItem", TaggedItemSchema);

module.exports = TaggedItem;
