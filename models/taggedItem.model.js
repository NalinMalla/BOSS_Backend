const mongoose = require("mongoose");
const schema = mongoose.Schema;

const TaggedItemSchema = new schema(
  {
    user: {
      type: schema.Types.ObjectId,
      required: [true, "Product Id is not set."],
      unique: [true, "Product already has a Question & Answer file."],
    },
    products: [{ type: schema.Types.ObjectId}],
  },
  {
    timestamps: true,
  }
);

const TaggedItem = mongoose.model("TaggedItem", TaggedItemSchema);

module.exports = TaggedItem;
