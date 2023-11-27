const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectToDatabase } = require("./utils/utils");
const urlRoutes = require("./routes/urlRoutes");

dotenv.config();
const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// DB Connection
connectToDatabase();

// Routes
app.use("/", urlRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
