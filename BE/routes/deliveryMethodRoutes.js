const express = require('express');
const {
  createDeliveryMethod,
  getDeliveryMethods,
  getDeliveryMethodById,
  updateDeliveryMethod,
  deleteDeliveryMethod
} = require('../controllers/deliveryMethodController');

const router = express.Router();

router.route('/')
  .post(createDeliveryMethod)
  .get(getDeliveryMethods);

router.route('/:id')
  .get(getDeliveryMethodById)
  .put(updateDeliveryMethod)
  .delete(deleteDeliveryMethod);

module.exports = router;