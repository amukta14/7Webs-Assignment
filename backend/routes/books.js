const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, bookController.addBook);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

module.exports = router;
