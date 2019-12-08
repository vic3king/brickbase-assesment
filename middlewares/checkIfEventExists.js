const Event = require("../db/models/Event");

/**
 * @method checkIfEventExists
 * @description checks if an event already exists before saving it
 * @param {*} req
 * @param {*} res
 * @returns {*} - JSON response object
 */

const checkIfEventExists = async (req, res, next) => {
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
    return res.status(400).json({
      success: false,
      message: "An Event already exist at this venue on this day"
    });
  }
  return next();
};

module.exports = checkIfEventExists;
