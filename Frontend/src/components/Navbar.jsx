import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import cocoLogo from "../assets/coco.svg";
const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));

    // Extract user ID from token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload

        setUserId(payload.userId);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        toast.success("Logged out successfully");
        navigate("/overall");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <Toaster />
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse" href="/homepage">
          {/* <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          /> */}
          <img src={cocoLogo} alt="Coco Logo" className="h-8 w-auto" />

          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" >
            CocoCode
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <button
              onClick={logout}
              type="button"
              className="text-white bg-basegreen hover:bg-olive focus:ring-4 focus:outline-none focus:ring-lightbg font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-lightbg dark:hover:bg-olive dark:focus:ring-basegreen"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/homepage"
                className="block py-2 px-3 text-white bg-olive rounded md:bg-transparent md:text-olive md:p-0 md:dark:text-olive"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href={userId ? `/user/${userId}` : "#"}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-olive md:p-0 md:dark:hover:text-olive dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/problems"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-olive md:p-0 md:dark:hover:text-olive dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Problem set
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-olive md:p-0 md:dark:hover:text-olive dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
