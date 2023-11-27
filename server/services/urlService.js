const Url = require("../models/urlModel");
const dotenv = require("dotenv");
dotenv.config();
const BASE_URL = process.env.BASE_URL;

const getAllUrlsService = async () => {
  return await Url.find().exec();
};

const findUrlByOriginal = async (origUrl) => {
  return await Url.findOne({ origUrl });
};

const findByUrlId = async (urlId) => {
  return await Url.findOne({ urlId });
};

const incrementClickCount = async (urlId) => {
  return await Url.updateOne(
    { urlId },
    {
      $inc: {
        clicks: 1,
      },
    }
  );
};

const createShortenedUrl = async (origUrl, urlId) => {
  const url = new Url({
    origUrl,
    shortUrl: BASE_URL + urlId,
    urlId,
    date: new Date(),
  });

  await url.save();
  return url;
};

module.exports = {
  getAllUrlsService,
  findUrlByOriginal,
  findByUrlId,
  createShortenedUrl,
  incrementClickCount,
};
