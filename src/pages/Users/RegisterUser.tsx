import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../components/UsersList'; // Importando o hook do contexto de usuário

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

interface RegisterUserProps {
  closeModal: () => void;
}

const RegisterUser: React.FC<RegisterUserProps> = ({ closeModal }) => {
  const { user } = useUser();

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 0, // 0 = Usuário comum, 1 = Admin
  });

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!user) {
      alert('Você precisa estar logado para acessar esta página.');
      closeModal();
    }
  }, [user, closeModal]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user.role !== 1) {
      setError('Você não tem permissão para criar novos usuários.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/create', newUser);
      alert('Usuário criado com sucesso!');

      setNewUser({
        username: '',
        email: '',
        password: '',
        role: 0,
      });

      if (response.status === 201) {
        closeModal();
      }
    } catch (error) {
      alert('Erro ao criar usuário');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cadastrar Novo Usuário</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleCreateUser}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome de Usuário: </label>
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email: </label>
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Senha: </label>
          <input
            type="password"
            placeholder="Senha"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tipo de Usuário: </label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: Number(e.target.value) })}
            style={styles.select}
          >
            <option value={0}>Usuário Comum</option>
            <option value={1}>Administrador</option>
          </select>
        </div>
        <button type="submit" style={styles.button} >Cadastrar</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    margin: '0',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
  },
  formGroup: {
    display: 'flex',
    marginBottom: '5px',
    gap: '10px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '5px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    height: '20%',
    boxSizing: 'border-box',
  },
  select: {
    padding: '6px 10px',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 12px',
    backgroundColor: 'rgba(85, 85, 83, 0.92)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    width: 'auto', // Largura ajustável
    maxWidth: '200px', // Largura máxima ajustada
    marginTop: '5px',
  },
};

export default RegisterUser;


