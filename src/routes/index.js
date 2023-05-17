const express = require('express');
const productsRouter = require('./products.routes');
const router = express.Router();

// colocar las rutas aquí
router.use("/products", productsRouter)


module.exports = router;