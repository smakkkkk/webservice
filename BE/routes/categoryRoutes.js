const express = require('express');
const { 
    getAllCategories, 
    getCategoryById, 
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const upload = require('../config/storageConfig');
const categoryRoutes = express.Router();

categoryRoutes.get('', getAllCategories);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.post('', createCategory);
categoryRoutes.patch('/:id', updateCategory);
categoryRoutes.delete('/:id', deleteCategory);

module.exports = categoryRoutes;
