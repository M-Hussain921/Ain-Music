import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectRedis } from "./config/redisClient.js";
import { connectMongo } from "./config/mongoClient.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes);

const startServer = async () => {
  await connectMongo();
  await connectRedis();
  const port = process.env.PORT||5000;

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();