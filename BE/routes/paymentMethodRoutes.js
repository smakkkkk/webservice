const express = require('express');
const { 
    getAllPaymentMethods, 
    getPaymentMethodById, 
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
} = require('../controllers/paymentMethodController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

const paymentMethodRoutes = express.Router();

paymentMethodRoutes.get('', getAllPaymentMethods);
paymentMethodRoutes.get('/:id', getPaymentMethodById);
paymentMethodRoutes.post('', upload.single('logo'), createPaymentMethod);
paymentMethodRoutes.patch('/:id', upload.single('logo'), updatePaymentMethod);
paymentMethodRoutes.delete('/:id', deletePaymentMethod);

module.exports = paymentMethodRoutes;
