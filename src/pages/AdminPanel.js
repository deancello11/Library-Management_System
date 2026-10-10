import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContextFirebase';
import { useLibrary } from '../contexts/LibraryContextFirebase';

const AdminPanel = () => {
  const { user } = useAuth();
  const { materials, addMaterial, deleteMaterial, returnMaterial, resetLibrary, forceInitialMaterials } = useLibrary();
  const [activeTab, setActiveTab] = useState(0);
  const [message, setMessage] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    author: '',
    isbn: '',
    callNumber: '',
    type: 'Book'
  });

  if (!user?.isAdmin) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h5">Admin access required</Typography>
      </Box>
    );
  }

  const handleAddMaterial = (e) => {
    e.preventDefault();
    addMaterial(newMaterial);
    setNewMaterial({
      title: '',
      author: '',
      isbn: '',
      callNumber: '',
      type: 'Book'
    });
    setMessage('Material added successfully!');
  };

  const handleReturnMaterial = () => {
    const result = returnMaterial(selectedMaterial.id);
    if (result) {
      const { isLate, lateFee } = result;
      if (isLate) {
        setMessage(`Material returned late. Late fee: $${lateFee.toFixed(2)}`);
      } else {
        setMessage('Material returned successfully!');
      }
    }
    setShowReturnDialog(false);
  };

  const handleDeleteMaterial = (material) => {
    if (!material.available) {
      setMessage('Cannot delete checked-out materials. Please return the item first.');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete "${material.title}" by ${material.author}?`)) {
      deleteMaterial(material.id);
      setMessage('Material deleted successfully!');
    }
  };

  const checkedOutMaterials = materials.filter(m => !m.available);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Panel
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
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Manage Materials" />
          <Tab label="Return Materials" />
          <Tab label="All Materials" />
        </Tabs>
        
        {/* Add/Manage Materials Tab */}
        {activeTab === 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add New Material
            </Typography>
            
            <form onSubmit={handleAddMaterial}>
              <TextField
                fullWidth
                label="Title"
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Author"
                value={newMaterial.author}
                onChange={(e) => setNewMaterial({...newMaterial, author: e.target.value})}
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="ISBN"
                value={newMaterial.isbn}
                onChange={(e) => setNewMaterial({...newMaterial, isbn: e.target.value})}
                margin="normal"
              />
              
              <TextField
                fullWidth
                label="Call Number"
                value={newMaterial.callNumber}
                onChange={(e) => setNewMaterial({...newMaterial, callNumber: e.target.value})}
                margin="normal"
                required
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                  label="Type"
                >
                  <MenuItem value="Book">Book</MenuItem>
                  <MenuItem value="CD">CD</MenuItem>
                  <MenuItem value="DVD">DVD</MenuItem>
                  <MenuItem value="Tape">Tape</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Add Material
              </Button>
            </form>
          </Box>
        )}
        
        {/* Return Materials Tab */}
        {activeTab === 1 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Checked Out Materials
            </Typography>
            
            {checkedOutMaterials.length === 0 ? (
              <Typography color="text.secondary">No materials currently checked out</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Checked Out By</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {checkedOutMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>{material.title}</TableCell>
                        <TableCell>{material.author}</TableCell>
                        <TableCell>{material.checkedOutBy}</TableCell>
                        <TableCell>
                          {format(new Date(material.dueDate), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              setSelectedMaterial(material);
                              setShowReturnDialog(true);
                            }}
                          >
                            Return
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
        
        {/* All Materials Tab */}
        {activeTab === 2 && (
          <Box sx={{ mt: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                All Library Materials ({materials.length})
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => {
                    forceInitialMaterials();
                    setMessage('Loaded initial materials!');
                  }}
                >
                  Load Initial Materials
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => {
                    if (window.confirm('This will reset ALL data (library + users). Are you sure?')) {
                      resetLibrary();
                      setMessage('All data reset to initial state!');
                    }
                  }}
                >
                  Reset All Data
                </Button>
              </Box>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell>{material.title}</TableCell>
                      <TableCell>{material.author}</TableCell>
                      <TableCell>{material.type}</TableCell>
                      <TableCell>
                        {material.available ? 'Available' : 'Checked Out'}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDeleteMaterial(material)}
                          disabled={!material.available}
                          title={!material.available ? 'Cannot delete checked-out materials' : 'Delete this material'}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
      
      {/* Return Material Dialog */}
      <Dialog open={showReturnDialog} onClose={() => setShowReturnDialog(false)}>
        <DialogTitle>Return Material</DialogTitle>
        <DialogContent>
          <Typography>
            Confirm return of "{selectedMaterial?.title}" by {selectedMaterial?.checkedOutBy}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReturnDialog(false)}>Cancel</Button>
          <Button onClick={handleReturnMaterial} variant="contained">
            Confirm Return
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;