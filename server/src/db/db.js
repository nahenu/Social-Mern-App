import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is Connected");
  } catch (error) {
    throw new Error(error);
  }
};
