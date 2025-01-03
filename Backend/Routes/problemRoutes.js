const express = require("express");
const Problem = require("../Models/Problem");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();

// @desc    Create a new problem
// @route   POST /api/problems
router.post("/", async (req, res) => {
  const { title, description, inputFormat, outputFormat, testCases, difficulty } = req.body;

  try {
    const problem = new Problem({
      title,
      description,
      inputFormat,
      outputFormat,
      testCases, // Array of objects: { input: String, expectedOutput: String }
      difficulty,
    });

    await problem.save();
    res.status(201).json(problem);
  } catch (error) {
    res.status(400).json({ message: "Error creating problem", error: error.message });
  }
});

// @desc    Get all problems
// @route   GET /api/problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching problems", error: error.message });
  }
});

// @desc    Get a single problem by ID
// @route   GET /api/problems/:id
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching problem", error: error.message });
  }
});

// @desc    Update a problem
// @route   PUT /api/problems/:id
router.put("/:id", protect, async (req, res) => {
  const { title, description, inputFormat, outputFormat, testCases, difficulty } = req.body;

  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    problem.title = title || problem.title;
    problem.description = description || problem.description;
    problem.inputFormat = inputFormat || problem.inputFormat;
    problem.outputFormat = outputFormat || problem.outputFormat;
    problem.testCases = testCases || problem.testCases;
    problem.difficulty = difficulty || problem.difficulty;

    const updatedProblem = await problem.save();
    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(400).json({ message: "Error updating problem", error: error.message });
  }
});

// @desc    Delete a problem
// @route   DELETE /api/problems/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    await problem.remove();
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting problem", error: error.message });
  }
});

module.exports = router;
