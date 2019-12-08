const authHelper = require("./auth");

const verifyAuthHeader = req => {
  try {
    if (!req.headers.authorization) {
      return { error: "error" };
    }
    const token = req.headers.authorization;
    const payload = authHelper.decode(token);
    return payload;
  } catch (err) {
    return { error: "Invalid token" };
  }
};

module.exports = verifyAuthHeader;
