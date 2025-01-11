const express = require("express");
const axios = require("axios");
const router = express.Router();

const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

// Polling function to fetch submission status
const fetchSubmissionResult = async (token) => {
  const maxAttempts = 10; // Maximum attempts to fetch the result
  const interval = 1000; // 1 second between each attempt
  let attempts = 0;

  while (attempts < maxAttempts) {
    const response = await axios.get(`${JUDGE0_API_URL}/submissions/${token}`, {
      headers: {
        "X-RapidAPI-Key": JUDGE0_API_KEY,
      },
    });

    const status = response.data.status.description;

    // Return result if not in queue or processing
    if (status !== "In Queue" && status !== "Processing") {
      return response.data;
    }

    // Wait for 1 second before the next attempt
    await new Promise((resolve) => setTimeout(resolve, interval));
    attempts++;
  }

  // Return a timeout error if attempts are exhausted
  return { status: "Timeout", error: "Code execution timed out." };
};

// @desc    Execute code and get the result
// @route   POST /api/submit
// @access  Public

router.post("/", async (req, res) => {
    const {sourceCode, languageId, testCases } = req.body;
  
    if (!sourceCode || !languageId || !testCases) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Map test cases to promises
      const results = await Promise.all(
        testCases.map(async (testCase) => {
          try {
            // Submit the code for execution
            const submissionResponse = await axios.post(
              `${JUDGE0_API_URL}/submissions`,
              {
                source_code: sourceCode,
                language_id: languageId,
                stdin: testCase.input,
                expected_output: testCase.expectedOutput,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-RapidAPI-Key": JUDGE0_API_KEY,
                },
              }
            );
  
            const { token } = submissionResponse.data;
  
            // Poll for the result
            const result = await fetchSubmissionResult(token);
  
            return {
              testCase,
              status: result.status.description || result.status,
              output: result.stdout,
              error: result.stderr,
            };
          } catch (error) {
            return {
              testCase,
              status: "Error",
              error: error.message,
            };
          }
        })
      );
  
      res.status(200).json(results); // Return all test case results
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error executing test cases", error: error.message });
    }
  });
  

// router.post("/", async (req, res) => {
//   const { sourceCode, languageId, testCases } = req.body;

//   if (!sourceCode || !languageId || !testCases) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const results = [];

//     // Execute each test case
//     for (const testCase of testCases) {
//       // Submit code to Judge0 API
//       const submissionResponse = await axios.post(
//         `${JUDGE0_API_URL}/submissions`,
//         {
//           source_code: sourceCode,
//           language_id: languageId,
//           stdin: testCase.input,
//           expected_output: testCase.expectedOutput,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "X-RapidAPI-Key": JUDGE0_API_KEY,
//           },
//         }
//       );

//       const { token } = submissionResponse.data;

//       // Poll the API for the final result
//       const result = await fetchSubmissionResult(token);

//       results.push({
//         testCase,
//         status: result.status.description || result.status,
//         output: result.stdout,
//         error: result.stderr,
//       });
//     }

//     res.status(200).json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error executing code", error: error.message });
//   }
// });

module.exports = router;
