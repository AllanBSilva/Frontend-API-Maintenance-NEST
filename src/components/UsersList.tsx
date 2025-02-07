import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definindo a interface do usuário
interface User {
  id: string;
  username: string;
  email: string;
  role: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

// Tipando a prop `children` do UserProvider
interface UserProviderProps {
  children: ReactNode;  // Aqui, `children` pode ser qualquer tipo de componente React
}

// Criando o contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Exportando o UserProvider para ser usado na aplicação
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Exportando o hook para acessar o contexto de usuário
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
