import React, { useState } from 'react'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const ResetPass = () => {
    const [password, setPassword] = useState("");
    const { token } = useParams();

    const handleClick = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/api/auth/resetpass/${token}`, {password}, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })
            console.log(res);
            if(res.status === 200) {
                toast('Password reset successful');
                // alert("Password reset successful");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <Toaster />
      <h1>Reset Password</h1>
      <Input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="create new password" />
      <Button onClick={handleClick}>Submit</Button>
    </div>
  )
}

export default ResetPass
