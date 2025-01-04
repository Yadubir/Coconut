import { useState } from 'react'
import './App.css'
import './style.css'
import Signup from './components/Signup'
import Otp from './components/Otp'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
