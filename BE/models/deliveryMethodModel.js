const mongoose = require('mongoose');

const deliveryMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DeliveryMethod = mongoose.model('DeliveryMethod', deliveryMethodSchema);

module.exports = DeliveryMethod;
