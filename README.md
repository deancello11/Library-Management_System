# Library Management System
A React-based library management website that allows users to search, check out, and manage library materials including books, CDs, DVDs, and tapes.

### Project Members:
1. **Christina Lee**
2. **Dean Chaudhry**
3. **Jeremy Lamm**
4. **Sami Chekaba**
5. **Thomas Kiel**

### User Features 
1. **Search & Check Out Materials** - Search by title, author, ISBN, or Library of Congress Call Number
2. **User Account Management** - Create and manage user accounts with driver's license verification
3. **Renew Materials** - Renew checked-out items within 5 days of due date
4. **Reserve Materials** - Reserve items that are currently checked out
5. **View Checked-Out Items** - Track due dates and renewal status

### Admin Features
1. **Manage Library Materials** - Add, modify, and delete materials from the catalog
2. **Process Returns** - Check in returned materials and calculate late fees
3. **User Management** - View and manage user accounts

### System Rules
- Maximum 5 items per user (reduced to 2 after 3+ late returns)
- 21-day checkout period
- $0.50 per day late fee
- Email reminders sent 3 days before due date
- Materials cannot be deleted if currently checked out

## Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser


### Creating Accounts
- **Regular User**: Fill out the registration form with personal information
- **Admin User**: Check "Admin Account" and enter permission code: `ADMIN123`

### Demo Credentials
The system uses localStorage for demo purposes. You can create new accounts or use the admin code `ADMIN123` for admin access.

### Library of Congress Call Numbers
The system supports LC call number searches. For more information about LC call numbers, visit: https://www.usg.edu/galileo/skills/unit03/libraries03_04.phtml

## Technology Stack (What we used to make each part)
- **Frontend**: React 18, Material-UI
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Date Handling**: date-fns
- **Storage**: localStorage (for demo purposes)

## Project Structure (damn this looks cool)
```
src/
├── components/
│   └── Navbar.js          # Navigation component
├── contexts/
│   ├── AuthContext.js     # User authentication context
│   └── LibraryContext.js  # Library materials context
├── pages/
│   ├── Home.js           # Landing page
│   ├── Login.js          # User login
│   ├── Register.js       # User registration
│   ├── Search.js         # Material search and checkout
│   ├── Account.js        # Account management
│   ├── CheckedOutItems.js # User's checked-out items
│   └── AdminPanel.js     # Admin functionality
├── App.js                # Main app component
└── index.js             # App entry point
```

## Future Enhancements (TODO!)
- Database integration (replace localStorage)
- Email notification system
- Barcode scanning support
- Advanced search filters
- User suspension functionality
- Detailed reporting and analytics
- Mobile responsive improvements
