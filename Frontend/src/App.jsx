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
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/DashBoard";
import ProtectedRoute from "./context/ProtectedRoute";
import Problems from "./components/Problems";
import ProblemDetail from "./components/ProblemDetail";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />

          {/* <Route element={<ProtectedRoute />}>
          </Route> */}
            <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/submit/:id" element={<CodeSubmission />} />
            <Route path="/problems" element={<Problems />} />
            {/* <Route path="/problems/:id" element={<ProblemDetail />} /> */}
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/user/:id" element={<Dashboard />} />
          </Route>

          
          <Route path="/overall" element={<Overall />} />
          <Route path="/resetpass/:token" element={<ResetPass />} />
          {/* <Route path="/submit" element={<CodeSubmission />} /> */}
          <Route path="admin/uploadproblem" element={<ProblemForm />} />
        </Routes>
      </Router>
  );
}

export default App;
