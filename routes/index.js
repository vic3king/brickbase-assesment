const express = require('express');
const eventRoute = require('./events');

const router = express.Router();

router.use(eventRoute);

module.exports = router;
