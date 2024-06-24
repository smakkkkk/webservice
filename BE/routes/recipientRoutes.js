const express = require('express');
const {
  getAllRecipients,
  getRecipientById,
  createRecipient,
  updateRecipient,
  deleteRecipient,
} = require('../controllers/recipientController');

const router = express.Router();

router.route('/')
  .get(getAllRecipients)
  .post(createRecipient);

router.route('/:id')
  .get(getRecipientById)
  .patch(updateRecipient)
  .delete(deleteRecipient);

module.exports = router;
