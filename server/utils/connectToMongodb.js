import mongoose from "mongoose";

const connectToMongodb = async () => {
  try {
    const dbConfig = {
      dbName: "url_shortner_db",
    };
    await mongoose.connect(process.env.MONGO_URI, dbConfig);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
  }
};

export { connectToMongodb };
