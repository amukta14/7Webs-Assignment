import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import Header from './components/Header';
import { SnackbarProvider } from './components/SnackbarContext';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Router>
          <Header />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="*" element={<BookList />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
