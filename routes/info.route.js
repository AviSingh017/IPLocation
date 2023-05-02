const express = require('express');
const infoRouter = express.Router();

const {authenticator} = require("../middlewares/auth");
const {validateIPAddress} = require("../middlewares/validator");
const {getcity} = require("../controller/info.controller");

infoRouter.get("/:IP",authenticator,validateIPAddress,getcity);

module.exports={infoRouter};