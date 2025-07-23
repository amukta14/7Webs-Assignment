import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4, borderBottom: '1px solid #eee', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(6px)' }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, color: '#7B9ACC', letterSpacing: 1, cursor: 'pointer' }} onClick={() => navigate('/books')}>
          LitLoom
        </Typography>
        <Box>
          {isLoggedIn ? (
            <>
              <Button color="primary" onClick={() => navigate('/books')}>Books</Button>
              <Button color="primary" onClick={() => navigate('/add-book')}>Add Book</Button>
              <Button color="secondary" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="primary" onClick={() => navigate('/login')}>Login</Button>
              <Button color="secondary" onClick={() => navigate('/signup')}>Signup</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 