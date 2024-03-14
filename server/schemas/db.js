import mongoose from "mongoose";

export const conexionDB = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://sam:sam123@cluster0.zdyxlxk.mongodb.net/')
        console.log("connected DB")
    }catch(error){
        console.log(error)
    }
}