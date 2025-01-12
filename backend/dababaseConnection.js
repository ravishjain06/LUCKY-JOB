import mongoose from "mongoose";

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONDODB_URI)
        console.log('Connected to Database');
    } catch (error) {
        console.log(error);
    }
}

