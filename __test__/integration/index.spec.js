const request = require("supertest");
const app = require("../../index");
const mongoose = require("mongoose");

describe("WELCOME PAGE", () => {
  it("should return error", () => {
    request(app)
      .get("/")
      .then(res => {
        expect(res.statusCode).toEqual(200);
      });
  });
});

describe("ERROR PAGE", () => {
  it("should return error", () => {
    request(app)
      .get("/fghberg")
      .then(res => {
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual("This route does not exist yet!");
      });
  });
});

afterAll(() => mongoose.disconnect());
