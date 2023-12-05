import express from "express";
const urlRouter = express.Router();
import * as UrlController from "../controllers/urlController.js";

urlRouter.get("/all", UrlController.getAllUrls);
urlRouter.post("/short", UrlController.shortenUrl);
urlRouter.get("/:urlId", UrlController.redirectToOriginalUrl);

export { urlRouter };
