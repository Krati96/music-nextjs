"use client" //ye ek director h jo iss page ko client component bana deti h
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()  //ye router navigation s liya h
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
      console.log("Sign up Success",res.data)
      router.push('/login') //ye existing url m add ho jata h, isme home route pr ye url add ho jata h

    } catch (error:any) {
      console.log("Signup failed",error.message)//use toast message instead
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=> {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setBtnDisable(true)
    }else{
      setBtnDisable(false)
    }
  },[user]) // isme dependency array h user ki agar isme koi changes ho toh ye execute ho

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{btnDisable ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>
        </div>
  )
}
