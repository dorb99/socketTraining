const express = require('express');
const R = express.Router();
const userController = require('../controller/userController');

R.route("/").post(userController.create)

module.exports = R;
