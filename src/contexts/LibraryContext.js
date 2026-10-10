import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDays, isAfter, differenceInDays } from 'date-fns';

const LibraryContext = createContext();

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

// Sample library materials
const initialMaterials = [
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
    title: 'The Beatles - Abbey Road',
    author: 'The Beatles',
    isbn: null,
    callNumber: 'M1630.18 B4 A2 1969',
    type: 'CD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 4,
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    callNumber: 'PR6029.R8 N49 1983',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0-14-143951-8',
    callNumber: 'PR4034.P7 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 6,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0-316-76948-0',
    callNumber: 'PS3537.A426 C3 2001',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 7,
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    isbn: '978-0-590-35340-3',
    callNumber: 'PZ7.R79835 Har 1998',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 8,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0-547-92822-7',
    callNumber: 'PR6039.O32 H6 2012',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 9,
    title: 'Brave New World',
    author: 'Aldous Huxley',
    isbn: '978-0-06-085052-4',
    callNumber: 'PR6015.U9 B7 2006',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 10,
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    isbn: '978-0-618-64561-1',
    callNumber: 'PR6039.O32 L6 2005',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 11,
    title: 'Moby-Dick',
    author: 'Herman Melville',
    isbn: '978-0-14-243724-7',
    callNumber: 'PS2384.M62 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 12,
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
    isbn: '978-0-06-023481-4',
    callNumber: 'PZ7.L58474 Chr 2001',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 13,
    title: 'Inception',
    author: 'Christopher Nolan',
    isbn: null,
    callNumber: 'PN1997.2.I53 2010',
    type: 'DVD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 14,
    title: 'The Shining',
    author: 'Stephen King',
    isbn: '978-0-307-74365-9',
    callNumber: 'PS3561.I483 S5 2013',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 15,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    isbn: '978-1-451-67331-9',
    callNumber: 'PS3503.R167 F3 2012',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 16,
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    isbn: '978-0-439-02348-1',
    callNumber: 'PZ7.C6837 Hu 2008',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 17,
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    isbn: '978-0-307-47492-1',
    callNumber: 'PS3552.R685434 D3 2009',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 18,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '978-0-06-112241-5',
    callNumber: 'PQ9698.13.O3546 A4513 2006',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 19,
    title: 'Animal Farm',
    author: 'George Orwell',
    isbn: '978-0-452-28424-1',
    callNumber: 'PR6029.R8 A63 1996',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 20,
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    isbn: '978-1-594-48000-3',
    callNumber: 'PS3608.O832 K58 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 21,
    title: 'Life of Pi',
    author: 'Yann Martel',
    isbn: '978-0-15-602732-8',
    callNumber: 'PR9199.3.M3795 L54 2001',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 22,
    title: 'The Book Thief',
    author: 'Markus Zusak',
    isbn: '978-0-375-84220-7',
    callNumber: 'PZ7.Z837 Bo 2006',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 23,
    title: 'Slaughterhouse-Five',
    author: 'Kurt Vonnegut',
    isbn: '978-0-385-33384-9',
    callNumber: 'PS3572.O5 S5 1999',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 24,
    title: 'The Road',
    author: 'Cormac McCarthy',
    isbn: '978-0-307-38789-9',
    callNumber: 'PS3563.C337 R63 2006',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 25,
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '978-0-441-17271-9',
    callNumber: 'PS3558.E63 D8 2005',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 26,
    title: 'The Handmaid\'s Tale',
    author: 'Margaret Atwood',
    isbn: '978-0-385-49081-8',
    callNumber: 'PR9199.3.A8 H36 1998',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 27,
    title: 'Catch-22',
    author: 'Joseph Heller',
    isbn: '978-1-451-62646-8',
    callNumber: 'PS3558.E476 C3 2011',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 28,
    title: 'The Grapes of Wrath',
    author: 'John Steinbeck',
    isbn: '978-0-14-303943-3',
    callNumber: 'PS3537.T3234 G8 2006',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 29,
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    isbn: '978-0-14-143955-6',
    callNumber: 'PR4172.W73 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 30,
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    isbn: '978-0-14-144114-6',
    callNumber: 'PR4167.J3 2006',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 31,
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    isbn: '978-0-14-143957-0',
    callNumber: 'PR5819.A2 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 32,
    title: 'Frankenstein',
    author: 'Mary Shelley',
    isbn: '978-0-14-143947-1',
    callNumber: 'PR5397.F7 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 33,
    title: 'Dracula',
    author: 'Bram Stoker',
    isbn: '978-0-14-143984-6',
    callNumber: 'PR6037.T617 D7 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 34,
    title: 'The Odyssey',
    author: 'Homer',
    isbn: '978-0-14-026886-7',
    callNumber: 'PA4025.A5 F3 1996',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 35,
    title: 'The Iliad',
    author: 'Homer',
    isbn: '978-0-14-027536-0',
    callNumber: 'PA4025.A5 F32 1998',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 36,
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    isbn: '978-0-14-310483-8',
    callNumber: 'PG3326.P7 2002',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 37,
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    isbn: '978-0-14-303999-0',
    callNumber: 'PG3366.V6 2007',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 38,
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
    isbn: '978-0-14-303500-8',
    callNumber: 'PG3366.A6 2004',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 39,
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
    isbn: '978-0-374-52797-9',
    callNumber: 'PG3326.B7 1990',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 40,
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
    isbn: '978-0-06-088328-7',
    callNumber: 'PQ8180.17.A73 C513 2006',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 41,
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
    isbn: '978-0-14-044926-6',
    callNumber: 'PQ2227.C7 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 42,
    title: 'Les Misérables',
    author: 'Victor Hugo',
    isbn: '978-0-14-044430-8',
    callNumber: 'PQ2286.A4 2008',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 43,
    title: 'The Three Musketeers',
    author: 'Alexandre Dumas',
    isbn: '978-0-14-044925-9',
    callNumber: 'PQ2227.T7 2006',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 44,
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    isbn: '978-0-06-093434-4',
    callNumber: 'PQ6329.A2 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 45,
    title: 'The Divine Comedy',
    author: 'Dante Alighieri',
    isbn: '978-0-14-044844-3',
    callNumber: 'PQ4315.2 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 46,
    title: 'Beloved',
    author: 'Toni Morrison',
    isbn: '978-1-400-03341-6',
    callNumber: 'PS3563.O8749 B4 2004',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 47,
    title: 'The Color Purple',
    author: 'Alice Walker',
    isbn: '978-0-15-602835-6',
    callNumber: 'PS3573.A425 C6 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 48,
    title: 'Invisible Man',
    author: 'Ralph Ellison',
    isbn: '978-0-679-73276-1',
    callNumber: 'PS3555.L625 I5 1995',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 49,
    title: 'The Sound and the Fury',
    author: 'William Faulkner',
    isbn: '978-0-679-73224-2',
    callNumber: 'PS3511.A86 S6 1990',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 50,
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    isbn: '978-0-14-143960-0',
    callNumber: 'PR4571.A1 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 51,
    title: 'Great Expectations',
    author: 'Charles Dickens',
    isbn: '978-0-14-143956-3',
    callNumber: 'PR4560.A1 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 52,
    title: 'Oliver Twist',
    author: 'Charles Dickens',
    isbn: '978-0-14-143974-7',
    callNumber: 'PR4567.A1 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 53,
    title: 'The Scarlet Letter',
    author: 'Nathaniel Hawthorne',
    isbn: '978-0-14-243726-1',
    callNumber: 'PS1868.A1 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 54,
    title: 'The Adventures of Huckleberry Finn',
    author: 'Mark Twain',
    isbn: '978-0-14-243717-9',
    callNumber: 'PS1305.A1 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 55,
    title: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    isbn: '978-0-14-303956-3',
    callNumber: 'PS1306.A1 2006',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 56,
    title: 'Heart of Darkness',
    author: 'Joseph Conrad',
    isbn: '978-0-14-144163-4',
    callNumber: 'PR6005.O4 H4 2007',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 57,
    title: 'Lord of the Flies',
    author: 'William Golding',
    isbn: '978-0-399-50148-7',
    callNumber: 'PR6013.O35 L6 2003',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 58,
    title: 'Of Mice and Men',
    author: 'John Steinbeck',
    isbn: '978-0-14-017739-8',
    callNumber: 'PS3537.T3234 O4 1993',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 59,
    title: 'The Old Man and the Sea',
    author: 'Ernest Hemingway',
    isbn: '978-0-684-80122-3',
    callNumber: 'PS3515.E37 O4 1995',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 60,
    title: 'A Farewell to Arms',
    author: 'Ernest Hemingway',
    isbn: '978-0-684-80146-9',
    callNumber: 'PS3515.E37 F3 1997',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 61,
    title: 'For Whom the Bell Tolls',
    author: 'Ernest Hemingway',
    isbn: '978-0-684-80335-7',
    callNumber: 'PS3515.E37 F6 1995',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 62,
    title: 'The Sun Also Rises',
    author: 'Ernest Hemingway',
    isbn: '978-0-7432-9733-2',
    callNumber: 'PS3515.E37 S8 2006',
    type: 'Book',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 63,
    title: 'The Matrix',
    author: 'The Wachowskis',
    isbn: null,
    callNumber: 'PN1997.M3795 1999',
    type: 'DVD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 64,
    title: 'Pink Floyd - The Dark Side of the Moon',
    author: 'Pink Floyd',
    isbn: null,
    callNumber: 'M1630.18 P56 D3 1973',
    type: 'CD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 65,
    title: 'Led Zeppelin IV',
    author: 'Led Zeppelin',
    isbn: null,
    callNumber: 'M1630.18 L43 L4 1971',
    type: 'CD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 66,
    title: 'Thriller',
    author: 'Michael Jackson',
    isbn: null,
    callNumber: 'M1630.18 J32 T5 1982',
    type: 'CD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 67,
    title: 'Rumours',
    author: 'Fleetwood Mac',
    isbn: null,
    callNumber: 'M1630.18 F54 R8 1977',
    type: 'CD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 68,
    title: 'Nevermind',
    author: 'Nirvana',
    isbn: null,
    callNumber: 'M1630.18 N57 N4 1991',
    type: 'CD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 69,
    title: 'The Godfather',
    author: 'Francis Ford Coppola',
    isbn: null,
    callNumber: 'PN1997.G63 1972',
    type: 'DVD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 70,
    title: 'The Shawshank Redemption',
    author: 'Frank Darabont',
    isbn: null,
    callNumber: 'PN1997.S53 1994',
    type: 'Blu-ray',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 71,
    title: 'Pulp Fiction',
    author: 'Quentin Tarantino',
    isbn: null,
    callNumber: 'PN1997.P85 1994',
    type: 'DVD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 72,
    title: 'The Dark Knight',
    author: 'Christopher Nolan',
    isbn: null,
    callNumber: 'PN1997.D37 2008',
    type: 'Blu-ray',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 73,
    title: 'Forrest Gump',
    author: 'Robert Zemeckis',
    isbn: null,
    callNumber: 'PN1997.F67 1994',
    type: 'DVD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 74,
    title: 'Interstellar',
    author: 'Christopher Nolan',
    isbn: null,
    callNumber: 'PN1997.I58 2014',
    type: 'Blu-ray',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 75,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    author: 'Peter Jackson',
    isbn: null,
    callNumber: 'PN1997.L67 2001',
    type: 'Blu-ray',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 76,
    title: 'Star Wars: A New Hope',
    author: 'George Lucas',
    isbn: null,
    callNumber: 'PN1997.S73 1977',
    type: 'Blu-ray',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 77,
    title: 'Jurassic Park',
    author: 'Steven Spielberg',
    isbn: null,
    callNumber: 'PN1997.J87 1993',
    type: 'DVD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 78,
    title: 'Back to the Future',
    author: 'Robert Zemeckis',
    isbn: null,
    callNumber: 'PN1997.B33 1985',
    type: 'DVD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 79,
    title: 'The Beatles - Sgt. Pepper\'s Lonely Hearts Club Band',
    author: 'The Beatles',
    isbn: null,
    callNumber: 'M1630.18 B4 S4 1967',
    type: 'CD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 80,
    title: 'Queen - A Night at the Opera',
    author: 'Queen',
    isbn: null,
    callNumber: 'M1630.18 Q4 N5 1975',
    type: 'CD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 81,
    title: 'The Avengers',
    author: 'Joss Whedon',
    isbn: null,
    callNumber: 'PN1997.A94 2012',
    type: 'Blu-ray',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 82,
    title: 'Gladiator',
    author: 'Ridley Scott',
    isbn: null,
    callNumber: 'PN1997.G53 2000',
    type: 'DVD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 83,
    title: 'Titanic',
    author: 'James Cameron',
    isbn: null,
    callNumber: 'PN1997.T58 1997',
    type: 'DVD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 84,
    title: 'The Lion King',
    author: 'Roger Allers & Rob Minkoff',
    isbn: null,
    callNumber: 'PN1997.L56 1994',
    type: 'DVD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 85,
    title: 'Bohemian Rhapsody Soundtrack',
    author: 'Queen',
    isbn: null,
    callNumber: 'M1630.18 Q4 B6 2018',
    type: 'CD',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 86,
    title: 'The Wizard of Oz',
    author: 'Victor Fleming',
    isbn: null,
    callNumber: 'PN1997.W59 1939',
    type: 'VHS',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 87,
    title: 'Casablanca',
    author: 'Michael Curtiz',
    isbn: null,
    callNumber: 'PN1997.C37 1942',
    type: 'VHS',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 88,
    title: 'Gone with the Wind',
    author: 'Victor Fleming',
    isbn: null,
    callNumber: 'PN1997.G66 1939',
    type: 'VHS',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 89,
    title: 'E.T. the Extra-Terrestrial',
    author: 'Steven Spielberg',
    isbn: null,
    callNumber: 'PN1997.E8 1982',
    type: 'VHS',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 90,
    title: 'The Sound of Music',
    author: 'Robert Wise',
    isbn: null,
    callNumber: 'PN1997.S68 1965',
    type: 'VHS',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 91,
    title: 'Star Wars: The Empire Strikes Back',
    author: 'Irvin Kershner',
    isbn: null,
    callNumber: 'PN1997.S732 1980',
    type: 'VHS',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 92,
    title: 'Indiana Jones and the Raiders of the Lost Ark',
    author: 'Steven Spielberg',
    isbn: null,
    callNumber: 'PN1997.I53 1981',
    type: 'VHS',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 93,
    title: 'Jaws',
    author: 'Steven Spielberg',
    isbn: null,
    callNumber: 'PN1997.J39 1975',
    type: 'VHS',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 94,
    title: 'The Terminator',
    author: 'James Cameron',
    isbn: null,
    callNumber: 'PN1997.T47 1984',
    type: 'VHS',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 95,
    title: 'Ghostbusters',
    author: 'Ivan Reitman',
    isbn: null,
    callNumber: 'PN1997.G48 1984',
    type: 'VHS',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 96,
    title: 'It\'s Obvious You Won\'t Survive by Your Wits Alone',
    author: 'Scott Adams',
    isbn: '978-0-836-21415-8',
    callNumber: 'PN6728.D49 A33 1995',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 97,
    title: 'Bring Me the Head of Willy the Mailboy!',
    author: 'Scott Adams',
    isbn: '978-0-836-21792-0',
    callNumber: 'PN6728.D49 A34 1995',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 98,
    title: 'Shave the Whales',
    author: 'Scott Adams',
    isbn: '978-0-836-22039-5',
    callNumber: 'PN6728.D49 A35 1994',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 99,
    title: 'Dogbert\'s Clues for the Clueless',
    author: 'Scott Adams',
    isbn: '978-0-836-22223-8',
    callNumber: 'PN6728.D49 A36 1993',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 100,
    title: 'Build a Better Life by Stealing Office Supplies',
    author: 'Scott Adams',
    isbn: '978-0-836-22293-1',
    callNumber: 'PN6728.D49 A37 1991',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 101,
    title: 'Always Postpone Meetings with Time-Wasting Morons',
    author: 'Scott Adams',
    isbn: '978-0-836-22758-5',
    callNumber: 'PN6728.D49 A38 1992',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 102,
    title: 'Still Pumped from Using the Mouse',
    author: 'Scott Adams',
    isbn: '978-0-836-22886-5',
    callNumber: 'PN6728.D49 A39 1996',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 103,
    title: 'Fugitive from the Cubicle Police',
    author: 'Scott Adams',
    isbn: '978-0-836-22119-4',
    callNumber: 'PN6728.D49 A40 1996',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 104,
    title: 'Casual Day Has Gone Too Far',
    author: 'Scott Adams',
    isbn: '978-0-836-22708-0',
    callNumber: 'PN6728.D49 A41 1997',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 105,
    title: 'Journey to Cubeville',
    author: 'Scott Adams',
    isbn: '978-0-836-22745-5',
    callNumber: 'PN6728.D49 A42 1998',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 106,
    title: 'I\'m Not Anti-Business, I\'m Anti-Idiot',
    author: 'Scott Adams',
    isbn: '978-0-836-22863-6',
    callNumber: 'PN6728.D49 A43 1998',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 107,
    title: 'Another Day in Cubicle Paradise',
    author: 'Scott Adams',
    isbn: '978-0-836-22620-5',
    callNumber: 'PN6728.D49 A44 1999',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 108,
    title: 'When Did Ignorance Become a Point of View?',
    author: 'Scott Adams',
    isbn: '978-0-740-70144-4',
    callNumber: 'PN6728.D49 A45 2000',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 109,
    title: 'Excuse Me While I Wag',
    author: 'Scott Adams',
    isbn: '978-0-740-70589-3',
    callNumber: 'PN6728.D49 A46 2001',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  },
  {
    id: 110,
    title: 'Random Acts of Management',
    author: 'Scott Adams',
    isbn: '978-0-740-72090-2',
    callNumber: 'PN6728.D49 A47 2000',
    type: 'Comic',
    available: true,
    checkedOutBy: null,
    dueDate: null,
    reservedBy: []
  }
];

export const LibraryProvider = ({ children }) => {
  const [materials, setMaterials] = useState(() => {
    const stored = localStorage.getItem('libraryMaterials');
    try {
      const parsedData = stored ? JSON.parse(stored) : null;
      // If no stored data or empty array, use initial materials
      return (parsedData && parsedData.length > 0) ? parsedData : initialMaterials;
    } catch (error) {
      console.warn('Error parsing stored materials, using initial data:', error);
      return initialMaterials;
    }
  });

  useEffect(() => {
    localStorage.setItem('libraryMaterials', JSON.stringify(materials));
  }, [materials]);

  const searchMaterials = (query) => {
    if (!query) return materials;

    const searchTerm = query.toLowerCase();
    return materials.filter(material =>
      material.title.toLowerCase().includes(searchTerm) ||
      material.author.toLowerCase().includes(searchTerm) ||
      (material.isbn && material.isbn.includes(searchTerm)) ||
      material.callNumber.toLowerCase().includes(searchTerm)
    );
  };

  const checkOutMaterial = (materialId, userEmail) => {
    setMaterials(prev => prev.map(material =>
      material.id === materialId
        ? {
          ...material,
          available: false,
          checkedOutBy: userEmail,
          dueDate: addDays(new Date(), 21)
        }
        : material
    ));
  };

  const returnMaterial = (materialId) => {
    const material = materials.find(m => m.id === materialId);
    if (!material) return null;

    const isLate = material.dueDate && isAfter(new Date(), material.dueDate);
    const lateFee = isLate ? differenceInDays(new Date(), material.dueDate) * 0.5 : 0;

    setMaterials(prev => prev.map(m =>
      m.id === materialId
        ? {
          ...m,
          available: true,
          checkedOutBy: null,
          dueDate: null,
          reservedBy: []
        }
        : m
    ));

    return { isLate, lateFee };
  };

  const renewMaterial = (materialId) => {
    setMaterials(prev => prev.map(material =>
      material.id === materialId && material.reservedBy.length === 0
        ? {
          ...material,
          dueDate: addDays(new Date(), 21)
        }
        : material
    ));
  };

  const reserveMaterial = (materialId, userEmail) => {
    setMaterials(prev => prev.map(material =>
      material.id === materialId
        ? {
          ...material,
          reservedBy: [...material.reservedBy, userEmail]
        }
        : material
    ));
  };

  const cancelReservation = (materialId, userEmail) => {
    setMaterials(prev => prev.map(material =>
      material.id === materialId
        ? {
          ...material,
          reservedBy: material.reservedBy.filter(email => email !== userEmail)
        }
        : material
    ));
  };

  const addMaterial = (materialData) => {
    const newMaterial = {
      ...materialData,
      id: Date.now(),
      available: true,
      checkedOutBy: null,
      dueDate: null,
      reservedBy: []
    };
    setMaterials(prev => [...prev, newMaterial]);
  };

  const updateMaterial = (materialId, updates) => {
    setMaterials(prev => prev.map(material =>
      material.id === materialId ? { ...material, ...updates } : material
    ));
  };

  const deleteMaterial = (materialId) => {
    setMaterials(prev => prev.filter(material => {
      // Remove the material only if it's the one we want to delete AND it's available
      if (material.id === materialId && material.available) {
        return false; // Remove this material
      }
      return true; // Keep all other materials
    }));
  };

  const resetLibrary = () => {
    localStorage.removeItem('libraryMaterials');
    localStorage.removeItem('user');
    localStorage.removeItem('registeredUsers');
    setMaterials([...initialMaterials]); // Create a new array to force re-render
  };

  const forceInitialMaterials = () => {
    setMaterials([...initialMaterials]);
  };

  const value = {
    materials,
    searchMaterials,
    checkOutMaterial,
    returnMaterial,
    renewMaterial,
    reserveMaterial,
    cancelReservation,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    resetLibrary,
    forceInitialMaterials
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};