import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import { connectToDatabase } from "./utils/utils.js";

import { urlRouter } from "./routes/urlRoutes.js";
import { authRouter } from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// DB Connection
connectToDatabase();

// Routes
app.use("/auth", authRouter);
app.use("/", urlRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
