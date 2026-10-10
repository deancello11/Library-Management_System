import React from 'react';
import { Typography, Paper, Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContextFirebase';

const Home = () => {
  const { user } = useAuth();

  const cardStyle = {
    p: 4, 
    height: '100%',
    background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
    borderRadius: 3,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'visible',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -3,
      left: -3,
      right: -3,
      bottom: -3,
      borderRadius: 3,
      background: 'linear-gradient(135deg, #3182ce 0%, #2c5282 50%, #3182ce 100%)',
      backgroundSize: '200% 200%',
      zIndex: -1,
      opacity: 0,
      transition: 'opacity 0.3s ease, background-position 0.5s ease',
    },
    '& .card-title': {
      transition: 'color 0.3s ease'
    },
    '& .card-emoji': {
      transition: 'transform 0.3s ease'
    },
    '&:hover': { 
      transform: 'translateY(-8px) scale(1.02)', 
      boxShadow: '0 20px 40px rgba(49, 130, 206, 0.3)',
      '&::before': {
        opacity: 1,
        backgroundPosition: '100% 100%'
      },
      '& .card-title': {
        color: '#1e3a5f'
      },
      '& .card-emoji': {
        transform: 'scale(1.1) rotate(5deg)'
      }
    }
  };

  return (
    <Box>
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 50%, #3182ce 100%)',
          color: 'white',
          p: 6,
          borderRadius: 3,
          mb: 4,
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          fontWeight="700"
          sx={{ 
            fontFamily: '"Segoe UI", "Roboto", "Helvetica", sans-serif',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Library Management System
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            opacity: 0.95, 
            fontWeight: 300,
            position: 'relative',
            zIndex: 1
          }}
        >
          {user ? `Welcome back, ${user.firstName || user.email.split('@')[0]}! 👋` : 'Discover, borrow, and manage your collection'}
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={cardStyle}>
            <Box className="card-emoji" sx={{ fontSize: '3rem', mb: 2 }}>📚</Box>
            <Typography className="card-title" variant="h5" gutterBottom fontWeight="600" color="#2c5282">
              Browse Collection
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary" sx={{ minHeight: '60px' }}>
              Explore our complete catalog of books, CDs, DVDs, comics, and more
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to="/browse"
              fullWidth
              sx={{ 
                backgroundColor: '#3182ce',
                textTransform: 'none',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)',
                '&:hover': { 
                  backgroundColor: '#2c5282',
                  boxShadow: '0 6px 16px rgba(44, 82, 130, 0.4)'
                }
              }}
            >
              Browse Now →
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={cardStyle}>
            <Box className="card-emoji" sx={{ fontSize: '3rem', mb: 2 }}>🔍</Box>
            <Typography className="card-title" variant="h5" gutterBottom fontWeight="600" color="#2c5282">
              Search Materials
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary" sx={{ minHeight: '60px' }}>
              Find exactly what you're looking for by title, author, or ISBN
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to="/search"
              fullWidth
              sx={{ 
                backgroundColor: '#3182ce',
                textTransform: 'none',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)',
                '&:hover': { 
                  backgroundColor: '#2c5282',
                  boxShadow: '0 6px 16px rgba(44, 82, 130, 0.4)'
                }
              }}
            >
              Search Now →
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={cardStyle}>
            <Box className="card-emoji" sx={{ fontSize: '3rem', mb: 2 }}>{user ? '📦' : '🚀'}</Box>
            <Typography className="card-title" variant="h5" gutterBottom fontWeight="600" color="#2c5282">
              {user ? 'My Items' : 'Get Started'}
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary" sx={{ minHeight: '60px' }}>
              {user ? 'View and manage your checked-out items and reservations' : 'Create an account to start borrowing'}
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to={user ? '/checked-out' : '/register'}
              fullWidth
              sx={{ 
                backgroundColor: '#3182ce',
                textTransform: 'none',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)',
                '&:hover': { 
                  backgroundColor: '#2c5282',
                  boxShadow: '0 6px 16px rgba(44, 82, 130, 0.4)'
                }
              }}
            >
              {user ? 'View My Items →' : 'Sign Up →'}
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 4, 
          background: 'linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%)',
          border: '2px solid #cbd5e0',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #3182ce, #2c5282, #3182ce)',
            backgroundSize: '200% 100%',
            animation: 'gradient 3s ease infinite',
          },
          '@keyframes gradient': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' }
          }
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="600" color="#2c5282" sx={{ mb: 3 }}>
          📋 Library Rules
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              <Typography variant="h3" sx={{ color: '#3182ce', fontWeight: '700', mb: 1 }}>5</Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="500">Max items per user</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              <Typography variant="h3" sx={{ color: '#3182ce', fontWeight: '700', mb: 1 }}>21</Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="500">Days checkout period</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              <Typography variant="h3" sx={{ color: '#3182ce', fontWeight: '700', mb: 1 }}>$0.50</Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="500">Per day late fee</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                p: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              <Typography variant="h3" sx={{ color: '#3182ce', fontWeight: '700', mb: 1 }}>3</Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="500">Days before reminder</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Home;
