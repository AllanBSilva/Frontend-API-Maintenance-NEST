import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../components/UsersList'; // Importando o hook do contexto de usuário

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

interface EditUserProps {
  closeModal: () => void; // Função para fechar o modal
}

const EditUser: React.FC<EditUserProps> = ({ closeModal }) => {
  const { user, setUser } = useUser();

  const [userData, setUserData] = useState<any>({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 0,
    id: user?.id || '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!user) {
      alert('Você precisa estar logado para acessar esta página.');
      closeModal();
    }
  }, [user, closeModal]);

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData.password && userData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);
      const token = getToken();

      if (!token) {
        setError('Token de autenticação inválido ou expirado.');
        return;
      }

      const updatedUserData: any = {};

      if (userData.username) updatedUserData.username = userData.username;
      if (userData.email) updatedUserData.email = userData.email;
      if (userData.password) updatedUserData.password = userData.password;
      if (userData.role !== undefined) updatedUserData.role = userData.role;

      if (user?.role === 0 && userData.role === 1) {
        setError('Usuários comuns não podem se tornar administradores.');
        return;
      }

      if (user?.role === 0 && user?.id !== userData.id) {
        setError('Você não tem permissão para editar dados de outros usuários.');
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/users/${user?.id}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Usuário atualizado com sucesso!');
        setUser({ ...user, ...updatedUserData });
        closeModal(); // Fecha o modal
      } else {
        setError('Erro inesperado ao atualizar o usuário.');
      }

    } catch (error: any) {
      setError(error?.response?.data?.message || 'Erro ao atualizar usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Editar Usuário</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleEditUser}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome de Usuário: </label>
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email: </label>
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Senha: </label>
          <input
            type="password"
            placeholder="Senha"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tipo de Usuário: </label>
          <select
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: Number(e.target.value) })}
            style={styles.select}
          >
            <option value={0}>Usuário Comum</option>
            <option value={1}>Administrador</option>
          </select>
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Atualizando...' : 'Atualizar'}
        </button>
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
    marginBottom: '1px',
  },
  input: {
    padding: '5px',
    fontSize: '14px',
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
    width: 'auto',
    maxWidth: '200px',
    marginTop: '5px',
  },
};

export default EditUser;
