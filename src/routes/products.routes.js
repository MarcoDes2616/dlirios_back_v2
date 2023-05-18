const { getAll, create, getOne, remove, update } = require('../controllers/products.controller');
const express = require('express');
const upload = require('../utils/multer')
const { firebaseFile } = require('../middleware/firebase.middleware');

const productsRouter = express.Router();

productsRouter.route('/')
    .get(getAll)
    .post( upload.single("image"), firebaseFile, create);

productsRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = productsRouter;