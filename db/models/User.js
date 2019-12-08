const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");
const authHelper = require("../../helpers/auth");

userSchema.pre("validate", async function() {
  if (this.isNew) {
    const hashedPassword = await authHelper.hashPassword(this.password);
    this.password = hashedPassword;
  }
});

// User MODEL
const User = mongoose.model("User", userSchema);

module.exports = User;
