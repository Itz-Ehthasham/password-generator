# Password Generator Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Clerk account for authentication

## Installation

1. **Install frontend dependencies:**
```bash
npm install
```

2. **Install backend dependencies:**
```bash
cd server
npm install
cd ..
```

## Environment Setup

Your `.env.local` file should contain:
```
mongoURI=mongodb+srv://ehthasham678:irshaan@cluster0.b6mwuko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
VITE_CLERK_PUBLISHABLE_KEY=pk_test_cnVsaW5nLWJ1Y2stMzYuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_qJvLjrbTv7mCx0hLZv62HSrQyc7Bztm5ElIRPnZU7s
```

## Running the Application

1. **Start the backend server:**
```bash
cd server
npm start
```

2. **Start the frontend (in a new terminal):**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`
The backend API will be running on `http://localhost:5000`

## Features

- ✅ Modern glassmorphism UI with Tailwind CSS
- ✅ Framer Motion animations
- ✅ Custom Clerk authentication (Sign In/Sign Up)
- ✅ Password generation with customizable options
- ✅ MongoDB integration for password history
- ✅ Responsive design for all screen sizes
- ✅ Copy to clipboard functionality
- ✅ Password history management (view/delete)

## Project Structure

```
src/
├── components/
│   ├── PasswordGenerator.tsx
│   ├── SignIn.tsx
│   └── SignUp.tsx
├── pages/
│   └── AuthPage.tsx
├── context/
│   └── AuthContext.tsx
├── utils/
│   ├── api.ts
│   └── passwordGenerator.ts
├── styles/
│   └── slider.css
└── App.tsx

server/
├── index.js
└── package.json
```