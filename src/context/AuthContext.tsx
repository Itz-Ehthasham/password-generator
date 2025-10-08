import { createContext, useContext, ReactNode } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

interface AuthContextType {
  user: any;
  isLoaded: boolean;
  isSignedIn: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();
  const { isSignedIn, signOut } = useAuth();

  return (
    <AuthContext.Provider value={{ user, isLoaded, isSignedIn: !!isSignedIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};