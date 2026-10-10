import React from 'react';
import { Paper, Typography, Button, Box, Alert } from '@mui/material';
import { useLibrary } from '../contexts/LibraryContextFirebase';

const DebugPanel = () => {
  const { materials, resetLibrary, forceInitialMaterials } = useLibrary();

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const showStorageInfo = () => {
    const libraryData = localStorage.getItem('libraryMaterials');
    const userData = localStorage.getItem('user');
    const registeredUsers = localStorage.getItem('registeredUsers');
    
    console.log('=== STORAGE DEBUG INFO ===');
    console.log('Library Materials:', libraryData ? JSON.parse(libraryData) : 'null');
    console.log('Current User:', userData ? JSON.parse(userData) : 'null');
    console.log('Registered Users:', registeredUsers ? JSON.parse(registeredUsers) : 'null');
    console.log('Current Materials State:', materials);
    console.log('========================');
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6" gutterBottom color="text.secondary">
        Debug Panel (Development Only)
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Current materials count: {materials.length}
      </Alert>
      
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={forceInitialMaterials}
        >
          Force Load Initial Materials
        </Button>
        
        <Button 
          variant="outlined" 
          size="small" 
          onClick={resetLibrary}
        >
          Reset Library
        </Button>
        
        <Button 
          variant="outlined" 
          size="small" 
          onClick={showStorageInfo}
        >
          Log Storage Info
        </Button>
        
        <Button 
          variant="outlined" 
          size="small" 
          color="error"
          onClick={clearLocalStorage}
        >
          Clear All & Reload
        </Button>
      </Box>
    </Paper>
  );
};

export default DebugPanel;