const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const Authenticate = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  /**
   * @description - this method encodes a token
   *
   * @static
   * @param {object} userObj
   * @returns {string} token
   * @memberof Authenticate
   */
  encode(userObj) {
    const secret = process.env.SECRET;
    const token = jwt.sign({ userObj }, secret, { expiresIn: "72h" });
    return token;
  },

  /**
   * @description - this method decodes a token
   *
   * @static
   * @param {string} token
   * @returns {object} isVerified
   * @memberof Authenticate
   */
  decode(token) {
    const isVerified = jwt.verify(token, process.env.SECRET);
    return isVerified;
  }
};

module.exports = Authenticate;
