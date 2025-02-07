import axios from 'axios';

// Função para fazer login e retornar o token
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username,
      password,
    });

    // Verificando se a resposta contém o token e armazenando no localStorage
    if (response.data && response.data.access_token) {
      localStorage.setItem('authToken', response.data.access_token); // Armazenando o token
      return response.data.access_token;
    }
    throw new Error('Token não encontrado');
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Falha ao autenticar');
  }
};

// Função para pegar o token armazenado
export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Função para deslogar (remover o token)
export const logout = (): void => {
  localStorage.removeItem('authToken');
};
