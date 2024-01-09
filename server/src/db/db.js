import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://arpitgoyal841:arpitsocial@cluster0.hzyjdpv.mongodb.net/Social?retryWrites=true&w=majority");
    console.log("Database is Connected");
  } catch (error) {
    throw new Error(error);
  }
};
