import mongoose from "mongoose";

export const connectMongo = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("MongoDB connected");
};
