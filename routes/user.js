const express = require("express");
const UserController = require("../controllers/UserController");
const middlewares = require("../middlewares");

const { verifyToken } = middlewares;
const userRoute = express.Router();

userRoute.post("/auth/register", UserController.createUser);
userRoute.get("/users/user", verifyToken, UserController.getUser);

module.exports = userRoute;
