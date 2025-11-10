import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI!);
  } catch (error) {
    console.error(error);
  }
};
