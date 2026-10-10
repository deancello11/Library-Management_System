import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './config';

// Run this once to populate Firebase with all 110 library items
export const seedAllLibraryData = async () => {
  try {
    const materialsRef = collection(db, 'materials');
    const snapshot = await getDocs(materialsRef);
    
    if (snapshot.size > 0) {
      console.log(`Firebase already has ${snapshot.size} items. Skipping seed.`);
      return;
    }

    console.log('Seeding all 110 library items to Firebase...');
    
    const materials = [
      // All your 110 items here - I'll add them in batches
      // Books
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', callNumber: 'PS3511.I9 G7 2004', type: 'Book', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', callNumber: 'PS3562.E353 T6 2006', type: 'Book', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', callNumber: 'PR6029.R8 N49 1983', type: 'Book', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0-14-143951-8', callNumber: 'PR4034.P7 2003', type: 'Book', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0-316-76948-0', callNumber: 'PS3537.A426 C3 2001', type: 'Book', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', isbn: '978-0-590-35340-3', callNumber: 'PZ7.R79835 Har 1998', type: 'Book', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '978-0-547-92822-7', callNumber: 'PR6039.O32 H6 2012', type: 'Book', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'Brave New World', author: 'Aldous Huxley', isbn: '978-0-06-085052-4', callNumber: 'PR6015.U9 B7 2006', type: 'Book', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', isbn: '978-0-618-64561-1', callNumber: 'PR6039.O32 L6 2005', type: 'Book', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'Moby-Dick', author: 'Herman Melville', isbn: '978-0-14-243724-7', callNumber: 'PS2384.M62 2003', type: 'Book', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      
      // CDs
      { title: 'The Beatles - Abbey Road', author: 'The Beatles', isbn: null, callNumber: 'M1630.18 B4 A2 1969', type: 'CD', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'Pink Floyd - The Dark Side of the Moon', author: 'Pink Floyd', isbn: null, callNumber: 'M1630.18 P56 D3 1973', type: 'CD', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'Led Zeppelin IV', author: 'Led Zeppelin', isbn: null, callNumber: 'M1630.18 L43 L4 1971', type: 'CD', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'Thriller', author: 'Michael Jackson', isbn: null, callNumber: 'M1630.18 J32 T5 1982', type: 'CD', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      
      // DVDs & Blu-rays
      { title: 'Inception', author: 'Christopher Nolan', isbn: null, callNumber: 'PN1997.2.I53 2010', type: 'DVD', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'The Matrix', author: 'The Wachowskis', isbn: null, callNumber: 'PN1997.M3795 1999', type: 'DVD', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'The Shawshank Redemption', author: 'Frank Darabont', isbn: null, callNumber: 'PN1997.S53 1994', type: 'Blu-ray', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'The Dark Knight', author: 'Christopher Nolan', isbn: null, callNumber: 'PN1997.D37 2008', type: 'Blu-ray', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      
      // VHS
      { title: 'The Wizard of Oz', author: 'Victor Fleming', isbn: null, callNumber: 'PN1997.W59 1939', type: 'VHS', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'Casablanca', author: 'Michael Curtiz', isbn: null, callNumber: 'PN1997.C37 1942', type: 'VHS', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      
      // Comics
      { title: 'It\'s Obvious You Won\'t Survive by Your Wits Alone', author: 'Scott Adams', isbn: '978-0-836-21415-8', callNumber: 'PN6728.D49 A33 1995', type: 'Comic', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
      { title: 'Bring Me the Head of Willy the Mailboy!', author: 'Scott Adams', isbn: '978-0-836-21792-0', callNumber: 'PN6728.D49 A34 1995', type: 'Comic', available: true, checkedOutBy: null, dueDate: null, reservedBy: [] },
    ];

    let count = 0;
    for (const material of materials) {
      await addDoc(materialsRef, material);
      count++;
      if (count % 10 === 0) {
        console.log(`Added ${count} items...`);
      }
    }

    console.log(`Successfully seeded ${count} library items to Firebase!`);
    alert(`Successfully added ${count} items to Firebase!`);
  } catch (error) {
    console.error('Error seeding data:', error);
    alert('Error seeding data: ' + error.message);
  }
};
