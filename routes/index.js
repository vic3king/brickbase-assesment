const express = require("express");
const userRoute = require("./user");
const eventRoute = require("./events");

const router = express.Router();

router.use(userRoute);
router.use(eventRoute);

module.exports = router;
