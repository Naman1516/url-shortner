import express from "express";
import {
  authorize,
  register,
  refresh,
  logout,
} from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.post("/authorize", authorize);
authRouter.post("/register", register);
authRouter.post("/refresh", refresh);
authRouter.delete("/logout", logout);

export { authRouter };
