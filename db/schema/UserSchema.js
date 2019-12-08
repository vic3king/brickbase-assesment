const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }]
  },
  {
    timestamps: true
  }
);

module.exports = UserSchema;
