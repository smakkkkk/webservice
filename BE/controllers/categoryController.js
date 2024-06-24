const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const mongoose = require('mongoose')
const { unlinkfile } = require('../utils/unlinkFile')

// Get all categories
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find()
    res.status(200).json(categories)
})

// Get one category by ID
const getCategoryById = asyncHandler(async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such category!"})
    }

    const category = await Category.findById(id)
    if (!category){
        return res.status(404).json({error: "No such category!"})
    }

    res.status(200).json(category)
})

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
    const { name, image, description } = req.body

    if (!name || !image || !description) {
        return res.status(400).json({error: "Please provide all required fields"})
    }

    const category = new Category({
        name,
        image,
        description,
    })

    const createdCategory = await category.save()
    res.status(201).json(createdCategory)
})

// Update a category by ID
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such category!"})
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    if (!updatedCategory) {
        return res.status(404).json({error: "No such category!"})
    }

    res.status(200).json(updatedCategory)
})

// Delete a category by ID
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such category!"})
    }

    const deletedCategory = await Category.findByIdAndDelete(id)

    if (!deletedCategory) {
        return res.status(404).json({error: "No such category!"})
    }

    // Optionally, delete associated image file
    if (deletedCategory.image) {
         await unlinkfile(deletedCategory.image)
     }

    res.status(200).json({message: "Category deleted successfully"})
})

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}
