const express = require("express");
const songRouter = express.Router();
const songController = require("../controllers/song.controller");
const upload = require("../middlewares/upload.middleware");

songRouter.post("/", upload.single("song"), songController.uploadSong);
songRouter.get("/",songController.getSong);
songRouter.get("/all", songController.getAllSongs);
module.exports = songRouter;
