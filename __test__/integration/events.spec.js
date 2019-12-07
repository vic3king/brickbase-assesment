const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");
const eventseeders = require("../../db/seeders/events");

const mocks = require("../utils/mocks");

beforeAll(() => {
  return eventseeders();
});

describe("Get Events", () => {
  it("should return all events", async () => {
    await request(app)
      .get("/api/v1/events")
      .then(res => {
        const { success, events} = res.body
        expect(res.statusCode).toEqual(200);
        expect(success).toBeTruthy()
        expect(events.length).toBe(2);
      });
  });
});

describe("Create Events", () => {
  it("should create a new event", async () => {
    await request(app)
      .post("/api/v1/events/event")
      .send({
        ...mocks.event1
      })
      .then(res => {
        const { success, event} = res.body
        expect(res.statusCode).toEqual(201);
        expect(success).toBeTruthy()
        expect(event.title).toEqual(mocks.event1.title);
      });
  });

  it("should not create a duplicate event", async () => {
    await request(app)
      .post("/api/v1/events/event")
      .send({
        ...mocks.event1
      })
      .then(res => {
        const { success, message} = res.body
        expect(res.statusCode).toEqual(400);
        expect(success).toBeFalsy()
        expect(message).toBe("An Event already exist at this venue on this day")
      });
  });
});

afterAll(() => mongoose.disconnect());
