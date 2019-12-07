/* eslint-disable no-console */
const Event = require("../db/models/Event");

module.exports = {
  addEvent: async (req, res) => {
    const { body: data } = req;
    const dateStart = new Date(data.start);
    dateStart.setTime(
      dateStart.getTime() - new Date().getTimezoneOffset() * 60 * 1000
    );
    data.start = dateStart;

    const dateEnd = new Date(data.end);
    dateEnd.setTime(
      dateEnd.getTime() - new Date().getTimezoneOffset() * 60 * 1000
    );

    data.end = dateEnd;

    const existingEvent = await Event.findOne({
      $and: [
        {
          "location.latLng.lng": data.location.latLng.lng
        },
        {
          "location.latLng.lat": data.location.latLng.lat
        },
        {
          end: { $gte: data.end },
          start: { $lte: data.start }
        }
      ]
    });

    if (existingEvent) {
      res.status(400).json({
        success: false,
        message: "An Event already exist at this venue on this day"
      });
    } else {
      Event.create(data)
        .then(event => {
          res.status(201).json({
            success: true,
            event
          });
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            message: "An Error Occured, please try again later"
          });
        });
    }
  },
  getAllEvents: (req, res) => {
    Event.find({})
      .then(events => {
        res.json({ success: true, events });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: "An Error Occured, please try again later"
        });
      });
  }
};
