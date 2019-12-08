/* eslint-disable no-console */
const User = require("../db/models/User");
const authHelper = require("../helpers/auth");

module.exports = {
  createUser: async (req, res) => {
    const { body: data } = req;
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Bad request"
      });
    }

    User.create(data)
      .then(async user => {
        const { id, email } = user;
        const token = authHelper.encode({ id, email });
        res.status(201).json({
          success: true,
          token,
          user
        });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: "An Error Occured, please try again later"
        });
      });
  },

  getUser: (req, res) => {
    User.find({ _id: req.user.userObj.id })
      .populate("events")
      .then(user => {
        res.json({ success: true, user });
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
