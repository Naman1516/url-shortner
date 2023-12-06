import User from "../models/userModel.js";

const getUser = async (email) => {
  return await User.findOne({ email });
};

const registerService = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};

const updateRefreshToken = async (id, refreshToken) => {
  return await User.updateOne({ _id: id }, { refreshToken });
};

const revokeAccessToken = async (id) => {
  return await User.updateOne(
    { _id: id },
    {
      refreshToken: null,
    }
  );
};

export { getUser, registerService, updateRefreshToken, revokeAccessToken };
