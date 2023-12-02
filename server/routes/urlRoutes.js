import express from "express";
const router = express.Router();
import * as UrlController from "../controllers/urlController.js";

router.get("/all", UrlController.getAllUrls);
router.post("/short", UrlController.shortenUrl);
router.get("/:urlId", UrlController.redirectToOriginalUrl);

export { router };
