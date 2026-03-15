const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const authUser = require("../middlewares/auth.middleware");

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.get("/get-me", authUser, authController.getMe);
authRouter.post("/logout",authController.logoutUser)

module.exports = authRouter;
