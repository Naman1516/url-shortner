import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

const validateUrl = (url) => {
  const urlRegex =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}][a-z0-9\u{00a1}-\u{ffff}_-]{0,62})?[a-z0-9\u{00a1}-\u{ffff}]\.)+(?:[a-z\u{00a1}-\u{ffff}]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/iu;
  return urlRegex.test(url);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateToken = (user, isRefresh = false) => {
  const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY,
  } = process.env;

  const tokenSecret = isRefresh ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET;
  const tokenOptions = isRefresh ? REFRESH_TOKEN_EXPIRY : ACCESS_TOKEN_EXPIRY;

  return sign({ user }, tokenSecret, tokenOptions);
};

export { validateUrl, authenticateToken, generateToken };
