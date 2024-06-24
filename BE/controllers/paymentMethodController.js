const asyncHandler = require('express-async-handler')
const PaymentMethod = require('../models/paymentMethodModel')
const AWS = require('aws-sdk')
const { unlinkfile } = require('../utils/unlinkFile') // Helper to delete files if needed

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_ENDPOINT,
    s3ForcePathStyle: true, // Needed with Minio
    signatureVersion: 'v4',
});

// Get all payment methods
const getAllPaymentMethods = asyncHandler(async (req, res) => {
    const paymentMethods = await PaymentMethod.find()
    res.status(200).json(paymentMethods)
})

// Get one payment method by ID
const getPaymentMethodById = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such payment method!" })
    }

    const paymentMethod = await PaymentMethod.findById(id)
    if (!paymentMethod) {
        return res.status(404).json({ error: "No such payment method!" })
    }

    res.status(200).json(paymentMethod)
})

// Create a new payment method
const createPaymentMethod = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    const logo = req.file

    if (!name || !description || !logo) {
        return res.status(400).json({ error: "Please provide all required fields" })
    }

    // Upload logo to S3
    const uploadResult = await s3.upload({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `logos/${Date.now()}_${logo.originalname}`,
        Body: logo.buffer,
        ContentType: logo.mimetype,
    }).promise()

    const paymentMethod = new PaymentMethod({
        name,
        description,
        logo: uploadResult.Location,
    })

    const createdPaymentMethod = await paymentMethod.save()
    res.status(201).json(createdPaymentMethod)
})

// Update a payment method by ID
const updatePaymentMethod = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, description } = req.body
    const logo = req.file

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such payment method!" })
    }

    const paymentMethod = await PaymentMethod.findById(id)
    if (!paymentMethod) {
        return res.status(404).json({ error: "No such payment method!" })
    }

    // Update fields
    paymentMethod.name = name || paymentMethod.name
    paymentMethod.description = description || paymentMethod.description

    if (logo) {
        // Delete old logo if needed
        const oldLogoKey = paymentMethod.logo.split('/').slice(-2).join('/')
        await s3.deleteObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: oldLogoKey,
        }).promise()

        // Upload new logo to S3
        const uploadResult = await s3.upload({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `logos/${Date.now()}_${logo.originalname}`,
            Body: logo.buffer,
            ContentType: logo.mimetype,
        }).promise()

        paymentMethod.logo = uploadResult.Location
    }

    const updatedPaymentMethod = await paymentMethod.save()
    res.status(200).json(updatedPaymentMethod)
})

// Delete a payment method by ID
const deletePaymentMethod = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such payment method!" })
    }

    const paymentMethod = await PaymentMethod.findByIdAndDelete(id)

    if (!paymentMethod) {
        return res.status(404).json({ error: "No such payment method!" })
    }

    // Delete logo from S3
    const logoKey = paymentMethod.logo.split('/').slice(-2).join('/')
    await s3.deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: logoKey,
    }).promise()

    res.status(200).json({ message: "Payment method deleted successfully" })
})

module.exports = {
    getAllPaymentMethods,
    getPaymentMethodById,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
}
