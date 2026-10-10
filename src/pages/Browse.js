import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { format } from 'date-fns';
import { useLibrary } from '../contexts/LibraryContextFirebase';
import { useAuth } from '../contexts/AuthContextFirebase';
import DebugPanel from '../components/DebugPanel';

const Browse = () => {
  const [filterType, setFilterType] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [message, setMessage] = useState('');
  
  const { materials, checkOutMaterial, reserveMaterial } = useLibrary();
  const { user } = useAuth();

  const filteredMaterials = materials.filter(material => {
    if (filterType === 'All') return true;
    if (filterType === 'Available') return material.available;
    if (filterType === 'Checked Out') return !material.available;
    return material.type === filterType;
  });

  const handleCheckOut = () => {
    if (!user) {
      setMessage('Please login to check out materials');
      return;
    }

    // Check current checkout count
    const userCheckedOutCount = materials.filter(m => m.checkedOutBy === user.email).length;
    const maxAllowed = user.lateReturns >= 3 ? 2 : 5;
    
    if (userCheckedOutCount >= maxAllowed) {
      setMessage(`You have reached the maximum of ${maxAllowed} checked-out items`);
      return;
    }

    // Check if material is still available (prevent race conditions)
    const currentMaterial = materials.find(m => m.id === selectedMaterial.id);
    if (!currentMaterial || !currentMaterial.available) {
      setMessage('This material is no longer available');
      setShowCheckoutDialog(false);
      return;
    }

    checkOutMaterial(selectedMaterial.id, user.email);
    setMessage('Material checked out successfully!');
    setShowCheckoutDialog(false);
  };

  const handleReserve = (material) => {
    if (!user) {
      setMessage('Please login to reserve materials');
      return;
    }

    if (material.reservedBy.includes(user.email)) {
      setMessage('You have already reserved this item');
      return;
    }

    reserveMaterial(material.id, user.email);
    setMessage('Reservation placed! You will receive an email when the item is returned.');
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Browse Library Materials
      </Typography>
      
      <DebugPanel />
      
      {message && (
        <Alert 
          severity={message.includes('successfully') || message.includes('placed') ? 'success' : 'info'} 
          sx={{ mb: 2 }}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      )}
      
      <Paper elevation={2} sx={{ p: 3, mb: 3, backgroundColor: '#f7fafc', border: '1px solid #e2e8f0' }}>
        <Box display="flex" gap={2} alignItems="center" mb={2} flexWrap="wrap">
          <FormControl sx={{ minWidth: 250, backgroundColor: 'white', borderRadius: 1 }}>
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
            >
              <MenuItem value="All">All Materials</MenuItem>
              <MenuItem value="Available">Available Only</MenuItem>
              <MenuItem value="Checked Out">Checked Out</MenuItem>
              <MenuItem value="Book">Books</MenuItem>
              <MenuItem value="CD">CDs</MenuItem>
              <MenuItem value="DVD">DVDs</MenuItem>
              <MenuItem value="Blu-ray">Blu-ray</MenuItem>
              <MenuItem value="VHS">VHS Tapes</MenuItem>
              <MenuItem value="Comic">Comics</MenuItem>
            </Select>
          </FormControl>
          
          <Chip 
            label={`${filteredMaterials.length} materials`}
            sx={{ 
              backgroundColor: '#3182ce',
              color: 'white',
              fontWeight: '500',
              fontSize: '0.95rem',
              py: 2.5 
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Call Number</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {material.title}
                    </Typography>
                  </TableCell>
                  <TableCell>{material.author}</TableCell>
                  <TableCell>
                    <Chip 
                      label={material.type} 
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {material.callNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {material.isbn || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={material.available ? 'Available' : 'Checked Out'} 
                      color={material.available ? 'success' : 'error'}
                      size="small"
                    />
                    {material.reservedBy.length > 0 && (
                      <Chip 
                        label={`${material.reservedBy.length} Reserved`} 
                        color="warning"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {material.dueDate ? (
                      format(new Date(material.dueDate), 'MMM dd, yyyy')
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {material.available ? (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setSelectedMaterial(material);
                          setShowCheckoutDialog(true);
                        }}
                        disabled={!user}
                      >
                        Check Out
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleReserve(material)}
                        disabled={!user || material.reservedBy.includes(user?.email)}
                      >
                        {material.reservedBy.includes(user?.email) ? 'Reserved' : 'Reserve'}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredMaterials.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="text.secondary">
              No materials found matching your filter
            </Typography>
          </Box>
        )}
      </Paper>

      <Dialog open={showCheckoutDialog} onClose={() => setShowCheckoutDialog(false)}>
        <DialogTitle>Check Out Material</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to check out "{selectedMaterial?.title}"?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Due date will be: {format(new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), 'MMM dd, yyyy')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCheckoutDialog(false)}>Cancel</Button>
          <Button onClick={handleCheckOut} variant="contained">
            Confirm Check Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Browse;