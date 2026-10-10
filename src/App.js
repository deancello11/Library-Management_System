import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { AuthProvider } from './contexts/AuthContextFirebase';
import { LibraryProvider } from './contexts/LibraryContextFirebase';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Browse from './pages/Browse';
import Account from './pages/Account';
import AdminPanel from './pages/AdminPanel';
import CheckedOutItems from './pages/CheckedOutItems';
import FirebaseSetup from './pages/FirebaseSetup';

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/checked-out" element={<CheckedOutItems />} />
            <Route path="/firebase-setup" element={<FirebaseSetup />} />
          </Routes>
        </Container>
      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;