const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const UrlSchema = require("./schema/Url");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "mydb",
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/all", async (req, res, next) => {
  try {
    const data = await UrlSchema.find().exec();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
