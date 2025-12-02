import mongoose from "mongoose";


const connectdb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            dbName : "ChatApp"
        })
        console.log("connect to MongoDB")
    }catch{
        console.log(error)
    }   
}