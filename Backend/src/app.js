const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const authRouter = require("./routes/auth.route");
const songRouter = require("./routes/song.routes");

app.use("/api/auth", authRouter);
app.use("/api/song", songRouter);

module.exports = app;
