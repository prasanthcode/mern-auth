require("dotenv").config();
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongodb!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(cors());

app.use(express.json());

app.listen(3000, () => {
  console.log(`server listening on port 3000!`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
