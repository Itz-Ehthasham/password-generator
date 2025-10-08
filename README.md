# 🔐 Random Password Generator & Vault [Active Link](https://password-generator-gamma-blond-24.vercel.app/)

A modern, privacy-first password generator and vault application built with React, TypeScript, and MongoDB. Generate strong passwords and securely store them with client-side encryption.

## 🎯 Goal

Build a small web app where users can:
- **Generate strong passwords** with customizable options
- **Save passwords** to a personal encrypted vault
- **View / edit / delete** saved entries in a clean, intuitive panel
- Keep it **fast, simple, and privacy-first**

## ✨ Features

### 🔑 Password Generator
- **Length slider** (5-50 characters)
- **Character options**: uppercase, lowercase, numbers, symbols
- **Exclude look-alikes** option for better readability
- **Real-time generation** with smooth animations
- **Copy to clipboard** with auto-clear functionality

### 🔐 Secure Vault
- **Personal vault** for each authenticated user
- **Vault items include**:
  - Title
  - Username
  - Password
  - URL
  - Notes
- **Client-side encryption** - server never stores plaintext
- **View, edit, delete** functionality

### 🔒 Authentication
- **Simple email + password** authentication
- **Email verification** with OTP
- **Google OAuth** integration
- **Secure session management** with Clerk

### 🎨 Modern UI/UX
- **Glassmorphism design** with backdrop blur effects
- **Framer Motion animations** for smooth interactions
- **Responsive design** for all screen sizes
- **Dark theme** with purple/blue gradients
- **Guest mode** - try before signing up

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Clerk** for authentication
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **CORS** enabled for cross-origin requests

### Security
- **Client-side encryption** for vault data
- **Environment variables** for sensitive data
- **HTTPS** ready for production

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Clerk account for authentication

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/password-generator.git
cd password-generator
```

2. **Install dependencies**
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

3. **Environment Setup**

Create `.env.local` in the root directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Create `server/.env`:
```env
mongoURI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

4. **Run the application**

```bash
# Start backend server
cd server
npm start

# Start frontend (in new terminal)
npm run dev
```

5. **Visit** `http://localhost:5173`

## 📁 Project Structure

```
password-generator/
├── src/
│   ├── components/          # React components
│   │   ├── PasswordGenerator.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── SSOCallback.tsx
│   ├── pages/              # Page components
│   │   └── AuthPage.tsx
│   ├── context/            # React context
│   │   └── AuthContext.tsx
│   ├── utils/              # Utility functions
│   │   ├── api.ts
│   │   └── passwordGenerator.ts
│   └── styles/             # Custom styles
│       └── slider.css
├── server/                 # Backend API
│   ├── index.js           # Express server
│   └── package.json       # Server dependencies
├── public/                # Static assets
└── dist/                  # Build output
```

## 🔒 Security Features

- **Client-side encryption** ensures server never sees plaintext passwords
- **Environment variables** protect sensitive configuration
- **CORS configuration** prevents unauthorized access
- **Input validation** on both client and server
- **Secure session management** with Clerk

## 🎨 Design Philosophy

- **Privacy-first**: Your data stays encrypted
- **User-friendly**: Clean, intuitive interface
- **Fast**: Optimized for performance
- **Accessible**: Works on all devices and screen sizes
- **Modern**: Latest web technologies and design trends

## 🚀 Deployment

The application is designed for separate frontend and backend deployments:

- **Frontend**: Deploy to Vercel, Netlify, or similar
- **Backend**: Deploy to Railway, Heroku, or similar
- **Database**: MongoDB Atlas (cloud)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Clerk** for authentication services
- **MongoDB** for database hosting
- **Tailwind CSS** for styling framework
- **Framer Motion** for animations
- **Lucide** for beautiful icons
