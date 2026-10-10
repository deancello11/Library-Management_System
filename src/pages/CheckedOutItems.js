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
  Button,
  Alert,
  Chip
} from '@mui/material';
import { format, differenceInDays } from 'date-fns';
import { useAuth } from '../contexts/AuthContextFirebase';
import { useLibrary } from '../contexts/LibraryContextFirebase';

const CheckedOutItems = () => {
  const { user } = useAuth();
  const { materials, renewMaterial, cancelReservation, returnMaterial } = useLibrary();
  const [message, setMessage] = useState('');

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h5">Please login to view your items</Typography>
      </Box>
    );
  }

  const checkedOutItems = materials.filter(material => material.checkedOutBy === user.email);
  const reservedItems = materials.filter(material => material.reservedBy.includes(user.email));

  const handleRenew = (materialId) => {
    const material = materials.find(m => m.id === materialId);
    const daysUntilDue = differenceInDays(new Date(material.dueDate), new Date());
    
    if (daysUntilDue > 5) {
      setMessage('Items can only be renewed within 5 days of due date');
      return;
    }
    
    if (material.reservedBy.length > 0) {
      setMessage('Cannot renew - item has reservations');
      return;
    }
    
    renewMaterial(materialId);
    setMessage('Item renewed successfully!');
  };

  const handleCancelReservation = (materialId) => {
    cancelReservation(materialId, user.email);
    setMessage('Reservation cancelled successfully!');
  };

  const handleReturn = (materialId) => {
    const result = returnMaterial(materialId);
    if (result) {
      if (result.isLate) {
        setMessage(`Item returned. Late fee: $${result.lateFee.toFixed(2)}`);
      } else {
        setMessage('Item returned successfully!');
      }
    }
  };

  const getDaysUntilDue = (dueDate) => {
    return differenceInDays(new Date(dueDate), new Date());
  };

  const isRenewable = (material) => {
    const daysUntilDue = getDaysUntilDue(material.dueDate);
    return daysUntilDue <= 5 && material.reservedBy.length === 0;
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Library Items
      </Typography>
      
      {message && (
        <Alert 
          severity={message.includes('successfully') ? 'success' : 'warning'} 
          sx={{ mb: 2 }}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      )}
      
      {/* Checked Out Items */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Checked Out Items ({checkedOutItems.length}/{user.maxItems})
        </Typography>
        
        {checkedOutItems.length === 0 ? (
          <Typography color="text.secondary">No items currently checked out</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkedOutItems.map((material) => {
                  const daysUntilDue = getDaysUntilDue(material.dueDate);
                  const isOverdue = daysUntilDue < 0;
                  
                  return (
                    <TableRow key={material.id}>
                      <TableCell>{material.title}</TableCell>
                      <TableCell>{material.author}</TableCell>
                      <TableCell>
                        {format(new Date(material.dueDate), 'MMM dd, yyyy')}
                        <br />
                        <Typography 
                          variant="caption" 
                          color={isOverdue ? 'error' : daysUntilDue <= 3 ? 'warning.main' : 'text.secondary'}
                        >
                          {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days remaining`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {isOverdue ? (
                          <Chip label="Overdue" color="error" size="small" />
                        ) : daysUntilDue <= 3 ? (
                          <Chip label="Due Soon" color="warning" size="small" />
                        ) : (
                          <Chip label="On Time" color="success" size="small" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleRenew(material.id)}
                            disabled={!isRenewable(material)}
                          >
                            {isRenewable(material) ? 'Renew' : 'Cannot Renew'}
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() => handleReturn(material.id)}
                          >
                            Return
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      
      {/* Reserved Items */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Reserved Items ({reservedItems.length})
        </Typography>
        
        {reservedItems.length === 0 ? (
          <Typography color="text.secondary">No items currently reserved</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Current Due Date</TableCell>
                  <TableCell>Queue Position</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservedItems.map((material) => {
                  const queuePosition = material.reservedBy.indexOf(user.email) + 1;
                  
                  return (
                    <TableRow key={material.id}>
                      <TableCell>{material.title}</TableCell>
                      <TableCell>{material.author}</TableCell>
                      <TableCell>
                        {material.dueDate ? format(new Date(material.dueDate), 'MMM dd, yyyy') : 'N/A'}
                      </TableCell>
                      <TableCell>#{queuePosition}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleCancelReservation(material.id)}
                        >
                          Cancel Reservation
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default CheckedOutItems;