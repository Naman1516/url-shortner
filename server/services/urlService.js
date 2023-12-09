import Url from "../models/urlModel.js";
const BASE_URL = process.env.BASE_URL;
import { redisClient } from "../utils/connectToRedis.js";

const getAllUrlsService = async () => {
  const cachedUrls = await redisClient.get("allUrls");
  if (!cachedUrls) {
    const urls = await Url.find().sort({ date: -1 }).exec();
    await redisClient.setEx("allUrls", 30, JSON.stringify(urls));
    return urls;
  } else {
    return JSON.parse(cachedUrls);
  }
};

const findUrlByOriginal = async (origUrl) => {
  const key = `orgUrl:${origUrl}`;
  const cachedResult = await redisClient.get(key);

  if (!cachedResult) {
    const result = await Url.findOne({ origUrl });
    if (result) {
      await redisClient.setEx(key, 600, JSON.stringify(result));
    }
    return result;
  } else {
    return JSON.parse(cachedResult);
  }
};

const findByUrlId = async (urlId) => {
  const key = `urlId:${urlId}`;
  const cachedResult = await redisClient.get(key);

  if (!cachedResult) {
    const result = await Url.findOne({ urlId });
    if (result) {
      await redisClient.setEx(key, 600, JSON.stringify(result));
    }
    return result;
  } else {
    return JSON.parse(cachedResult);
  }
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
