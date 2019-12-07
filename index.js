// packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// local imports
const routes = require("./routes/events");
const db = require("./db/index");
const eventseeders = require("./db/seeders/events");

// variables
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const baseUrl = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.send("Brickbase Assesment");
});

app.use(`${baseUrl}`, routes);

// catch invalid routes
app.all("*", (req, res) => {
  res.status(404).json({
    error: "This route does not exist yet!"
  });
});

// connect to database server and start application server
db.connect().then(() => {
  if (!module.parent) {
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log("Application listening in port ", PORT));
  }
});

module.exports = app;
