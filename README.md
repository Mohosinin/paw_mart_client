# PawMart - Pet Adoption & Care Platform

**Live Site URL:** [PawMart Live](https://your-live-site-url.com)

## About PawMart

PawMart is a comprehensive pet adoption and pet care marketplace that connects pet lovers with their perfect companions and provides access to premium pet care products. Built with modern web technologies, PawMart offers a seamless experience for both pet adopters and sellers.

## Key Features

- 🐾 **Pet Adoption System** - Browse and adopt pets from local owners with detailed listings including images, descriptions, location, and pickup dates. Pets are available for free adoption while supplies can be purchased.

- 🔐 **Secure Authentication** - Firebase-powered authentication with email/password and Google Sign-In options. Includes password validation (minimum 6 characters, uppercase, and lowercase requirements) with real-time feedback.

- 📝 **Listing Management** - Authenticated users can create, update, and delete their own pet and product listings. Each listing includes comprehensive details like category, price, location, and images with auto-sorted display (newest first).

- 🛒 **Smart Order System** - Place orders with detailed information including buyer details, delivery address, phone number, pickup/delivery date, and additional notes. View all your orders in a dedicated dashboard with PDF export functionality.

- 🎨 **Premium UI/UX** - Modern, responsive design with glassmorphism effects, smooth animations using Framer Motion, auto-changing hero banner carousel, and dynamic typewriter effects. Fully mobile-optimized with a Bangladesh-localized interface.

## Technology Stack

### Frontend
- **React 19** - Modern UI library
- **React Router 7** - Client-side routing
- **TailwindCSS 4** - Utility-first styling
- **DaisyUI** - Component library
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **SweetAlert2** - Beautiful alerts
- **jsPDF** - PDF generation

### Backend
- **Node.js & Express** - Server framework
- **MongoDB** - Database
- **Firebase Authentication** - User management

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Firebase account

### Client Setup
```bash
cd client
npm install
npm run dev
```

### Server Setup
```bash
cd server
npm install
nodemon index.js
```

### Environment Variables

Create a `.env` file in the server directory:
```
DB_URI=your_mongodb_connection_string
PORT=5000
```

Create a `.env` file in the client directory with your Firebase config:
```
VITE_API_URL=your_backend_api_url
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Features in Detail

### User Features
- Browse all available pets and supplies with advanced filtering
- Search by name and filter by category
- View detailed information about each listing
- Place orders with comprehensive details
- Download order reports as PDF
- Manage personal listings and orders

### Seller Features
- Add new listings with rich details
- Update existing listings
- Delete listings with confirmation
- View all personal listings in a tabular format
- Track orders placed on their listings

### Design Features
- Auto-changing hero banner with 5 beautiful pet images
- Smooth fade transitions between images
- Glassmorphism effects on cards and modals
- Responsive navigation with mobile menu
- Active link highlighting
- Loading spinners for all async operations
- Toast notifications for all CRUD operations
- Bangladesh-localized placeholders and examples

## Pages

- **Home** - Hero banner, categories, recent listings, testimonials
- **Pets & Supplies** - All listings with search and filter
- **Category Filtered** - Listings filtered by specific category
- **Listing Details** - Full details with order modal
- **Add Listing** - Create new listings (Private)
- **My Listings** - Manage your listings (Private)
- **My Orders** - View and download orders (Private)
- **Login/Register** - Authentication pages
- **404** - Custom error page

## Contact

For any queries or support, please reach out through the contact form on the website.

---

**Developed with ❤️ for pet lovers everywhere**
