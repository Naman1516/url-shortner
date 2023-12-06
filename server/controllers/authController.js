import {
  getUser,
  registerService,
  updateRefreshTokenService,
} from "../services/authService.js";
import { genSalt, hash, compare } from "bcrypt";
import { generateToken } from "../utils/utils.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;

const authorize = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { _doc: userWithHash } = await getUser(email);
    const { hash, ...user } = userWithHash;
    if (!user) {
      return res.sendStatus(401).send({
        status: "error",
        message: "Unable to login with supplied credentials",
      });
    }

    const passwordMatch = await compare(password, hash);
    if (!passwordMatch) {
      return res
        .sendStatus(401)
        .send({ status: "error", message: "Password didn't match!" });
    }

    const accessToken = generateToken(user);

    const refreshToken = generateToken(user, true);

    await updateRefreshTokenService(user.id, refreshToken);

    return res.json({ status: "success", accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send({
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
      return res.sendStatus(400).send({
        status: "error",
        message: "User already exists",
      });
    }

    // if user doesn't exist
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = { firstName, lastName, email, hash: hashedPassword };
    const { _doc: response } = await registerService(user);
    delete response.hash;
    const accessToken = generateToken(response);
    // handle with redis
    const refreshToken = generateToken(response, true);
    await updateRefreshTokenService(user.id, refreshToken);

    return res.json({
      status: "success",
      user: response,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send({
      status: "error",
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.setStatus(400).send("Refresh token not provided");
  }
  verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, userWithAdditionalInfo) => {
      if (err) return res.sendStatus(403).send(err.message);
      const { user } = userWithAdditionalInfo;
      const accessToken = generateToken(user);
      return res.json({ status: "success", accessToken });
    }
  );
};

export { authorize, register, refresh };
