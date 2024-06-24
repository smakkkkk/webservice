const DeliveryMethod = require('../models/deliveryMethodModel');

// Create Delivery Method
const createDeliveryMethod = async (req, res) => {
  try {
    const { name, description } = req.body;
    const deliveryMethod = new DeliveryMethod({ name, description });
    await deliveryMethod.save();
    res.status(201).json(deliveryMethod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Delivery Methods
const getDeliveryMethods = async (req, res) => {
  try {
    const deliveryMethods = await DeliveryMethod.find();
    res.status(200).json(deliveryMethods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Delivery Method By ID
const getDeliveryMethodById = async (req, res) => {
  try {
    const deliveryMethod = await DeliveryMethod.findById(req.params.id);
    if (!deliveryMethod) return res.status(404).json({ message: 'Delivery Method not found' });
    res.status(200).json(deliveryMethod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Delivery Method
const updateDeliveryMethod = async (req, res) => {
  try {
    const { name, description } = req.body;
    const deliveryMethod = await DeliveryMethod.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!deliveryMethod) return res.status(404).json({ message: 'Delivery Method not found' });
    res.status(200).json(deliveryMethod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Delivery Method
const deleteDeliveryMethod = async (req, res) => {
  try {
    const deliveryMethod = await DeliveryMethod.findByIdAndDelete(req.params.id);
    if (!deliveryMethod) return res.status(404).json({ message: 'Delivery Method not found' });
    res.status(200).json({ message: 'Delivery Method deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDeliveryMethod,
  getDeliveryMethods,
  getDeliveryMethodById,
  updateDeliveryMethod,
  deleteDeliveryMethod,
};
