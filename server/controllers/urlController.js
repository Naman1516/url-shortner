import {
  findByUrlId,
  findUrlByOriginal,
  createShortenedUrl,
  incrementClickCount,
  getAllUrlsService,
} from "../services/urlService.js";
import shortid from "shortid";
import { validateUrl } from "../utils/utils.js";

const getAllUrls = async (req, res, next) => {
  try {
    const data = await getAllUrlsService();
    return res.json({ status: "success", data });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: "Server Error" });
  }
};

const shortenUrl = async (req, res) => {
  const { origUrl } = req.body;
  if (validateUrl(origUrl)) {
    try {
      let url = await findUrlByOriginal(origUrl);

      if (url) {
        res.json(url);
      } else {
        const urlId = shortid.generate();
        url = await createShortenedUrl(origUrl, urlId);

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "failed", message: "Server Error" });
    }
  } else {
    res.status(400).json({ status: "failed", message: "Invalid Url!" });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  const { urlId } = req.params;
  const details = await findByUrlId(urlId);
  if (details) {
    const { origUrl } = details;
    await incrementClickCount(urlId);
    res.redirect(origUrl);
  } else {
    res.status(404).json("Invalid URL Id");
  }
};

export { getAllUrls, shortenUrl, redirectToOriginalUrl };
