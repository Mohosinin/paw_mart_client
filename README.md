# 🐾 PawMart - Pet Adoption & Care Platform

<div align="center">

![PawMart Logo](public/pawmart.svg)

**Find Your Perfect Companion | Shop Premium Supplies | Join Our Community**

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=for-the-badge)](https://paw-mart-client-ugad.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 🌐 Live Website

**🔗 [https://paw-mart-client-ugad.vercel.app](https://paw-mart-client-ugad.vercel.app)**

---

## 📖 About PawMart

PawMart is a comprehensive pet adoption and pet care marketplace that connects pet lovers with their perfect companions and provides access to premium pet care products. Built with modern web technologies, PawMart offers a seamless experience for both pet adopters, sellers, and administrators.

---

## ✨ Key Features

### � Pet Adoption System
- Browse and adopt pets from verified local owners
- Detailed listings with images, descriptions, location, and availability
- Free adoption for pets, with supplies available for purchase

### 🔐 Secure Authentication
- Firebase-powered authentication
- Email/Password and Google Sign-In options
- Password validation with real-time feedback
- **Demo Account**: `demo@pawmart.com` / `Demo@123`

### 👨‍💼 Role-Based Access Control
| Role | Capabilities |
|------|-------------|
| **User** | Browse, order, manage personal listings |
| **Seller** | All user features + create/manage listings |
| **Admin** | Full access + manage users, view all orders, admin dashboard |

### 📝 Listing Management
- Create, update, and delete pet/product listings
- Rich details: category, price, location, images
- Auto-sorted display (newest first)

### 🛒 Smart Order System
- Place orders with delivery details
- Track order status (Pending → Processing → Completed)
- Download order reports as PDF

### 🎨 Premium UI/UX
- **Modern Design**: Blue gradient color scheme
- **Glassmorphism Effects**: Beautiful card designs
- **Smooth Animations**: Powered by Framer Motion
- **Auto-Carousel**: Hero banner with stunning pet images
- **Typewriter Effect**: Dynamic text animations
- **Dark/Light Theme**: Toggle between themes
- **Fully Responsive**: Mobile-first design

---

## 🛠️ Technology Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19, Vite 7 |
| **Routing** | React Router 7 |
| **Styling** | TailwindCSS 4, DaisyUI |
| **Animations** | Framer Motion |
| **Forms** | React Hook Form |
| **HTTP Client** | Axios |
| **Authentication** | Firebase Auth |
| **Notifications** | React Hot Toast, SweetAlert2 |
| **PDF Export** | jsPDF |
| **Icons** | React Icons |

---

## 📄 Pages Overview

| Page | Access | Description |
|------|--------|-------------|
| **Home** | Public | Hero, categories, featured listings, testimonials |
| **About** | Public | Company story, team, statistics, values |
| **Pets & Supplies** | Public | Browse all listings with search & filter |
| **Category View** | Public | Filter by specific category |
| **Listing Details** | Public | Full details with order modal |
| **Login/Register** | Public | Authentication pages |
| **Dashboard** | Private | User dashboard with stats |
| **My Listings** | Private | Manage personal listings |
| **Add Listing** | Seller+ | Create new listings |
| **My Orders** | Private | View and download orders |
| **Manage Users** | Admin | User management panel |
| **All Orders** | Admin | View all platform orders |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18+
- npm or yarn
- Firebase account

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/paw_mart_client.git
cd paw_mart_client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Firebase Configuration
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

# Backend API URL
VITE_API_URL=https://your-server-url.vercel.app
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

---

## 📂 Project Structure

```
client/
├── public/
│   └── pawmart.svg          # Favicon
├── src/
│   ├── components/          # Reusable components
│   │   └── ui/              # UI components (Spinner, Skeleton, etc.)
│   ├── firebase/            # Firebase configuration
│   ├── layouts/             # Layout components
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── Dashboard/
│   ├── providers/           # Context providers
│   ├── routes/              # Route configurations
│   └── main.jsx             # Entry point
├── index.html
├── vercel.json              # Vercel configuration
└── package.json
```

---

## 🎯 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **User** | demo@pawmart.com | Demo@123 |
| **Admin** | admin@admin.com | (Contact admin) |

---

## 📞 Contact & Support

For any queries or support, please visit our [About page](https://paw-mart-client-ugad.vercel.app/about) or reach out through the contact form.

---

## 📜 License

This project is developed as part of a web development assignment.

---

<div align="center">

**Developed with ❤️ for pet lovers everywhere**

🐕 🐈 🐦 🐰 🐹

</div>
