const express = require('express');
const { addItemToBasket, deleteBasketItem, updateBasketItem } = require('../controllers/basketController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

router.route('')
    .post(protect, addItemToBasket);

router.route('/:id')
    .delete(protect, deleteBasketItem)
    .patch(protect, updateBasketItem);

module.exports = router;
