import User from "../models/userModel.js";

const getUser = async (email) => {
  return await User.findOne({ email });
};

const registerService = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};

const updateRefreshTokenService = async (id, refreshToken) => {
  return await User.findByIdAndUpdate(id, {
    refreshToken,
  });
};

export { getUser, registerService, updateRefreshTokenService };
