const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipient',
      required: true,
    },
    basketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Basket',
      required: true,
    },
    paymentMethodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod',
      required: true,
    },
    deliveryMethodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryMethod',
      required: true,
    },
    paymentTotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
