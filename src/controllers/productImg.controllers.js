const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const path = require('path')
const fs = require('fs')

const getAll = catchError(async(req, res) => {
    const results = await ProductImg.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    //productId /hacemos un enpoit

    // url

    //filename

    //const result = await ProductImag.create(req.body);
    //return res.status(201).json(result);
    const { filename } = req.file
    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`
    
    const result = await ProductImg.create({filename, url})
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductImg.findByPk(id)
    if (!result) return res.sendStatus(404)
    return res.sendStatus(204);
    
});

module.exports = {
    getAll,
    create,
    remove,

}