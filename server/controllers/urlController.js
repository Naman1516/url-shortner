import * as UrlService from "../services/urlService.js";
import shortid from "shortid";
import { validateUrl } from "../utils/utils.js";

const getAllUrls = async (req, res, next) => {
  try {
    const data = await UrlService.getAllUrlsService();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const shortenUrl = async (req, res) => {
  const { origUrl } = req.body;

  if (validateUrl(origUrl)) {
    try {
      let url = await UrlService.findUrlByOriginal(origUrl);

      if (url) {
        res.json(url);
      } else {
        const urlId = shortid.generate();
        url = await UrlService.createShortenedUrl(origUrl, urlId);

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(400).json("Invalid Original Url");
  }
};

const redirectToOriginalUrl = async (req, res) => {
  const { urlId } = req.params;
  console.log({ urlId });
  const details = await UrlService.findByUrlId(urlId);
  console.log({ details });
  if (details) {
    const { origUrl } = details;
    await UrlService.incrementClickCount(urlId);
    res.redirect(origUrl);
  } else {
    res.status(404).json("Invalid URL Id");
  }
};

export { getAllUrls, shortenUrl, redirectToOriginalUrl };
