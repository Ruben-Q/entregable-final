const { getAll, create, remove} = require('../controllers/productImag.controllers');
const express = require('express');

const routerProductImag = express.Router();

routerProductImag.route('/')
    .get(getAll)
    .post(upload.single('image'), create);

routerProductImag.route('/:id')
    .delete(remove)
    

module.exports = routerProductImag;