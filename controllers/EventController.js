/* eslint-disable no-console */
const Event = require("../db/models/Event");
const User = require("../db/models/User");

module.exports = {
  addEvent: async (req, res) => {
    const { body: data } = req;

    const userId = req.user.userObj.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist"
      });
    }

    Event.create({ ...data, user: userId })
      .then(async event => {
        user.events.push(event);
        await user.save();

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
  },

  getUsersEvents: (req, res) => {
    Event.find({ user: req.user.userObj.id })
      .then(events => {
        res.json({ success: true, events });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "An Error Occured, please try again later"
        });
      });
  }
};
