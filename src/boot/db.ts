import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const db = async () => {
  try {
    const mongoosURL: any = process.env.mongoosURL;
    await mongoose.connect(mongoosURL.trim());
  } catch (error) {
    console.error("Connection Faild");
    console.error(error);
    process.exit(1);
  }
};
