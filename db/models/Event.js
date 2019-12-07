const mongoose = require("mongoose");
const eventSchema = require("../schema/EventSchema");

// Event MODEL
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
