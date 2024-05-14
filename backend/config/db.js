import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('YOUR DATABASE CONNECTION').then(()=>console.log("DataBase Connected"));
}
