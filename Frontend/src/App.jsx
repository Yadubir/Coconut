import { useState } from "react";
import "./App.css";
import "./style.css";
// import './styles.css'
import Signup from "./components/Signup";
import Otp from "./components/Otp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
// import Login from './components/Login';
import Overall from "./components/Overall";
import ResetPass from "./components/ResetPass";
import CodeSubmission from "./components/CodeSubmission";
import ProblemForm from "./components/ProblemForm";
import Profile from "./components/Profile";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/DashBoard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/homepage" element={
              <ProtectedRoute allowGuests={true}>
                <HomePage />
              </ProtectedRoute>
            } />
          <Route path="/profile" element={
              <ProtectedRoute allowGuests = {true}>
                <Profile />
              </ProtectedRoute>
            } />
          <Route path="/overall" element={<Overall />} />
          <Route path="/resetpass/:token" element={<ResetPass />} />
          <Route path="/submit" element={<CodeSubmission />} />
          <Route path="admin/uploadproblem" element={<ProblemForm />} />
          <Route path="user/:id" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
