import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchEquipments from '../Equipments/SearchEquipment';

interface DeleteEquipmentProps {
  closeModal: () => void;
}

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const DeleteEquipment: React.FC<DeleteEquipmentProps> = ({ closeModal }) => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState<any>({});
  const [error, setError] = useState<string>('');
  const [equipmentIdToDelete, setEquipmentIdToDelete] = useState<string>('');

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError('Token de autenticação inválido ou expirado.');
          closeModal();
          return;
        }
        const response = await axios.get(`http://localhost:3000/equipment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEquipment(response.data);
      } catch (error) {
        alert('Erro ao buscar equipamentos');
        return;
      }
    };

    fetchEquipment();
  }, [id]);

  const handleDeleteEquipment = async () => {
    if (equipmentIdToDelete) {
      try {
        const token = getToken();
        if (!token) {
          setError('Token de autenticação inválido ou expirado.');
          return;
        }

        await axios.delete(`http://localhost:3000/equipment/${equipmentIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Equipamento excluído com sucesso!');
        closeModal();
      } catch (error) {
        alert('Erro ao excluir equipamento');
      }
    } else {
      setError('Por favor, forneça um ID de equipamento válido para excluir.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Excluir Equipamento</h2>
      {error && <div style={styles.error}>{error}</div>}

      <div>
        <h3>Digite o ID do equipamento que deseja excluir</h3>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Digite o ID do equipamento a ser excluído"
            value={equipmentIdToDelete}
            onChange={(e) => setEquipmentIdToDelete(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={handleDeleteEquipment} style={styles.button}>
            Excluir
          </button>
          <button onClick={closeModal} style={styles.button}>
            Cancelar
          </button>
        </div>
        <SearchEquipments />
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
    marginBottom: '10px',
  },
  formGroup: {
    marginBottom: '5px',
  },
  input: {
    padding: '5px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '50%',
    height: '10%',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    marginTop: '10px',
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
    marginRight: '5px',
    marginLeft: '5px',
  },
};

export default DeleteEquipment;
