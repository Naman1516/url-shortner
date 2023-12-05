import express from "express";
import { authorize, register, refresh } from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.post("/authorize", authorize);
authRouter.post("/register", register);
authRouter.post("/refresh", refresh);

export { authRouter };
