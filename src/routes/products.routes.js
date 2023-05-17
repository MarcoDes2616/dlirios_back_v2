const { getAll, create, getOne, remove, update } = require('../controllers/products.controller');
const express = require('express');

const productsRouter = express.Router();

productsRouter.route('/')
    .get(getAll)
    .post(create);

productsRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = productsRouter;