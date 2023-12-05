import User from "../models/userModel.js";

const authorizeService = async (email) => {
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

export { authorizeService, registerService, updateRefreshTokenService };
