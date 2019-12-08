const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../index");
const seeds = require("../../db/seeders/seeds");
const authHelper = require("../../helpers/auth");

const mocks = require("../utils/mocks");

let userToken;
let invaliduser;

beforeAll(() => {
  return seeds();
});

beforeEach(async () => {
  userToken = await authHelper.encode(mocks.user1);
  invaliduser = await authHelper.encode(mocks.user2);
});

describe("Get Events", () => {
  it("should return all events", async () => {
    await request(app)
      .get("/api/v1/events")
      .then(res => {
        const { success, events } = res.body;
        expect(res.statusCode).toEqual(200);
        expect(success).toBeTruthy();
        expect(events.length).toBe(2);
      });
  });
});

describe("Get all evevnts for authenticated user", () => {
  it("should return all events", async () => {
    await request(app)
      .get("/api/v1/events/user")
      .set({ authorization: userToken })
      .then(res => {
        const { success, events } = res.body;
        expect(res.statusCode).toEqual(200);
        expect(success).toBeTruthy();
        expect(events.length).toBe(2);
        expect(events[0].user).toEqual(mocks.user1.id);
      });
  });
});

describe("Create Events", () => {
  it("should not create an event if user is not authenticated", async () => {
    return request(app)
      .post("/api/v1/events/event")
      .send({
        ...mocks.event1
      })
      .then(res => {
        const {
          success,
          errors: { body }
        } = res.body;
        expect(res.statusCode).toEqual(401);
        expect(success).toBeFalsy();
        expect(body).toEqual(["You are not authorized"]);
      });
  });

  it("should not create an event if user token is forbidden", async () => {
    return request(app)
      .post("/api/v1/events/event")
      .set({ authorization: "wiZXhwIjoxNTc2MDcxMjIzfQ.B28up3" })
      .send({
        ...mocks.event1
      })
      .then(res => {
        const {
          success,
          errors: { body }
        } = res.body;
        expect(res.statusCode).toEqual(403);
        expect(success).toBeFalsy();
        expect(body).toEqual(["Forbidden"]);
      });
  });

  it("should not create an event with invalid user", async () => {
    await request(app)
      .post("/api/v1/events/event")
      .set({ authorization: invaliduser })
      .send({
        ...mocks.event1
      })
      .then(res => {
        const { success, message } = res.body;
        expect(res.statusCode).toEqual(400);
        expect(success).toBeFalsy();
        expect(message).toEqual("user does not exist");
      });
  });

  it("should create a new event", async () => {
    await request(app)
      .post("/api/v1/events/event")
      .set({ authorization: userToken })
      .send({
        ...mocks.event1
      })
      .then(res => {
        const { success, event } = res.body;
        expect(res.statusCode).toEqual(201);
        expect(success).toBeTruthy();
        expect(event.title).toEqual(mocks.event1.title);
      });
  });

  it("should not create a duplicate event", async () => {
    await request(app)
      .post("/api/v1/events/event")
      .set({ authorization: userToken })
      .send({
        ...mocks.event1
      })
      .then(res => {
        const { success, message } = res.body;
        expect(res.statusCode).toEqual(400);
        expect(success).toBeFalsy();
        expect(message).toBe(
          "An Event already exist at this venue on this day"
        );
      });
  });
});

afterAll(() => mongoose.disconnect());
