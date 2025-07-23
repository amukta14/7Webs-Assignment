import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/books', { title, author, genre });
      navigate('/books');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
      <Paper elevation={6} sx={{ p: 4, minWidth: 350, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h5" mb={2} fontWeight={600}>Add Book</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Title" fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)} required />
          <TextField label="Author" fullWidth margin="normal" value={author} onChange={e => setAuthor(e.target.value)} required />
          <TextField label="Genre" fullWidth margin="normal" value={genre} onChange={e => setGenre(e.target.value)} required />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2, fontWeight: 600, letterSpacing: 1, boxShadow: 2, ':hover': { background: '#7B9ACC' } }}>Add Book</Button>
          <Button color="secondary" fullWidth sx={{ mt: 1, borderRadius: 2, fontWeight: 500, opacity: 0.7 }} onClick={() => navigate('/books')}>Back to List</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddBook; 