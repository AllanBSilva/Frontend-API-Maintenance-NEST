import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../components/UsersList';
import SearchMaintenance from './SearchMaintenance';

interface DeleteMaintenanceProps {
  closeModal: () => void;
}

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const DeleteMaintenance: React.FC<DeleteMaintenanceProps> = ({ closeModal }) => {
  const [maintenanceIdToDelete, setMaintenanceIdToDelete] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleDeleteMaintenance = async () => {
    if (!maintenanceIdToDelete) {
      setError('Por favor, forneça um ID de manutenção válido para excluir.');
      return;
    }

    const token = getToken();
    if (!token) {
      setError('Token de autenticação inválido ou expirado.');
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/maintenance/${maintenanceIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Manutenção excluída com sucesso!');
      closeModal();
    } catch (error) {
      setError('Erro ao excluir manutenção');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Excluir Manutenção</h2>
      {error && <div style={styles.error}>{error}</div>}
      <div>
        <h3>Digite o ID da manutenção que deseja excluir</h3>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Digite o ID da manutenção a ser excluída"
            value={maintenanceIdToDelete}
            onChange={(e) => setMaintenanceIdToDelete(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={handleDeleteMaintenance} style={styles.button}>
            Excluir
          </button>
          <button onClick={closeModal} style={styles.button}>
            Cancelar
          </button>
        </div>
        <SearchMaintenance />
      </div>
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
    marginBottom: '5px',
  },
  formGroup: {
    marginBottom: '5px',
  },
  input: {
    padding: '5px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '30%',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '5px',
    marginTop: '5px',
  },
  button: {
    padding: '10px 12px',
    backgroundColor: 'rgba(85, 85, 83, 0.92)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '5px',
    marginRight: '5px',
    marginLeft: '5px',
  },
};

export default DeleteMaintenance;
