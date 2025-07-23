const Book = require('../models/Book');
const Review = require('../models/Review');

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get paginated, filtered list of books with average rating
exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, author, sortBy = 'createdAt', order = 'desc' } = req.query;
    const filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;
    const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
    const books = await Book.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('reviews');
    // Calculate average rating for each book
    const booksWithAvg = await Promise.all(books.map(async (book) => {
      const avgRating = book.reviews.length
        ? (book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length).toFixed(2)
        : null;
      return { ...book.toObject(), avgRating };
    }));
    const total = await Book.countDocuments(filter);
    res.json({ books: booksWithAvg, total });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get book by ID with reviews and average rating
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate({
      path: 'reviews',
      populate: { path: 'reviewer', select: 'email' }
    });
    if (!book) return res.status(404).json({ message: 'Book not found.' });
    const avgRating = book.reviews.length
      ? (book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length).toFixed(2)
      : null;
    res.json({ ...book.toObject(), avgRating });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
