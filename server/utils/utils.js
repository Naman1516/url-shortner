import mongoose from "mongoose";
import pkg from "jsonwebtoken";
const { verify } = pkg;

const connectToDatabase = async () => {
  try {
    const dbConfig = {
      dbName: "url_shortner_db",
    };
    await mongoose.connect(process.env.MONGO_URI, dbConfig);
    console.log("DB Connected");
  } catch (err) {
    console.error(err.message);
  }
};

const validateUrl = (url) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
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

export { connectToDatabase, validateUrl, authenticateToken };
