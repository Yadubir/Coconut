import { useState } from 'react'
import './App.css'
import './style.css'
// import './styles.css'
import Signup from './components/Signup'
import Otp from './components/Otp'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'
// import Login from './components/Login';
import Overall from './components/Overall';
import ResetPass from './components/ResetPass'
import CodeSubmission from './components/CodeSubmission'
import ProblemForm from './components/ProblemForm'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/overall" element={<Overall />} />
        <Route path="/resetpass/:token" element={<ResetPass />} />
        <Route path="/submit" element={<CodeSubmission />} />
        <Route path="admin/uploadproblem" element={<ProblemForm />} />
      </Routes>
    </Router>
  )
}

export default App
