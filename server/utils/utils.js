const mongoose = require("mongoose");

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
  // Your validation logic here
  return true;
};

module.exports = { connectToDatabase, validateUrl };
