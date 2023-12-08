import User from "../models/userModel.js";
import { redisClient } from "../utils/connectToRedis.js";

const getUser = async (email) => {
  return await User.findOne({ email });
};

const registerService = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};

const updateRefreshToken = async (id, refreshToken) => {
  return await redisClient.setEx(
    `refreshToken:${id}`,
    process.env.REFRESH_TOKEN_EXPIRY,
    refreshToken
  );
};

const revokeRefreshToken = async (id) => {
  return await redisClient.del(`refreshToken:${id}`);
};

const isRefreshTokenAvailable = async (id) => {
  return await redisClient.get(`refreshToken:${id}`);
};

export {
  getUser,
  registerService,
  updateRefreshToken,
  revokeRefreshToken,
  isRefreshTokenAvailable,
};
