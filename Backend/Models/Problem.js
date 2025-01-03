const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  inputFormat: { type: String, required: true },
  outputFormat: { type: String, required: true },
  testCases: [testCaseSchema],
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
});

module.exports = mongoose.model("Problem", problemSchema);
