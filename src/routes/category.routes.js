const { getAll, create, getOne, remove, update } = require('../controllers/category.controller');
const express = require('express');

const categoryRouter = express.Router();

categoryRouter.route('/')
    .get(getAll)
    // .post(create);

// categoryRouter.route('/:id')
//     .get(getOne)
//     .delete(remove)
//     .put(update);

module.exports = categoryRouter;