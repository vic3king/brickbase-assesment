const express = require("express");
const EventController = require("../controllers/EventController");
const middlewares = require("../middlewares");

const { verifyToken, checkIfEventExists } = middlewares;

const eventRoute = express.Router();

eventRoute.post(
  "/events/event",
  [verifyToken, checkIfEventExists],
  EventController.addEvent
);
eventRoute.get("/events/user", verifyToken, EventController.getUsersEvents);
eventRoute.get("/events", EventController.getAllEvents);

module.exports = eventRoute;
