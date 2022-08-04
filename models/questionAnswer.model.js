const mongoose = require("mongoose");
const schema = mongoose.Schema;

const QuestionAnswerSchema = new schema(
  {
    product: {
      type: schema.Types.ObjectId,
      required: [true, "Product Id is not set."],
      unique: [true, "Product already has a Question & Answer file."],
    },
    answers: { type: Number, default: 0 },
    questionAnswerData: [
      {
        questionerId: {
          type: String,
          required: [true, "Questioner Id is not set."],
        },
        questioner: {
          type: String,
          required: [true, "Questioner Name is not set."],
        },
        question: { type: String, required: [true, "Question not found."] },
        answer: { type: String },
        date: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const QuestionAnswer = mongoose.model("QuestionAnswer", QuestionAnswerSchema);

module.exports = QuestionAnswer;
