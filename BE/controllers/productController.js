const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const mongoose = require('mongoose')

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate('category')
    res.status(200).json(products)
})

// Get one product by ID
const getProductById = asyncHandler(async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such product!"})
    }

    const product = await Product.findById(id).populate('category')
    if (!product){
        return res.status(404).json({error: "No such product!"})
    }

    res.status(200).json(product)
})

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    const { name, category, price, description,} = req.body

    if (!name || !category || !price || !description  ) {
        return res.status(400).json({error: "Please provide all required fields"})
    }

    const product = new Product({
        name,
        category,
        price,
        description,
        
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// Update a product by ID
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such product!"})
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate('category')

    if (!updatedProduct) {
        return res.status(404).json({error: "No such product!"})
    }

    res.status(200).json(updatedProduct)
})

// Delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such product!"})
    }

    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
        return res.status(404).json({error: "No such product!"})
    }

    res.status(200).json({message: "Product deleted successfully"})
})

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}
