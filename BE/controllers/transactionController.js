const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');
const Checkout = require('../models/checkoutModel');

// Create a transaction
const createTransaction = asyncHandler(async (req, res) => {
  const { checkoutId, amount, providerData, status } = req.body;

  if (!checkoutId || !amount || !providerData) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const transaction = new Transaction({
    checkoutId,
    amount,
    providerData,
    status: status || 'PENDING', // Default to 'PENDING' if not provided
  });

  const createdTransaction = await transaction.save();
  res.status(201).json(createdTransaction);
});

// Get transaction by ID
const getTransactionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findById(id).populate('checkoutId');
  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  res.status(200).json(transaction);
});

module.exports = {
  createTransaction,
  getTransactionById,
};
