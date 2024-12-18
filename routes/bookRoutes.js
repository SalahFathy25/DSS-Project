const express = require('express');
const { addBook, borrowBook } = require('../controllers/bookController');
const router = express.Router();

router.post('/add', addBook);
router.post('/borrow/:id', borrowBook);

module.exports = router;
