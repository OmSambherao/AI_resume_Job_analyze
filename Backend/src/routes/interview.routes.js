const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const interviewRoute = express.Router();

const {generateInterviewReportController} = require("../controllers/interview.controller");

const upload = require("../middleware/file.middlewear");



/**
 * @route POST api/interview
 * @description get a interview report on the basis of user self description , resume , pdf ans job desciption
 * @access private
 */

interviewRoute.post("/", authMiddleware.verifyToken,   upload.single("resume"),  generateInterviewReportController);

module.exports = interviewRoute;
