import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, Rating, TextField, Button, Divider } from '@mui/material';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const res = await api.get(`/books/${id}`);
      setBook(res.data);
    } catch (err) {
      // handle error
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/books/${id}/reviews`);
      setReviews(res.data);
    } catch (err) {
      // handle error
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
    // eslint-disable-next-line
  }, [id]);

  const handleReview = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post(`/books/${id}/reviews`, { review_text: reviewText, rating });
      setSuccess('Review added!');
      setReviewText('');
      setRating(0);
      fetchBook();
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    }
  };

  if (!book) return <Box p={3}>Loading...</Box>;

  return (
    <Box p={3} bgcolor="background.default" minHeight="100vh">
      <Button variant="outlined" onClick={() => navigate('/books')} sx={{ mb: 2, borderRadius: 2 }}>Back to List</Button>
      <Paper elevation={6} sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" fontWeight={700}>{book.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary">{book.author}</Typography>
        <Typography variant="body2" color="text.secondary">Genre: {book.genre}</Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <Rating value={Number(book.avgRating) || 0} precision={0.1} readOnly />
          <Typography variant="body2">{book.avgRating ? `${book.avgRating} / 5` : 'No ratings'}</Typography>
        </Stack>
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h6" mb={2} fontWeight={600}>Add a Review</Typography>
        <form onSubmit={handleReview}>
          <Stack spacing={2}>
            <TextField label="Review" multiline rows={3} value={reviewText} onChange={e => setReviewText(e.target.value)} required />
            <Rating value={rating} onChange={(_, val) => setRating(val)} max={5} />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            {success && <Typography color="primary" variant="body2">{success}</Typography>}
            <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 600, letterSpacing: 1, boxShadow: 2, transition: 'all 0.2s', ':active': { transform: 'scale(0.98)' } }}>Submit Review</Button>
          </Stack>
        </form>
      </Paper>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 3, boxShadow: 1 }}>
        <Typography variant="h6" mb={2} fontWeight={600}>Reviews</Typography>
        {reviews.length === 0 ? (
          <Typography>No reviews yet.</Typography>
        ) : (
          reviews.map(r => (
            <Box key={r._id} mb={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating value={r.rating} readOnly max={5} />
                <Typography variant="body2">{r.rating} / 5</Typography>
                <Typography variant="body2" color="text.secondary">by {r.reviewer?.email || 'Anonymous'}</Typography>
              </Stack>
              <Typography variant="body1">{r.review_text}</Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default BookDetail; 