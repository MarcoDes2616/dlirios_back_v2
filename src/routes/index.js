const express = require('express');
const productsRouter = require('./products.routes');
const categoryRouter = require('./category.routes');
const router = express.Router();

// colocar las rutas aquí
router.use("/products", productsRouter)

router.use("/categories", categoryRouter)


module.exports = router;