const express = require('express');
const UserRouter = express.Router();
const {authenticator} = require("../middlewares/auth");
const {login,signup,logout} = require("../controller/user.controller");

UserRouter.post("/signup",signup);
UserRouter.post("/login",login);
UserRouter.get("/logout", authenticator, logout);

module.exports={UserRouter};