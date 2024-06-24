const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const mongoose = require('mongoose')
const { unlinkfile } = require('../utils/unlinkFile')

const createUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  if (!user) {
    res.status(400).json({ message: error.message });
  }

  await user.save();
  res.status(201).json(user);
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
})

module.exports = {
  createUser,
  getUser
  
}