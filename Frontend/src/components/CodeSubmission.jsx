import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CodeSubmission = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const webToken = localStorage.getItem("token");
  
  const problems = [
    {
      id: "60a6e9a4c9e77c0015a3e8b2",
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      inputFormat: "An integer n (size of array), followed by n space-separated integers and an integer target.",
      outputFormat: "Two space-separated integers indicating the indices of the two numbers.",
      difficulty: "Easy",
      testCases: [
        { input: "4\n2 7 11 15\n9", expectedOutput: "0 1" },
        { input: "5\n3 2 4 6 7\n6", expectedOutput: "1 2" },
        { input: "3\n3 3 3\n6", expectedOutput: "0 1" },
        { input: "6\n1 5 3 9 12 4\n9", expectedOutput: "0 3" },
        { input: "5\n1 2 3 4 5\n8", expectedOutput: "2 4" }
      ]
    },
    {
      id: "60a6e9a4c9e77c0015a3e8b3",
      title: "Reverse a String",
      description: "Given a string, reverse it.",
      inputFormat: "A single string s.",
      outputFormat: "The reversed string.",
      difficulty: "Easy",
      testCases: [
        { input: "hello", expectedOutput: "olleh" },
        { input: "world", expectedOutput: "dlrow" },
        { input: "racecar", expectedOutput: "racecar" },
        { input: "12345", expectedOutput: "54321" },
        { input: "!@#$%", expectedOutput: "%$#@!" },
        { input: "abcdef", expectedOutput: "fedcba" },
        { input: "madam", expectedOutput: "madam" },
        { input: "python", expectedOutput: "nohtyp" },
        { input: "a", expectedOutput: "a" },
        { input: "", expectedOutput: "" }
      ]
    },
    {
      id: "60a6e9a4c9e77c0015a3e8b4",
      title: "Factorial of a Number",
      description: "Given an integer n, return its factorial.",
      inputFormat: "A single integer n (0 <= n <= 12).",
      outputFormat: "An integer representing n factorial.",
      difficulty: "Medium",
      testCases: [
        { input: "0", expectedOutput: "1" },
        { input: "1", expectedOutput: "1" },
        { input: "2", expectedOutput: "2" },
        { input: "3", expectedOutput: "6" },
        { input: "4", expectedOutput: "24" },
        { input: "5", expectedOutput: "120" },
        { input: "6", expectedOutput: "720" },
        { input: "7", expectedOutput: "5040" },
        { input: "10", expectedOutput: "3628800" },
        { input: "12", expectedOutput: "479001600" }
      ]
    },
    {
      id: "60a6e9a4c9e77c0015a3e8b5",
      title: "Check Prime Number",
      description: "Given an integer n, determine if it is a prime number.",
      inputFormat: "A single integer n.",
      outputFormat: "YES if n is prime, otherwise NO.",
      difficulty: "Medium",
      testCases: [
        { input: "2", expectedOutput: "YES" },
        { input: "3", expectedOutput: "YES" },
        { input: "4", expectedOutput: "NO" },
        { input: "5", expectedOutput: "YES" },
        { input: "9", expectedOutput: "NO" },
        { input: "11", expectedOutput: "YES" },
        { input: "15", expectedOutput: "NO" },
        { input: "17", expectedOutput: "YES" },
        { input: "19", expectedOutput: "YES" },
        { input: "20", expectedOutput: "NO" }
      ]
    },
    {
      id: "60a6e9a4c9e77c0015a3e8b6",
      title: "Fibonacci Sequence",
      description: "Given an integer n, return the nth Fibonacci number.",
      inputFormat: "A single integer n (0 <= n <= 30).",
      outputFormat: "An integer representing the nth Fibonacci number.",
      difficulty: "Hard",
      testCases: [
        { input: "0", expectedOutput: "0" },
        { input: "1", expectedOutput: "1" },
        { input: "2", expectedOutput: "1" },
        { input: "3", expectedOutput: "2" },
        { input: "4", expectedOutput: "3" },
        { input: "5", expectedOutput: "5" },
        { input: "6", expectedOutput: "8" },
        { input: "7", expectedOutput: "13" },
        { input: "10", expectedOutput: "55" },
        { input: "15", expectedOutput: "610" }
      ]
    }

  ];

  const [problem, setProblem] = useState(null);
  const [sourceCode, setSourceCode] = useState(
    `include <stdio.h>\nusing namespace std \n\nint main() {\n  // Your code here\n  return 0;\n}`
    // `import java.util.Scanner;\n\nclass Main {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    // Your code here\n  }\n}`
  );
  const [languageId] = useState(52); // Java
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Current ID:", id);
    if (!id) {
      console.error("No ID found in URL");
      setLoading(false);
      return;
    }

    const foundProblem = problems.find((p) => p.id === id);
    console.log("Found Problem:", foundProblem);
    
    if (foundProblem) {
      setProblem(foundProblem);
      // Set visible and hidden test cases
      setVisibleTestCases([...foundProblem.testCases.slice(0, 2)]);
      setHiddenTestCases([...foundProblem.testCases.slice(2)]);
    } else {
      console.error("No problem found with ID:", id);
    }
    setLoading(false);
  }, [id]);

  const [visibleTestCases, setVisibleTestCases] = useState([]);
  const [hiddenTestCases, setHiddenTestCases] = useState([]);

  const handleRun = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/submit/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceCode,
          languageId,
          testCases: visibleTestCases,
        }),
      });
      const data = await response.json();
      setResults(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Run error:", error);
      alert("Error running code: " + error.message);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!webToken) {
        alert("User not authenticated. Please log in again.");
        return;
      }
      const response = await fetch("http://localhost:3000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${webToken}`,
        },
        body: JSON.stringify({
          sourceCode,
          languageId,
          testCases: [...visibleTestCases, ...hiddenTestCases],
          problemId: id,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const allPassed = data.every((result) => result.status === "Accepted");
      alert(allPassed ? "All test cases passed! Solution accepted." : "Some test cases failed. Try again.");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error submitting code: " + error.message);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
        <p className="mb-4">The problem you're looking for doesn't exist or has been removed.</p>
        <Link to="/problems">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Return to Problems
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* <Link to="/problems" className="absolute top-4 left-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Go Back
        </button>
      </Link> */}

      {/* Problem Description Section */}
      <div className="w-1/2 bg-gray-100 p-8 border-r border-gray-300 ">
        <h1 className="text-2xl font-bold mb-4 pr-96">{problem.title}</h1>
        <div className="h-[calc(100vh-120px)] overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Problem Description</h2>
            <p className="text-gray-700">{problem.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Input Format</h2>
            <p className="text-gray-700">{problem.inputFormat}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Output Format</h2>
            <p className="text-gray-700">{problem.outputFormat}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sample Test Cases</h2>
            {visibleTestCases.map((testCase, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="mb-2">
                  <span className="font-semibold">Input:</span>
                  <pre className="mt-1 bg-gray-100 p-2 rounded">{testCase.input}</pre>
                </div>
                <div>
                  <span className="font-semibold">Expected Output:</span>
                  <pre className="mt-1 bg-gray-100 p-2 rounded">{testCase.expectedOutput}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

      {/* Code Editor Section */}
      <div className="w-1/2 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Code Editor</h2>
          <div className="space-x-4">
            <button
              onClick={handleRun}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Running..." : "Run Code"}
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Solution"}
            </button>
          </div>
        </div>

        <div className="flex-grow">
          <Editor
            height="100%"
            defaultLanguage="java"
            theme="vs-dark"
            value={sourceCode}
            onChange={setSourceCode}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              lineNumbers: "on",
              roundedSelection: false,
              selectOnLineNumbers: true,
              readOnly: false,
              cursorStyle: "line",
            }}
          />
        </div>
      </div>

      {/* Results Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-2/3 max-w-4xl">
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {results?.map((result, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border rounded ${
                      result.status === "Accepted" 
                        ? "border-green-500 bg-green-50" 
                        : "border-red-500 bg-red-50"
                    }`}
                  >
                    <p className="font-semibold">Test Case {index + 1}</p>
                    <p className={`font-medium ${
                      result.status === "Accepted" ? "text-green-600" : "text-red-600"
                    }`}>
                      Status: {result.status}
                    </p>
                    <div className="mt-2">
                      <p className="font-semibold">Output:</p>
                      <pre className="bg-white p-2 rounded mt-1">
                        {result.output || "No output"}
                      </pre>
                    </div>
                    {result.error && (
                      <div className="mt-2">
                        <p className="font-semibold text-red-600">Error:</p>
                        <pre className="bg-white p-2 rounded mt-1 text-red-500">
                          {result.error}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-6 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CodeSubmission;