import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const HomePage = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-screen mt-72 flex flex-col bg-gray-100">
        {/* Main Section */}
        <main className="flex-grow mt-96">
          {/* <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-600 ">Welcome to CodeHub</h2>
            <p className="text-lg md:text-xl mb-6 text-gray-600">
              Enhance your problem-solving skills and prepare for interviews with our vast collection of coding challenges.
            </p>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200">
              Get Started
            </button>
          </div>
        </section> */}
          {/* <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white min-h-screen flex items-center justify-center">
            <div className="bg-white text-center px-8 py-12 rounded-2xl shadow-lg max-w-xl">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
                Welcome to CodeHub
              </h2>
              <p className="text-lg md:text-xl mb-6 text-gray-600">
                Enhance your problem-solving skills and prepare for interviews with our vast collection of coding challenges.
              </p>
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-lg shadow-md hover:scale-105 transition-transform">
                Get Started
              </button>
            </div>
          </section> */}
          <section className="min-h-screen bg-lightbg flex  justify-center">
            <div className="flex max-w-4xl shadow-lg rounded-lg overflow-hidden">
              {/* Left Section: Welcome Message */}
              <div className="w-1/2 bg-olive text-white p-8 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to CodeHub</h1>
                <p className="text-center mb-6 text-lg">
                  Enhance your problem-solving skills and prepare for interviews with our vast collection of coding challenges.
                </p>
              </div>

              {/* Right Section: Get Started */}
              <div className="w-1/2 bg-white p-8 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Ready to Get Started?</h2>
                <button className="w-3/4 bg-basegreen text-white px-4 py-2 rounded-lg hover:bg-olive transition mb-4">
                  Get Started
                </button>
                <p className="text-sm text-gray-400">Join now and start solving challenges today!</p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-lightbg">
            <div className="container mx-auto px-6 ">
              <div className="mt-10">
              <h3 className="text-3xl font-bold text-center mb-10 text-basegreen">Features</h3>
                <div className='grid md:grid-cols-3 gap-10'>
                  <div className="bg-white p-8 shadow-lg rounded-2xl text-center">
                    <h4 className="text-xl font-semibold mb-4 text-olive">Diverse Problems</h4>
                    <p className="text-olive">
                      Solve problems across various domains and difficulty levels.
                    </p>
                  </div>
                  <div className="bg-white p-8 shadow-lg rounded-2xl text-center">
                    <h4 className="text-xl font-semibold mb-4 text-olive">Live Rankings</h4>
                    <p className="text-olive">
                      Compete with peers and track your progress in real-time.
                    </p>
                  </div>
                  <div className="bg-white p-8 shadow-lg rounded-2xl text-center">
                    <h4 className="text-xl font-semibold mb-4 text-olive">Interactive Tutorials</h4>
                    <p className="text-olive">
                      Learn new concepts with interactive and engaging tutorials.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>


        </main>
      </div>
    </>
  )
}

export default HomePage
