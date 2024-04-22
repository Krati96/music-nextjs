import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [user, setUser] = useState({
    email:"",
    password: "",
    username: ""
  })
  const [btnDisable, setBtnDisable] = useState(false)
  const [loading,setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/api/users/signup",user)
      
    } catch (error) {
      console.log("Signup failed")//use toast message instead
    }
  }
  return (
    <div>
      Signup pages
    </div>
  )
}
