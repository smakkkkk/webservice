const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    checkoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Checkout',
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'ERROR'],
      default: 'PENDING',
    },
    amount: {
      type: Number,
      required: true,
    },
    providerData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true, // This will create "created" and "updated" fields
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
