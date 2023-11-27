const express = require("express");
const router = express.Router();
const UrlController = require("../controllers/urlController");

router.get("/all", UrlController.getAllUrls);
router.post("/short", UrlController.shortenUrl);
router.get("/:urlId", UrlController.redirectToOriginalUrl);

module.exports = router;
