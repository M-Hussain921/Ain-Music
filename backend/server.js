import "dotenv/config";
import express from "express";

import { connectRedis } from "./config/redisClient.js";
import { connectMongo } from "./config/mongoClient.js";

const app = express();
app.use(express.json());

const startServer = async () => {
  await connectMongo();
  await connectRedis();
  const port = process.env.PORT;

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
