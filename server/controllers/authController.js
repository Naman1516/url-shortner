import {
  getUser,
  registerService,
  updateRefreshToken,
  revokeAccessToken,
} from "../services/authService.js";
import { genSalt, hash as genHash, compare } from "bcrypt";
import { generateToken } from "../utils/utils.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
import { v4 as uuid4 } from "uuid";

const authorize = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUser(email);
    if (!user) {
      return res.status(401).send({
        status: "error",
        message: "Unable to login with supplied credentials",
      });
    }

    const passwordMatch = await compare(password, user.hash);
    if (!passwordMatch) {
      return res
        .status(401)
        .send({ status: "error", message: "Password didn't match!" });
    }

    const { _doc: userDocument } = user;
    const { hash, refreshToken: prevRefreshToken, ...claims } = userDocument;

    const accessToken = generateToken(claims);

    const refreshToken = generateToken(claims, true);

    await updateRefreshToken(user._id, refreshToken);

    return res.json({ status: "success", accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const exisitingUser = await getUser(email);
    if (exisitingUser) {
      return res.status(400).send({
        status: "error",
        message: "User already exists",
      });
    }

    // if user doesn't exist
    const salt = await genSalt();
    const hashedPassword = await genHash(password, salt);
    const user = {
      _id: uuid4(),
      firstName,
      lastName,
      email,
      hash: hashedPassword,
    };
    const { hash, ...claims } = user;

    const accessToken = generateToken(claims);
    // handle with redis
    const refreshToken = generateToken(claims, true);

    const { _doc: response } = await registerService({ ...user, refreshToken });
    delete response.hash;
    delete response.refreshToken;

    return res.json({
      status: "success",
      user: response,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).send("Refresh token not provided");
  }
  verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, userWithAdditionalInfo) => {
      if (err) return res.status(403).send(err.message);
      const { user } = userWithAdditionalInfo;
      const accessToken = generateToken(user);
      return res.json({ status: "success", accessToken });
    }
  );
};

const logout = async (req, res) => {
  const { userId } = req.body;
  try {
    await revokeAccessToken(userId);
    return res.json({ status: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export { authorize, register, refresh, logout };
