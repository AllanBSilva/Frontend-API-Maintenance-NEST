import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../components/UsersList';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const { setUser } = useUser();

  // Função de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });

      console.log(response.data);
      const { access_token, user } = response.data;
      localStorage.setItem('authToken', access_token);

      setUser(user);
      navigate('/dashboard');

    } catch (err) {
      setError('Usuário ou senha inválidos');
    }
  };

  // Função para capturar a tecla ENTER nos campos de input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin(e as any);  // Chama o login caso a tecla ENTER seja pressionada
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Login</h2>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.field}>
          <img src="/images/user.png" alt="Usuário" style={styles.icon} />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu nome de usuário"
            style={styles.input}
            onKeyPress={handleKeyPress}  // Adiciona o evento para capturar a tecla ENTER
          />
        </div>

        <div style={styles.field}>
          <img src="/images/cadeado.png" alt="Cadeado" style={styles.icon} />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            style={styles.input}
            onKeyPress={handleKeyPress}  // Adiciona o evento para capturar a tecla ENTER
          />
        </div>

        <button onClick={handleLogin} style={styles.button}>
          Entrar
        </button>

        <div style={styles.linkContainer}>
          <a href="/recover-password" style={styles.link}>Esqueceu a senha?</a>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to left,rgb(2, 27, 93),rgb(107, 126, 179))',
  },
  form: {
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.52)',
    width: '300px',
    textAlign: 'center',
  },
  field: {
    marginBottom: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
  },
  input: {
    width: '100%',
    padding: '8px 30px',
    fontSize: '16px',
    marginTop: '5px',
    marginLeft: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    color: '#000', // Texto branco
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#FF4D4D',
    color: '#fff',
    fontSize: '18px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  linkContainer: {
    marginTop: '10px',
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  }
};

export default Login;
