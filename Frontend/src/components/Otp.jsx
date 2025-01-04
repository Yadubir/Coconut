import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";

const Otp = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Get email from state
  const [otp, setOtp] = useState("");

  const otpHandler = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/verify", {
        email,
        oneTimePassword: otp,
      });
      if (res.status === 200) {
        alert("Email verified successfully");
        navigate("/homepage");
      }
    } catch (error) {
      console.log("OTP Verification failed:", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-100 overflow-hidden">
    {/* Email Input */}
    <div className="flex flex-col mb-8 w-80">
      <label 
        htmlFor="email" 
        className="text-lg font-medium text-gray-700 mb-2 flex justify-center"
      >
        Your Email
      </label>
      <input
        className="text-gray-500 bg-gray-200 rounded-lg px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        value={email}
        type="text"
        id="name"
        placeholder="Your Email"
        readOnly
      />
    </div>
  
    {/* OTP Input */}
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-2 mb-6">
        <InputOTP maxLength={6} onChange={(otp) => setOtp(otp)}>
          <InputOTPGroup>
            <InputOTPSlot 
              index={0} 
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <InputOTPSlot 
              index={1} 
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <InputOTPSlot 
              index={2} 
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </InputOTPGroup>
          <InputOTPSeparator>
            <span className="mx-2 text-gray-500 text-lg">-</span>
          </InputOTPSeparator>
          <InputOTPGroup>
            <InputOTPSlot 
              index={3} 
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <InputOTPSlot 
              index={4} 
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <InputOTPSlot 
              index={5} 
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>
  
      {/* Submit Button */}
      <Button
        onClick={otpHandler}
        className="bg-blue-500 text-white text-lg px-8 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Submit
      </Button>
    </div>
  </div>
  


  );
};

export default Otp;
