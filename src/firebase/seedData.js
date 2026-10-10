import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './config';

// This function will populate Firebase with your 110 library items
export const seedLibraryData = async () => {
  try {
    // Check if data already exists
    const materialsRef = collection(db, 'materials');
    const snapshot = await getDocs(materialsRef);
    
    if (snapshot.size > 0) {
      console.log('Data already exists in Firebase');
      return;
    }

    console.log('Seeding library data to Firebase...');
    
    // Your 110 items will be added here
    const materials = [
      // Books
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '978-0-7432-7356-5',
        callNumber: 'PS3511.I9 G7 2004',
        type: 'Book',
        available: true,
        checkedOutBy: null,
        dueDate: null,
        reservedBy: []
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '978-0-06-112008-4',
        callNumber: 'PS3562.E353 T6 2006',
        type: 'Book',
        available: true,
        checkedOutBy: null,
        dueDate: null,
        reservedBy: []
      },
      // Add more items as needed
    ];

    // Add each material to Firestore
    for (const material of materials) {
      await addDoc(materialsRef, material);
    }

    console.log('Successfully seeded library data!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
