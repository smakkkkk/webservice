const asyncHandler = require('express-async-handler')
const Brand = require('../models/brandModel')
const mongoose = require('mongoose')
const { unlinkfile } = require('../utils/unlinkFile')


// get all brands
const getAllBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find()
    res.status(200).json(brands)
})


// get one Brand
const getBrandById = asyncHandler(async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Brand!"})
    }

    const brand = await Brand.findById(id)
    if (!brand){
        return res.status(404).json({error: "No such Brand!"})
    }

    res.status(200).json(Brand)
})


module.exports = {
    getAllBrands,
    getBrandById,
    
}