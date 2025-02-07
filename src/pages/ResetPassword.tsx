import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathParts = location.pathname.split('/');
  const token = pathParts[pathParts.length - 1];

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState<boolean>(false); // Para bloquear o envio após sucesso
  const [redirectTimer, setRedirectTimer] = useState<number>(10); // Contador de segundos para redirecionamento

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem');
      setError(true);
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage('A senha deve ter pelo menos 6 caracteres');
      setError(true);
      return;
    }

    if (!token) {
      setMessage('Token inválido ou não fornecido');
      setError(true);
      return;
    }

    const response = await fetch('http://localhost:3000/users/reset-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "token": token, "newPassword": newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Senha alterada com sucesso');
      setError(false);
      setIsResetSuccessful(true); // Bloqueia o envio após sucesso
      setTimeout(() => {
        // Inicia a contagem regressiva para redirecionamento
        const interval = setInterval(() => {
          setRedirectTimer((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              handleGoToLogin(); // Redireciona quando o contador chegar a 0
            }
            return prev - 1;
          });
        }, 1000);
      }, 1000); // Inicia após 1 segundo para dar tempo de exibir a mensagem
    } else {
      setMessage(data.message || 'Erro ao alterar senha: Token inválido ou expirado');
      setError(true);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Criar Nova Senha</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
          <div style={styles.field}>
            <label htmlFor="newPassword"></label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite sua nova senha"
              style={styles.input}
              disabled={isResetSuccessful} // Desabilita após sucesso
            />
          </div>
          <div style={styles.field}>
            <label htmlFor="confirmPassword"></label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua nova senha"
              style={styles.input}
              disabled={isResetSuccessful} // Desabilita após sucesso
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            disabled={isResetSuccessful} // Desabilita após sucesso
          >
            Reset de Senha
          </button>
        </form>

        {message && (
          <div style={error ? styles.error : { ...styles.error, color: 'green' }}>
            {message}
          </div>
        )}

        {isResetSuccessful && (
          <div style={styles.successMessage}>
            Você será redirecionado para a tela de login em {redirectTimer} segundos...
          </div>
        )}

        <button
          onClick={handleGoToLogin}
          style={{ ...styles.button, backgroundColor: 'transparent', color: '#fff' }}
        >
          Voltar para tela inicial
        </button>
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
  input: {
    width: '100%',
    padding: '8px 30px',
    fontSize: '16px',
    marginTop: '5px',
    marginLeft: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    color: '#000',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#FF4D4D',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  successMessage: {
    color: 'green',
    fontSize: '14px',
    marginTop: '10px',
  },
};

export default ResetPassword;
