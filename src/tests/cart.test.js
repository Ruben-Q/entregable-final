require("../models");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");

const BASE_URL = "/api/v1/cart";
let TOKEN, cartId;
let product;
let cart;

// Los contenidos usados en el test lo creamos en el "beforeAll"
beforeAll(async () => {
  const body = {
    // Usuario logeado
    email: "jose@gmail.com",
    password: "1234Jose",
  };

  const res = await request(app)
    .post("/api/v1/users/login") // Login del usuario
    .send(body);

  TOKEN = res.body.token;

  product = await Product.create({
    title: "Restorante",
    description: "Comida italiana",
    price: 200,
  });

  cart = {
    productId: product.id,
    quantity: 5,
  };
});

afterAll(async () => {
  await product.destroy();
});

test("POST -> 'BASE_URL' should return statusCode (201), and res.body.cart === cart.userId", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(cart)
    .set("Authorization", `Bearer ${TOKEN}`); // Con el "send" le enviamos el usuario a logear

  cartId = res.body.id; //

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(cart.quantity);
});

test("GET -> 'BASE_URL' should return res.statusCode (200) and res.body.id === cart.id", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`);

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET --> 'BASE_URL/:id', should return status code 200 and res.body.quantity === cart.quantity", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
});

test("PUT --> 'BASE_URL/:id', should return status code 200 and res.body.quantity === cartUpdate.quantity", async () => {

    const cartUpdate = {
        quantity: 2
    }

    const res = await request(app)
        .put(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(cartUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cartUpdate.quantity)
});

test("DELETE --> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})