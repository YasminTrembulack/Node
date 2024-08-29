const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController')

router
    .get("/api/product", ProductController.getAll )
    .get("/api/product/:id", ProductController.getProductById )
    .post("/api/product", ProductController.createOne )
    .post("/api/products", ProductController.createMany )
    .delete("/api/product/:id", ProductController.delete )
    .put("/api/product/:id", ProductController.replace )
        
module.exports = router