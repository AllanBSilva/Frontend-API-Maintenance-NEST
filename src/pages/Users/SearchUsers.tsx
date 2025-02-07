import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: number;
}

const SearchUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('Token de autenticação não encontrado.');
        setLoading(false);
        return;
      }

      const params: { [key: string]: string } = {};
      if (username) params.username = username;
      if (email) params.email = email;
      if (role) params.role = role;

      const response = await axios.get('http://localhost:3000/users', {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err: any) {
      setError('Erro ao buscar usuários');
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <h3 style={styles.h3}>Buscar Usuários</h3>
      <form onSubmit={handleSearchSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome:</label>
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="text"
            placeholder="Pesquisar por e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tipo de Usuário:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="">Selecione o tipo de usuário</option>
            <option value="1">Admin</option>
            <option value="0">Normal</option>
          </select>
          </div>
        <button type="submit" style={styles.button}>Buscar</button>
      </form>

      <h3 style={styles.h3}>Usuários Encontrados</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID do Usuário</th>
            <th style={styles.tableHeader}>Nome</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Tipo do Usuário</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={styles.tableCell}>{user.id}</td>
              <td style={styles.tableCell}>{user.username}</td>
              <td style={styles.tableCell}>{user.email}</td>
              <td style={styles.tableCell}>
                {user.role === 1 ? 'Admin' : 'Normal'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  h3: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as 'center',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
  },
  tableHeader: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center' as 'center',
    fontWeight: 'bolder',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center' as 'center',
    fontSize: 'smaller',
  },
  form: {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    //alignItems: 'center' as 'center',
  },
  formGroup: {
    marginBottom: '10px',
    width: '100%',
    maxWidth: '400px', // Tamanho máximo do form
  },
  label: {
    //display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '5px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '50%',
    height: '20%',
    boxSizing: 'border-box' as 'border-box',
    marginLeft: '5px',
  },
  button: {
    padding: '10px 12px',
    backgroundColor: 'rgba(85, 85, 83, 0.92)' as 'rgba(85, 85, 83, 0.92)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '20%',
    maxWidth: '200px',
    marginTop: '10px',
  },
};


export default SearchUsers;
