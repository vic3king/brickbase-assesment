const express = require("express");
const EventController = require("../controllers/EventController");

const eventRoute = express.Router();

eventRoute.post("/events/event", EventController.addEvent);
eventRoute.get("/events", EventController.getAllEvents);

module.exports = eventRoute;
