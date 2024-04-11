import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!) //! laga k ye confrm kr diya ki string ayegi hi ham sahi kr rhe hain
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("MongoDb connected")
        })
        connection.on('error',(err)=>{
            console.log("MongoDb connection error, please check"+err)
            process.exit()
        })
    } catch (error) {
        console.log("Something went wrong in DB.")
        console.log(error)
    }
}