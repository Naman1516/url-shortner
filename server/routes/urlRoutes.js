import express from "express";
import {
  getAllUrls,
  shortenUrl,
  redirectToOriginalUrl,
} from "../controllers/urlController.js";

const urlRouter = express.Router();

urlRouter.get("/all", getAllUrls);
urlRouter.post("/short", shortenUrl);
urlRouter.get("/:urlId", redirectToOriginalUrl);

export { urlRouter };
