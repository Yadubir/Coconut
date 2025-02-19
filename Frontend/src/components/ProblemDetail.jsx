import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const problems = [
  {
    id: "60a6e9a4c9e77c0015a3e8b2",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Find two numbers that add up to a target sum.",
  },
  {
    id: "60a6e9a4c9e77c0015a3e8b3",
    title: "Reverse a String",
    difficulty: "Easy",
    description: "Reverse a given string.",
  },
  {
    id: "60a6e9a4c9e77c0015a3e8b4",
    title: "Factorial of a Number",
    difficulty: "Medium",
    description: "Find the factorial of a given number.",
  },
  {
    id: "60a6e9a4c9e77c0015a3e8b5",
    title: "Check Prime Number",
    difficulty: "Medium",
    description: "Determine whether a number is prime.",
  },
  {
    id: "60a6e9a4c9e77c0015a3e8b6",
    title: "Fibonacci Sequence",
    difficulty: "Hard",
    description: "Generate the Fibonacci sequence up to a given number.",
  },
];

const ProblemDetail = () => {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === id);

  if (!problem) {
    return (
      <div className="container mx-auto p-4 text-red-500">
        <h1>Problem Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{problem.title}</h1>
        <p className="text-gray-600 text-sm">Difficulty: {problem.difficulty}</p>
        <p className="mt-4">{problem.description}</p>
      </div>
    </>
  );
};

export default ProblemDetail;
