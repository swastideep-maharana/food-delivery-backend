import mongoose from "mongoose";
import "dotenv/config";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("db Connected");
  } catch (err) {
    console.error(err);
  }
};
