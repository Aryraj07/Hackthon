async (params:type) => {
  import { createContext, useContext } from 'react';
  
  interface AuthContextType {
    isAuthenticated: boolean;
    userEmail: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
  }
  
  export const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }
}