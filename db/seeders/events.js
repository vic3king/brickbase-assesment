const Event = require("../models/Event");

const createSeededEvents = async () => {
  await Event.deleteMany({});
  const event1 = new Event({
    end: "July 2, 1999",
    start: "July 1, 1999",
    title: "New event one",
    details: "My shiny new event",
    location: {
      address: "No 1 city of power avenue off pedro road",
      latLng: {
        lat: "000333",
        lng: "0003333"
      }
    }
  });

  const event2 = new Event({
    end: "July 2, 1999",
    start: "July 1, 1999",
    title: "New event two",
    details: "My shiny new event",
    location: {
      address: "No 1 city of power avenue off pedro road",
      latLng: {
        lat: "000333",
        lng: "0003333"
      }
    }
  });

  await event1.save();
  await event2.save();
};

module.exports = createSeededEvents;
