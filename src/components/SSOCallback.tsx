import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

export const SSOCallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-white">Completing sign in...</p>
      </motion.div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
};