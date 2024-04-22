import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody
      
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exists"},
                {status: 400})
        }
        console.log("user Exists",user)
        const validPass = await bcryptjs.compare(password,user.password)
        if(!validPass){
            return NextResponse.json({error:"Check your credentials"},
                {status: 400})
        }

        const tokenData = {
            id: user._id,
            usrname: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: '1d'})
        
        const response = NextResponse.json({
            message: "Logged in Success",
            success: true,            
        })

        response.cookies.set("token",token,{httpOnly:true}) // Next js m cookies NextResponse s access kr lete hain node m packages install krne padte hain.

        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}