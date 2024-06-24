const asyncHandler = require('express-async-handler');
const Recipient = require('../models/recipientModel');
const mongoose = require('mongoose');

// Get all recipients (no authorization required)
const getAllRecipients = asyncHandler(async (req, res) => {
  const recipients = await Recipient.find().populate('userId', 'name email');
  res.status(200).json(recipients);
});

// Get recipient by ID (no authorization required)
const getRecipientById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipient" });
  }

  const recipient = await Recipient.findById(id);
  if (!recipient) {
    return res.status(404).json({ error: "No such recipient" });
  }

  res.status(200).json(recipient);
});

// Create a new recipient (no authorization required)
const createRecipient = asyncHandler(async (req, res) => {
  const { firstName, lastName, middleName, address, phone, zipcode } = req.body;

  if (!firstName || !lastName || !middleName || !address || !phone || !zipcode) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const recipient = new Recipient({
    firstName,
    lastName,
    middleName,
    address,
    phone,
    zipcode,
    userId: req.user._id,
  });

  const createdRecipient = await recipient.save();
  res.status(201).json(createdRecipient);
});

// Update a recipient by ID (no authorization required)
const updateRecipient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, middleName, address, phone, zipcode } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipient" });
  }

  const recipient = await Recipient.findById(id);
  if (!recipient) {
    return res.status(404).json({ error: "No such recipient" });
  }

  recipient.firstName = firstName || recipient.firstName;
  recipient.lastName = lastName || recipient.lastName;
  recipient.middleName = middleName || recipient.middleName;
  recipient.address = address || recipient.address;
  recipient.phone = phone || recipient.phone;
  recipient.zipcode = zipcode || recipient.zipcode;

  const updatedRecipient = await recipient.save();
  res.status(200).json(updatedRecipient);
});

// Delete a recipient by ID (no authorization required)
const deleteRecipient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipient" });
  }

  const recipient = await Recipient.findById(id);
  if (!recipient) {
    return res.status(404).json({ error: "No such recipient" });
  }

  await recipient.remove();
  res.status(200).json({ message: "Recipient removed" });
});

module.exports = {
  getAllRecipients,
  getRecipientById,
  createRecipient,
  updateRecipient,
  deleteRecipient,
};
