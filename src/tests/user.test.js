const request = require("supertest");
const app = require("../app");

const BASE_URL = "/api/v1/users";
let TOKEN;
let userId;

beforeAll(async () => {
  const body = {
    email: "jose@gmail.com",
    password: "1234Jose",
  };

  const res = await request(app).post(`${BASE_URL}/login`).send(body);

  //   console.log(res.body.token);

  TOKEN = res.body.token;
});

test("POST -> 'BASE_URL', should return statusCode 201, and res.body.firstName === user.firstName", async () => {
  const user = {
    firstName: "Pedro",
    lastName: "Carulo",
    email: "pedro@gmail.com",
    password: "1234Pedro",
    phone: "1433",
  };

  const res = await request(app).post(BASE_URL).send(user);

  userId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName);
});

test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 2", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);
  //   console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(2);
});

test("PUT -> 'BASE_URL/:id' should return statusCode (200) and res.body.firstname === userUpdate.firstName", async () => {
  const userUpdate = {
    firstName: "MariaUpdate",
    lastName: "Caprese",
    email: "maria@gmail.com",
    password: "1234Maria",
    phone: "1234",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(userUpdate);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(userUpdate.firstName);
});

//test "POST '"
test("POST -> 'BASE_URL/login', should return statusCode 401", async () => {
  const body = {
    email: "pedro@gmail.com",
    password: "invalid password"
  }

  const res = await request(app)
  .post(`${BASE_URL}/login`)
  .send(body)

  expect(res.statusCode).toBe(401)
})

test(
  "POST-> 'Base_url/login', should return statusCode (200), res.body.user === body.user",
  async () => {
    const body = {
      email: "pedro@gmail.com",
      password: "1234Pedro",
    };

    const res = await request(app).post(`${BASE_URL}/login`).send(body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.user).toBeDefined();
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email);
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
  const res = await request(app)
  .delete(`${BASE_URL}/${userId}`)
  .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(204)
})

//test("DELETE -> 'BASE_URL' ")
