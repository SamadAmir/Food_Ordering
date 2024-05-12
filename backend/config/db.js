import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://k213873:windowslive@cluster0.zytrts5.mongodb.net/Food-Order').then(()=>console.log("DataBase Connected"));
}