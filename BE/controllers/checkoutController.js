const asyncHandler = require('express-async-handler');
const Checkout = require('../models/checkoutModel');
const User = require('../models/userModel');
const Recipient = require('../models/recipientModel');
const Basket = require('../models/basketItemModel');
const PaymentMethod = require('../models/paymentMethodModel');
const DeliveryMethod = require('../models/deliveryMethodModel');

// Create a checkout
const createCheckout = asyncHandler(async (req, res) => {
  const { recipientId, basketId, paymentMethodId, deliveryMethodId, paymentTotal } = req.body;

  if (!recipientId || !basketId || !paymentMethodId || !deliveryMethodId || !paymentTotal) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const checkout = new Checkout({
    user: req.user._id,
    recipientId,
    basketId,
    paymentMethodId,
    deliveryMethodId,
    paymentTotal,
  });

  const createdCheckout = await checkout.save();
  res.status(201).json(createdCheckout);
});

// Get checkout by ID
const getCheckoutById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const checkout = await Checkout.findById(id)
    .populate('auth')
    .populate('recipient')
    .populate('basket')
    .populate('paymentMethod')
    .populate('deliveryMethod');
    
  if (!checkout) {
    return res.status(404).json({ error: "Checkout not found" });
  }

  res.status(200).json(checkout);
});

module.exports = {
  createCheckout,
  getCheckoutById,
};
