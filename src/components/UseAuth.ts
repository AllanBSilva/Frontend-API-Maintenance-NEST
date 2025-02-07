// src/hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { getToken } from '../utils/auth';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = getToken();
    setToken(savedToken);
  }, []);

  return token;
};
