import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

const handleRecoverPassword = async (): Promise<void> => {
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    alert('Por favor, insira um e-mail válido!');
    return;
  }
  
  try {
    const response = await fetch('http://localhost:3000/users/recover-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (response.ok) {
      alert('E-mail de recuperação enviado!');
    } else {
      alert('Ocorreu um erro. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao enviar e-mail de recuperação:', error);
    alert('Erro ao enviar e-mail. Tente novamente.');
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Recuperar Senha</h2>
        <div style={styles.field}>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            style={styles.input}
          />
        </div>
        <button onClick={handleRecoverPassword} style={styles.button}>
          Enviar e-mail
        </button>
        <Link to="/login" style={styles.link}>
          Voltar para tela inicial
        </Link>
      </div>
    </div>
  );
};

// Usando React.CSSProperties para garantir a compatibilidade com o tipo esperado
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to left, rgb(2, 27, 93), rgb(107, 126, 179))', // Gradiente azul similar ao Login
  },
  form: {
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fundo semi-transparente
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.14)',
    width: '300px',
    textAlign: 'center',
  },
  field: {
    marginBottom: '15px',
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '8px 30px', // Espaço para o ícone
    fontSize: '16px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    color: '#fff', // Texto branco para os campos de input
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#FF4D4D', // Cor vermelha do botão
    color: '#fff',
    fontSize: '18px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  link: {
    display: 'block',
    marginTop: '10px',
    textDecoration: 'none',
    color: '#fff', // Cor do link igual ao login
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  }
};

export default RecoverPassword;
