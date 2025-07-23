const Review = require('../models/Review');
const Book = require('../models/Book');

// Add a review to a book
exports.addReview = async (req, res) => {
  try {
    const { review_text, rating } = req.body;
    const { id: bookId } = req.params;
    if (!review_text || !rating) {
      return res.status(400).json({ message: 'Review text and rating are required.' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }
    const review = new Review({
      review_text,
      rating,
      reviewer: req.user.userId,
      book: bookId
    });
    await review.save();
    // Add review to book
    await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get all reviews for a book
exports.getReviews = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const reviews = await Review.find({ book: bookId }).populate('reviewer', 'email');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
