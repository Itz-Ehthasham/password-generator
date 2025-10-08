import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuthContext } from './context/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { PasswordGenerator } from './components/PasswordGenerator';
import { SSOCallback } from './components/SSOCallback';
import { motion } from 'framer-motion';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log('Environment check:', {
  clerkKey: clerkPubKey ? 'Present' : 'Missing',
  apiUrl: import.meta.env.VITE_API_URL || 'Not set'
});

function AppContent() {
  const { isLoaded, isSignedIn } = useAuthContext();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/sso-callback" element={<SSOCallback />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<PasswordGenerator />} />
    </Routes>
  );
}

function App() {
  if (!clerkPubKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Configuration Error</h1>
          <p>Missing Clerk configuration. Please check environment variables.</p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ClerkProvider>
  );
}

export default App;
