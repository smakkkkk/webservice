const asyncHandler = require('express-async-handler');
const BasketItem = require('../models/basketItemModel');
const mongoose = require('mongoose');

// Add an item to the basket
const addItemToBasket = asyncHandler(async (req, res) => {
    const { product, quantity } = req.body;

    if (!product || !quantity) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    const basketItem = new BasketItem({
        user: req.user._id,
        product,
        quantity,
    });

    const createdBasketItem = await basketItem.save();
    res.status(201).json(createdBasketItem);
});

// Delete an item from the basket
const deleteBasketItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such basket item" });
    }

    const basketItem = await BasketItem.findById(id);
    if (!basketItem) {
        return res.status(404).json({ error: "No such basket item" });
    }

    // Ensure the user owns the basket item
    if (basketItem.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Access denied" });
    }

    await basketItem.remove();
    res.status(200).json({ message: "Basket item removed" });
});

// Update a basket item
const updateBasketItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such basket item" });
    }

    const basketItem = await BasketItem.findById(id);
    if (!basketItem) {
        return res.status(404).json({ error: "No such basket item" });
    }

    // Ensure the user owns the basket item
    if (basketItem.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Access denied" });
    }

    basketItem.quantity = quantity || basketItem.quantity;

    const updatedBasketItem = await basketItem.save();
    res.status(200).json(updatedBasketItem);
});

module.exports = {
    addItemToBasket,
    deleteBasketItem,
    updateBasketItem,
};
