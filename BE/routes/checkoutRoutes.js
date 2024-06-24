const express = require('express');
const { createCheckout, getCheckoutById } = require('../controllers/checkoutController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

router.route('')
  .post(protect, createCheckout);

router.route('/:id')
  .get(protect, getCheckoutById);

module.exports = router;
