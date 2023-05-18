const express = require('express');
const productsRouter = require('./products.routes');
const categoryRouter = require('./category.routes');
const systemRouter = require('./system.routes');
const router = express.Router();

// colocar las rutas aquí
router.use("/products", productsRouter)

router.use("/categories", categoryRouter)

router.use("/system", systemRouter)


module.exports = router;