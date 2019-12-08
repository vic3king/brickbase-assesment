const mongoose = require("mongoose");
const app = require("../../index");
const request = require("supertest");
const mocks = require("../utils/mocks");
const authHelper = require("../../helpers/auth");

let userToken;

beforeAll(async () => {
  userToken = await authHelper.encode(mocks.user1);
});

describe("Register new user", () => {
  it("should register a new user and generated a new token", async () => {
    await request(app)
      .post("/api/v1/auth/register")
      .send({
        ...mocks.user3
      })
      .then(res => {
        const { success, token, user } = res.body;
        expect(res.statusCode).toEqual(201);
        expect(success).toBeTruthy();
        expect(user.email).toEqual(mocks.user3.email);
        expect(token).toBeTruthy();
      });
  });

  it("should not creat an existing user", async () => {
    await request(app)
      .post("/api/v1/auth/register")
      .send({
        ...mocks.user3
      })
      .then(res => {
        const { success, user, message } = res.body;
        expect(res.statusCode).toEqual(400);
        expect(success).toBeFalsy;
        expect(message).toEqual("Bad request");
      });
  });
});

describe("Get User and Events", () => {
  it("should return authenticated User and all of that users events", async () => {
    await request(app)
      .get("/api/v1/users/user")
      .set({ authorization: userToken })
      .then(res => {
        const {
          events,
          email
        } = res.body.user[0];

        expect(res.statusCode).toEqual(200);
        expect(email).toEqual("king@mail.com");
        expect(events.length).toBe(1);
      });
  });
});

afterAll(() => mongoose.disconnect());
