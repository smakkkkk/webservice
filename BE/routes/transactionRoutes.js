const express = require('express');
const { createTransaction, getTransactionById } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

router.route('')
  .post(protect, createTransaction);

router.route('/:id')
  .get(protect, getTransactionById);

module.exports = router;
