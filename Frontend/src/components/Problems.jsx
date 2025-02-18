import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Problems = () => {
  return (
    <>
    <Navbar />
    <div>
      <h1 className="text-2xl font-bold mb-4">Questions</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/submit" className="text-blue-500 hover:underline">
            Question 1
          </Link>
        </li>
        <li>
          <Link to="/questions/2" className="text-blue-500 hover:underline">
            Question 2
          </Link>
        </li>
        <li>
          <Link to="/questions/3" className="text-blue-500 hover:underline">
            Question 3
          </Link>
        </li>
        {/* Add more questions as needed */}
      </ul>
    </div>
    </>
  );
};

export default Problems;
