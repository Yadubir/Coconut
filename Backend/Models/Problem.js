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

// const mongoose = require("mongoose");

// const problemSchema = new mongoose.Schema({
//   qcode: { type: String, required: true, unique: true },
//   title: { type: String, required: true },
//   link: { type: String, required: true },
//   difficulty: { type: String, required: true },
//   description: { type: String, required: true },
//   author: { type: String },
//   tester: { type: String },
//   editorial: { type: String },
//   tags: { type: [String], default: [] },
//   dateAdded: { type: String },
//   timeLimit: { type: Number, default: 2000 }, // Default 2000ms
//   sourceLimit: { type: Number, default: 50000 }, // Default 50000 Bytes
//   languages: { type: [String], default: [] }
// });

// const Problem = mongoose.model("Problem", problemSchema);
// module.exports = Problem;
