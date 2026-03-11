const request = require("supertest");
const app = require("../index");

let token;

beforeAll(async () => {
  const uniqueId = Date.now();
  const email = `user${uniqueId}@test.com`;

  await request(app)
    .post("/api/users/register")
    .send({
      username: `user${uniqueId}`,
      email,
      password: "123456"
    });

  const res = await request(app)
    .post("/api/users/login")
    .send({
      email,
      password: "123456"
    });

  token = res.body.token;
});

describe("Notes API", () => {
  it("should create note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Post",
        content: "Test Content"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Post");
  });

  it("should get all notes", async () => {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
  });
});