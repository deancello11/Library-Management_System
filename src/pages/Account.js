import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { useAuth } from '../contexts/AuthContextFirebase';

const Account = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    middleName: user?.middleName || '',
    address: user?.address || '',
    driverLicense: user?.driverLicense || '',
    state: user?.state || '',
    isAdmin: user?.isAdmin || false,
    adminCode: ''
  });
  const [message, setMessage] = useState('');

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h5">Please login to view your account</Typography>
      </Box>
    );
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.isAdmin && !user.isAdmin && formData.adminCode !== 'ADMIN123') {
      setMessage('Invalid admin permission code');
      return;
    }

    updateUser(formData);
    setMessage('Account updated successfully!');
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Account Management
      </Typography>
      
      {message && (
        <Alert 
          severity={message.includes('successfully') ? 'success' : 'error'} 
          sx={{ mb: 2 }}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Account Information
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Email (Username): {user.email} (cannot be changed)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Account Status: {user.isAdmin ? 'Administrator' : 'Patron'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Late Returns: {user.lateReturns || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Max Items: {user.maxItems}
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Middle Name"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Mailing Address"
            name="address"
            multiline
            rows={2}
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Driver's License"
            name="driverLicense"
            value={formData.driverLicense}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          {!user.isAdmin && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isAdmin}
                    onChange={handleChange}
                    name="isAdmin"
                  />
                }
                label="Upgrade to Admin Account"
                sx={{ mt: 2 }}
              />
              
              {formData.isAdmin && (
                <TextField
                  fullWidth
                  label="Admin Permission Code"
                  name="adminCode"
                  type="password"
                  value={formData.adminCode}
                  onChange={handleChange}
                  margin="normal"
                  required
                  helperText="Enter admin permission code to upgrade account"
                />
              )}
            </>
          )}
          
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Update Account
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Account;