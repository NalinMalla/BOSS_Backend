const mongoose = require("mongoose");
const schema = mongoose.Schema;

const QuestionAnswerDataSchema = new schema(
  {
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

const QuestionAnswerSchema = new schema(
  {
    product: {
      type: schema.Types.ObjectId,
      required: [true, "Product Id is not set."],
      unique: [true, "Product already has a Question & Answer file."]
    },
    QuestionAnswerData: [QuestionAnswerDataSchema],
  },
  {
    timestamps: true,
  }
);

const QuestionAnswer = mongoose.model("QuestionAnswer", QuestionAnswerSchema);

module.exports = QuestionAnswer;
