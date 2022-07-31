const mongoose = require("mongoose");
const schema = mongoose.Schema;

const QuestionAnswerSchema = new schema(
  {
    product: {
      type: schema.Types.ObjectId,
      required: [true, "Product Id is not set."],
    },
    questioner: {
      type: schema.Types.ObjectId,
      required: [true, "Questioner Id is not set."],
    },
    question: { type: String, required: [true, "Question not found."] },
    answer: { type: String },
  },
  {
    timestamps: true,
  }
);

const QuestionAnswer = mongoose.model("QuestionAnswer", QuestionAnswerSchema);

module.exports = QuestionAnswer;
