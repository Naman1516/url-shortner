import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import { connectToMongodb } from "./utils/connectToMongodb.js";
import { redisClient } from "./utils/connectToRedis.js";
import { urlRouter } from "./routes/urlRoutes.js";
import { authRouter } from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    redisClient.connect();
    await connectToMongodb();
    app.listen(process.env.PORT, () => {
      console.log(`Running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await redisClient.quit();
  process.exit(0);
});

app.use("/auth", authRouter);
app.use("/", urlRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

startServer();
