const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, reviewController.addReview);
router.get('/', reviewController.getReviews);

module.exports = router;
