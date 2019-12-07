const express = require('express');
const EventController = require('../controllers/EventController');

const eventRoute = express.Router();

eventRoute.post('/', EventController.addEvent);
eventRoute.get('/', EventController.getAllEvents);

module.exports = eventRoute;
