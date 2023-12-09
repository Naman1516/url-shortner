import Url from "../models/urlModel.js";
const BASE_URL = process.env.BASE_URL;

const getAllUrlsService = async () => {
  return await Url.find().sort({ date: -1 }).exec();
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

export {
  getAllUrlsService,
  findUrlByOriginal,
  findByUrlId,
  createShortenedUrl,
  incrementClickCount,
};
