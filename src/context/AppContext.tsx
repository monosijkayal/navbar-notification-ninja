import React, { createContext, useState } from 'react';

interface User {
  name: string;
  email: string;
  image: string;
}

interface AppContextType {
  user: User | null;
  setShowLogin: (show: boolean) => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextType>({
  user: null,
  setShowLogin: () => {},
  logout: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setShowLogin,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};