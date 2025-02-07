import React, { createContext, useState, useContext, ReactNode } from 'react';

// Tipo do estado do usuário (você pode customizar de acordo com sua necessidade)
interface UserContextType {
  user: any; // ou o tipo correto do seu usuário
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

// Definindo o tipo para as propriedades do `UserProvider`
interface UserProviderProps {
  children: ReactNode;
}

// Contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provedor
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar o contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
