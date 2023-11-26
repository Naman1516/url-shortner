const Url = require("../models/UrlModel");

const getAllUrlsService = async () => {
  return await Url.find().exec();
};

const findUrlByOriginal = async (origUrl) => {
  return await Url.findOne({ origUrl });
};

const createShortenedUrl = async (origUrl, urlId) => {
  const url = new Url({
    origUrl,
    urlId,
    date: new Date(),
  });

  await url.save();
  return url;
};

module.exports = {
  getAllUrlsService,
  findUrlByOriginal,
  createShortenedUrl,
};
