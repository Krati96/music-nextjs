import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId } : any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(),10)
    //todo configure mail for usage
    if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,
            {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
    }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,
            {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 2400000})
    }

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "cbe6854f0aab6d", //dont use like that ye sab env m hona chahiye
          pass: "********383e" //dont use like that ye sab env m hona chahiye
        }
      });

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "krati.mv2724@gmail.com",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: 'kv.krati.varshney@gmail.com', // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Hello ✔" : "Reset your password", // Subject line
    //   text: "Hello world?", // plain text body
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, // html body
    };

    const mailRes = await transporter.sendMail(mailOptions)
    return mailRes

  } catch (error:any) {
    console.log(error)
    throw new Error(error.message)
  }
};
