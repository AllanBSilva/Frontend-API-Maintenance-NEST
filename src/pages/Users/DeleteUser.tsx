import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from '../../components/UsersList';
import SearchUsers from '../Users/SearchUsers';

interface DeleteUserProps {
  closeModal: () => void;
}

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const DeleteUser: React.FC<DeleteUserProps> = ({ closeModal }) => {
  const { id } = useParams();
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState<string>('');
  const [userIdToDelete, setUserIdToDelete] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { user: loggedUser } = useUser();

  useEffect(() => {
    if (loggedUser) {
      setIsAdmin(loggedUser.role === 1);
    } else {
      setError('Você precisa estar logado para acessar esta página.');
      closeModal();
    }
  }, [loggedUser, closeModal]);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAdmin === false) {
        try {
          const token = getToken();
          if (!token) {
            setError('Token de autenticação inválido ou expirado.');
            closeModal();
            return;
          }
          const response = await axios.get(`http://localhost:3000/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Passando o token no cabeçalho da requisição
            },
          });
          setUser(response.data);
        } catch (error) {
          return;
        }
      }
    };

    if (isAdmin !== null) {
      fetchUser();
    }
  }, [id, isAdmin]);

  const handleDeleteUser = async () => {
    if (loggedUser?.role === 0 && loggedUser?.id !== user.id) {
      setError('Você não tem permissão para excluir este usuário.');
      closeModal();
      return;
    }

    if (loggedUser?.role === 1 && userIdToDelete) {
      try {
        const token = getToken();
        if (!token) {
          setError('Token de autenticação inválido ou expirado.');
          return;
        }

        await axios.delete(`http://localhost:3000/users/${userIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Usuário excluído com sucesso!');
        closeModal();
      } catch (error) {
        alert('Erro ao excluir usuário');
      }
    } else {
      setError('Por favor, forneça um ID de usuário válido para excluir.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Excluir Usuário</h2>
      {error && <div style={styles.error}>{error}</div>}

      {loggedUser?.role === 0 ? (
        <div>
          <p>Você não tem permissão para excluir usuários.</p>
          <button onClick={closeModal} style={styles.button}>Fechar</button>
        </div>
      ) : (
        <div>
          <h3>Digite o ID do usuário na lista que deseja excluir</h3>

          <div>
            <label style={styles.label}>ID do Usuário: </label>
            <input
              type="text"
              placeholder="Digite o ID do usuário a ser excluído"
              value={userIdToDelete}
              onChange={(e) => setUserIdToDelete(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleDeleteUser} style={styles.button}>
              Excluir
            </button>
            <SearchUsers />
          </div>
        </div>
      )}
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
    marginBottom: '10px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '50%',
    height: '20%',
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
    marginTop: '10px',
    marginLeft: '10px',
  },
};

export default DeleteUser;
