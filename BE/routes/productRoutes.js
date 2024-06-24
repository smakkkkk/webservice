const express = require('express');
const { 
    getAllProducts, 
    getProductById, 
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const upload = require('../config/storageConfig'); // If you're handling file uploads
const productRoutes = express.Router();

productRoutes.get('', getAllProducts);
productRoutes.get('/:id', getProductById);
productRoutes.post('', createProduct);
productRoutes.patch('/:id', updateProduct);
productRoutes.delete('/:id', deleteProduct);

module.exports = productRoutes;
