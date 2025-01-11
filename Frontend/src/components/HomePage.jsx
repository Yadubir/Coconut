import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const HomePage = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return (
    <>
    <Navbar />
    <div className="min-h-screen w-screen mt-72 flex flex-col bg-gray-100">
      {/* Main Section */}
      <main className="flex-grow mt-96">
        <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-600">Welcome to CodeHub</h2>
            <p className="text-lg md:text-xl mb-6 text-gray-600">
              Enhance your problem-solving skills and prepare for interviews with our vast collection of coding challenges.
            </p>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200">
              Get Started
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8">Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 shadow rounded-lg text-center">
                <h4 className="text-xl font-semibold mb-4">Diverse Problems</h4>
                <p className="text-gray-600">Solve problems across various domains and difficulty levels.</p>
              </div>
              <div className="bg-gray-50 p-6 shadow rounded-lg text-center">
                <h4 className="text-xl font-semibold mb-4">Live Rankings</h4>
                <p className="text-gray-600">Compete with peers and track your progress in real-time.</p>
              </div>
              <div className="bg-gray-50 p-6 shadow rounded-lg text-center">
                <h4 className="text-xl font-semibold mb-4">Interactive Tutorials</h4>
                <p className="text-gray-600">Learn new concepts with interactive and engaging tutorials.</p>
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
