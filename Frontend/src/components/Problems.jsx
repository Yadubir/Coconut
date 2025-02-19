import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Problems = () => {
  const problems = [
    { id: "60a6e9a4c9e77c0015a3e8b2", title: "Two Sum", difficulty: "Easy" },
    { id: "60a6e9a4c9e77c0015a3e8b3", title: "Reverse a String", difficulty: "Easy" },
    { id: "60a6e9a4c9e77c0015a3e8b4", title: "Factorial of a Number", difficulty: "Medium" },
    { id: "60a6e9a4c9e77c0015a3e8b5", title: "Check Prime Number", difficulty: "Medium" },
    { id: "60a6e9a4c9e77c0015a3e8b6", title: "Fibonacci Sequence", difficulty: "Hard" },
  ];

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-8 top-40">
      
        <h1 className="text-2xl font-bold mb-4 ">Problem List</h1>
        <div className="space-y-4 ">
          {problems.map((problem) => (
            <Link key={problem.id} to={`/submit/${problem.id}`}>
              <div className="border p-4 rounded-lg cursor-pointer hover:bg-lightbg">
                <h2 className="text-lg font-semibold">{problem.title}</h2>
                <p className="text-sm text-gray-500">{problem.difficulty}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </>
  );
};

export default Problems;
