// Debug utilities for development
// You can run these in the browser console

export const clearAllData = () => {
  localStorage.removeItem('libraryMaterials');
  localStorage.removeItem('user');
  localStorage.removeItem('registeredUsers');
  console.log('All localStorage data cleared. Refresh the page to see initial data.');
};

export const showStoredData = () => {
  console.log('Library Materials:', JSON.parse(localStorage.getItem('libraryMaterials') || '[]'));
  console.log('Current User:', JSON.parse(localStorage.getItem('user') || 'null'));
  console.log('Registered Users:', JSON.parse(localStorage.getItem('registeredUsers') || '[]'));
};

// Make functions available globally for console access
if (typeof window !== 'undefined') {
  window.clearAllData = clearAllData;
  window.showStoredData = showStoredData;
}