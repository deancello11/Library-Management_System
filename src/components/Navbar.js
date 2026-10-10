import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextFirebase';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e3a5f', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ py: 1 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            letterSpacing: '0.5px',
            fontFamily: '"Segoe UI", "Roboto", "Helvetica", sans-serif'
          }}
        >
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Library Management System
          </Link>
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/browse"
            sx={{ 
              textTransform: 'none',
              fontSize: '0.95rem',
              px: 2,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } 
            }}
          >
            Browse
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/search"
            sx={{ 
              textTransform: 'none',
              fontSize: '0.95rem',
              px: 2,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } 
            }}
          >
            Search
          </Button>
          
          {user ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/checked-out"
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  px: 2,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } 
                }}
              >
                My Items
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/account"
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  px: 2,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } 
                }}
              >
                {user.firstName || user.email.split('@')[0]}
              </Button>
              {user.isAdmin && (
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/admin"
                  sx={{ 
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    px: 2,
                    backgroundColor: 'rgba(66, 165, 245, 0.2)',
                    '&:hover': { backgroundColor: 'rgba(66, 165, 245, 0.3)' } 
                  }}
                >
                  Admin
                </Button>
              )}
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  px: 2,
                  ml: 1,
                  borderLeft: '1px solid rgba(255,255,255,0.2)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } 
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  px: 2,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } 
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/register"
                variant="outlined"
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  px: 2,
                  ml: 1,
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white'
                  } 
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;