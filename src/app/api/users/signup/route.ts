//next js vercel pr chalta h server pr nahi qk ye neraest edge dekhta h
//next js nearest location pr jo computing resource h uss pr chalta h na ki standard server pr
//db har baar connect krna padta h

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json() // re quest.json ek promise h isiliye time leta h isilye await use kiya
        const {username, email, password} = reqBody
        //validation
        console.log(reqBody)

        const user = await User.findOne(email)
        if(user){
            return NextResponse.json({error:"User is already exists"},
                {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPass = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashPass
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        //send verification email
        await sendEmail({email,emailType:"VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User Registered Successfully",
            success: true,
            savedUser,
            status: 200
        })


    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}