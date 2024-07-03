const { getAll, create, getOne, remove, update, setImages } = require('../controllers/product.controlles');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerProduct = express.Router();

routerProduct.route('/')
    .get(getAll)
    .post(verifyJwt, create); // 🔒

    routerProduct.route('/:id/images')
    .post(verifyJwt, setImages) // 🔒

routerProduct.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove) // 🔒
    .put(verifyJwt, update); // 🔒

module.exports = routerProduct;