import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Chip, Pagination, TextField, MenuItem, Stack, Rating, CircularProgress } from '@mui/material';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const limit = 6;
  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (genre) params.genre = genre;
      if (author) params.author = author;
      const res = await api.get('/books', { params });
      setBooks(res.data.books);
      setTotal(res.data.total);
      // Extract unique genres and authors for filters
      setGenres([...new Set(res.data.books.map(b => b.genre))]);
      setAuthors([...new Set(res.data.books.map(b => b.author))]);
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, [page, genre, author]);

  return (
    <Box p={3} bgcolor="background.default" minHeight="100vh">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Books</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/add-book')}>Add Book</Button>
      </Stack>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField select label="Genre" value={genre} onChange={e => setGenre(e.target.value)} sx={{ minWidth: 120 }}>
          <MenuItem value="">All</MenuItem>
          {genres.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
        </TextField>
        <TextField select label="Author" value={author} onChange={e => setAuthor(e.target.value)} sx={{ minWidth: 120 }}>
          <MenuItem value="">All</MenuItem>
          {authors.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
        </TextField>
      </Stack>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress color="primary" size={60} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {books.length === 0 ? (
            <Grid>
              <Box textAlign="center" mt={8}>
                <Typography variant="h6" color="text.secondary">No books found. Add your first book!</Typography>
              </Box>
            </Grid>
          ) : books.map(book => (
            <Grid key={book._id}>
              <Card sx={{
                cursor: 'pointer',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.03)',
                  boxShadow: 6,
                },
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }} onClick={() => navigate(`/books/${book._id}`)}>
                <Box display="flex" justifyContent="center" alignItems="center" pt={3}>
                  <Box sx={{ width: 60, height: 80, bgcolor: '#e3eafc', borderRadius: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h3" color="primary" sx={{ opacity: 0.2 }}>
                      📚
                    </Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>{book.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{book.author}</Typography>
                  <Chip label={book.genre} sx={{ mt: 1, mb: 1 }} />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Rating value={Number(book.avgRating) || 0} precision={0.1} readOnly />
                    <Typography variant="body2">{book.avgRating ? `${book.avgRating} / 5` : 'No ratings'}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination count={Math.ceil(total / limit)} page={page} onChange={(_, val) => setPage(val)} color="primary" />
      </Box>
    </Box>
  );
};

export default BookList; 