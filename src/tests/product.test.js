require('../models')
const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const Product = require('../models/Product');

const BASE_URL_USER = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'
let productId, TOKEN, category, product 

afterAll(async () => {
    await category.destroy()
})

beforeAll(async () => {
    const body = {
    email: "jose@gmail.com",
    password: "Jose1234"
    }

    category = await Category.create({
        name: "SmartTv"
    })

    product = {
        title: "Tv",
        description: "Loren1",
        price: 500,
        categoryId: category.id
    }

    const res = await request(app)
    .post(BASE_URL_USER)
    .send(body)

    TOKEN = res.body.token
});

test("POST -> 'BASE_URL', should return statusCode (201) snd res.body.title === product.title", async() => {

     const res = await request(app)
     .post(BASE_URL)
     .set('Authorization', `Bearer ${TOKEN}`)
     .send(product)

     productId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
    expect(res.body.categoryId).toBe(category.id)
})

test("GET -> 'BASE_URL' should return statusCode (201) snd res.body.length === 1", async() => {
    const res = await request(app)
    .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET -> 'BASE_URL/:id' should return statusCode (200), res.body.title === product.title", async () => {
    const res = await request(app)
    .get(`${BASE_URL}/${productId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

test("PUT -> 'BASE_URL/:id' should return statusCode (200) and res.body.title === productUpdate.title", async() => {

    const productUpdate = {
        title: "Tv",
        description: "Loren1",
        price: 500
    }
    const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(productUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(productUpdate.title)
})

test("DELETE -> 'BASE_URL/:id', should return statusCode (204)", async() => {
    const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Berer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})

