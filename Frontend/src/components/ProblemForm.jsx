import React, { useState } from "react";
import axios from "axios";

const ProblemForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    testCases: [{ input: "", expectedOutput: "" }],
    difficulty: "easy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = formData.testCases.map((testCase, i) =>
      i === index ? { ...testCase, [field]: value } : testCase
    );
    setFormData({ ...formData, testCases: updatedTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: "", expectedOutput: "" }],
    });
  };

  const removeTestCase = (index) => {
    const updatedTestCases = formData.testCases.filter((_, i) => i !== index);
    setFormData({ ...formData, testCases: updatedTestCases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/problems", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Problem created successfully!");
      setFormData({
        title: "",
        description: "",
        inputFormat: "",
        outputFormat: "",
        testCases: [{ input: "", expectedOutput: "" }],
        difficulty: "easy",
      });
    } catch (error) {
      alert(`Error creating problem: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center p-5">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Problem</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Input Format</label>
            <textarea
              name="inputFormat"
              value={formData.inputFormat}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Output Format</label>
            <textarea
              name="outputFormat"
              value={formData.outputFormat}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Test Cases</label>
            {formData.testCases.map((testCase, index) => (
              <div key={index} className="flex space-x-3 mb-3">
                <input
                  type="text"
                  placeholder="Input"
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Expected Output"
                  value={testCase.expectedOutput}
                  onChange={(e) => handleTestCaseChange(index, "expectedOutput", e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeTestCase(index)}
                  className="px-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTestCase}
              className="mt-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Test Case
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Submit Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProblemForm;
