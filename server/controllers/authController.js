import {
  authorizeService,
  registerService,
  updateRefreshTokenService,
} from "../services/authService.js";
import { genSalt, hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

const authorize = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { _doc: userWithHash } = await authorizeService(email);
    const { hash, ...user } = userWithHash;
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Unable to login with supplied credentials",
      });
    }

    const passwordMatch = await compare(password, hash);
    if (!passwordMatch) {
      return res.json({ status: "error", message: "Password didn't match!" });
    }

    const accessToken = sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = sign({ user }, process.env.REFRESH_TOKEN_SECRET);

    await updateRefreshTokenService(user.id, refreshToken);

    return res.json({ status: "success", accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = { firstName, lastName, email, hash: hashedPassword };
    const { _doc: response } = await registerService(user);
    delete response.hash;
    const accessToken = sign(
      { user: response },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    // handle with redis
    const refreshToken = sign({ user }, process.env.REFRESH_TOKEN_SECRET);
    await updateRefreshTokenService(user.id, refreshToken);

    res.json({ status: "success", user: response, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
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
      const accessToken = sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      });
      return res.json({ status: "success", accessToken });
    }
  );
};

export { authorize, register, refresh };
