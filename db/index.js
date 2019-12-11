const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URI = process.env.MONGODB_URL;
const TEST_MONGO_URI = process.env.TEST_MONGO_URI;

const connect = () =>
  new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      mongoose
        .connect(TEST_MONGO_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    } else {
      mongoose
        .connect(MONGO_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });

const close = () => mongoose.disconnect();
// db.once('open', _ => console.log('Database connected:', url));
// db.on('error', err => console.error('connection error:', err));
module.exports = { connect, close };
