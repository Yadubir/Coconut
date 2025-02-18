import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const CodeSubmission = () => {
  const webToken = localStorage.getItem("token");
  const [sourceCode, setSourceCode] = useState(
    `import java.util.Scanner;\n\nclass Main {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    int a = scanner.nextInt();\n    int b = scanner.nextInt();\n    System.out.println(a + b);\n  }\n}`
  );
  const [languageId] = useState(62);
  const [visibleTestCases, setVisibleTestCases] = useState([
    { input: "1 2", expectedOutput: "3\n" },
    { input: "10 20", expectedOutput: "30\n" },
  ]);
  const [hiddenTestCases] = useState([
    { input: "100 200", expectedOutput: "300\n" },
    { input: "-5 8", expectedOutput: "3\n" },
  ]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      console.error(error);
      alert("Error running code");
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
        headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${webToken}`,
       },
        body: JSON.stringify({
          sourceCode,
          languageId,
          testCases: [...visibleTestCases, ...hiddenTestCases],
          problemId: "60a6e9a4c9e77c0015a3e8b1", 
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const allPassed = data.every((result) => result.status === "Accepted");
      if (!allPassed) {
        console.error(data);
      }

      alert(allPassed ? "All test cases passed! Solution accepted." : "Some test cases failed. Try again.");
    } catch (error) {
      console.error(error);
      alert("Error submitting code");
    }
    setLoading(false);
  };

  const addTestCase = () => {
    setVisibleTestCases([...visibleTestCases, { input: "", expectedOutput: "" }]);
  };

  return (
    <>
    {/* <Navbar /> */}
    <div className="flex h-screen">
      <Link to="/problems" className="absolute top-4 left-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Go Back
            </button>
          </Link>
      {/* Left Section */}
      <div className="w-1/2 bg-gray-100 p-8 border-r border-gray-300">
        <h1 className="text-2xl font-bold mb-4">Problem: Sum of Two Numbers</h1>
        <div className="h-[calc(100vh-120px)] overflow-y-auto">
          <p className="text-gray-700 mb-4">
            Write a program that reads two integers from the input and outputs their sum.
          </p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Sample Test Cases</h2>
            {visibleTestCases.map((testCase, index) => (
              <div key={index} className="bg-gray-200 p-2 rounded mt-2">
                <strong>Input:</strong> {testCase.input}
                <br />
                <strong>Output:</strong> {testCase.expectedOutput.trim()}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 p-8 flex flex-col items-end">
        {/* Buttons */}
        <div className="space-x-4 mb-4">
          <button
            onClick={handleRun}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Running..." : "Run Code"}
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Code"}
          </button>
        </div>

        {/* Code Editor */}
        <div className="w-full h-[calc(100vh-180px)]">
          <h2 className="text-xl font-bold mb-4">Code Editor</h2>
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
            }}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-2/3 max-w-4xl">
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {results?.map((result, index) => (
                  <div key={index} className="p-4 border rounded">
                    <p className="font-semibold">Test Case {index + 1}</p>
                    <p>Status: {result.status}</p>
                    <p>Output: {result.output || "No Output"}</p>
                    {result.error && <p className="text-red-500">Error: {result.error}</p>}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
    </>
  );
};

export default CodeSubmission;
