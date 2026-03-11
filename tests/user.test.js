const request = require("supertest");
const app = require("../index");

describe("User API", () => {
  const uniqueId = Date.now();

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        username: `user${uniqueId}`,
        email: `user${uniqueId}@test.com`,
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: `user${uniqueId}@test.com`,
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(`user${uniqueId}@test.com`);
  });
});