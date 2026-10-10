import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { format, differenceInDays } from 'date-fns';
import { useLibrary } from '../contexts/LibraryContextFirebase';
import { useAuth } from '../contexts/AuthContextFirebase';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [message, setMessage] = useState('');
  
  const { searchMaterials, checkOutMaterial, reserveMaterial } = useLibrary();
  const { user } = useAuth();

  const handleSearch = () => {
    const results = searchMaterials(searchQuery.toLowerCase());
    
    // Sort by due date if any items are checked out
    const sorted = results.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    setSearchResults(sorted);
  };

  const handleCheckOut = () => {
    if (!user) {
      setMessage('Please login to check out materials');
      return;
    }

    // Check current checkout count from materials, not user object
    const userCheckedOutCount = searchMaterials('').filter(m => m.checkedOutBy === user.email).length;
    const maxAllowed = user.lateReturns >= 3 ? 2 : 5;
    
    if (userCheckedOutCount >= maxAllowed) {
      setMessage(`You have reached the maximum of ${maxAllowed} checked-out items`);
      return;
    }

    // Check if material is still available
    const currentResults = searchMaterials('');
    const currentMaterial = currentResults.find(m => m.id === selectedMaterial.id);
    if (!currentMaterial || !currentMaterial.available) {
      setMessage('This material is no longer available');
      setShowCheckoutDialog(false);
      handleSearch();
      return;
    }

    checkOutMaterial(selectedMaterial.id, user.email);
    setMessage('Material checked out successfully! Print your loan ticket.');
    setShowCheckoutDialog(false);
    handleSearch(); // Refresh results
  };

  const handleReserve = (material) => {
    if (!user) {
      setMessage('Please login to reserve materials');
      return;
    }

    reserveMaterial(material.id, user.email);
    setMessage('Reservation placed! You will receive an email when the item is returned.');
    handleSearch(); // Refresh results
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    return differenceInDays(new Date(dueDate), new Date());
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Library Materials
      </Typography>
      
      {message && (
        <Alert 
          severity={message.includes('successfully') ? 'success' : 'info'} 
          sx={{ mb: 2 }}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            fullWidth
            label="Search by title, author, ISBN, or call number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Paper>

      {searchResults.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Call Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>{material.title}</TableCell>
                  <TableCell>{material.author}</TableCell>
                  <TableCell>{material.type}</TableCell>
                  <TableCell>{material.callNumber}</TableCell>
                  <TableCell>
                    <Chip 
                      label={material.available ? 'Available' : 'Checked Out'} 
                      color={material.available ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    {material.dueDate ? (
                      <Box>
                        {format(new Date(material.dueDate), 'MMM dd, yyyy')}
                        <br />
                        <Typography variant="caption" color="text.secondary">
                          ({getDaysUntilDue(material.dueDate)} days)
                        </Typography>
                      </Box>
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
      )}

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

export default Search;