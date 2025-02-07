import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../components/UsersList';
import SearchEquipment from './SearchEquipment';

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

interface EditEquipmentProps {
  closeModal: () => void;
}

const EditEquipment: React.FC<EditEquipmentProps> = ({ closeModal }) => {
  const [equipments, setEquipments] = useState<any[]>([]);
  const [equipmentIdToEdit, setEquipmentIdToEdit] = useState<string>('');
  const [equipmentData, setEquipmentData] = useState<any>({});
  const [error, setError] = useState<string>('');
  const { user: loggedUser } = useUser();


  useEffect(() => {
    if (!loggedUser) {
      setError('Você precisa estar logado para editar equipamentos.');
      closeModal();
    }
  }, [loggedUser, closeModal]);

  const fetchEquipments = async () => {
    setError('');
    const token = getToken();

    if (!token) {
      alert('Você precisa estar logado para buscar equipamentos.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/equipment', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEquipments(response.data);
    } catch (error) {
      alert('Erro ao buscar equipamentos');
    }
  };

  const loadEquipmentData = async () => {
    setError('');
    const token = getToken();

    if (!token) {
      alert('Você precisa estar logado para editar o equipamento.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/equipment/${equipmentIdToEdit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEquipmentData(response.data);
    } catch (error) {
      setError('Equipamento não encontrado.')
    }
  };

  const handleEditEquipment = async () => {
    const token = getToken();

    if (!token) {
      alert('Você precisa estar logado para editar este equipamento.');
      return;
    }

    if (!equipmentIdToEdit) {
      setError('Por favor, forneça um ID de equipamento válido.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/equipment/${equipmentIdToEdit}`,
        equipmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Equipamento atualizado com sucesso!');
      closeModal(); // Fecha o modal após sucesso
    } catch (error) {
      alert('Erro ao editar equipamento');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Editar Equipamento</h2>
      {error && <div style={styles.error}>{error}</div>}

      <div>
        <h3>Selecione o ID do equipamento que deseja editar</h3>

        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Digite o ID do equipamento"
            value={equipmentIdToEdit}
            onChange={(e) => setEquipmentIdToEdit(e.target.value)}
            style={styles.input}
          />
          <button onClick={loadEquipmentData} style={styles.button}>
            Carregar Equipamento
          </button>
        </div>

        {equipmentData && (
          <div>
            <h3>Dados do Equipamento</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>Nome: </label>
              <input
                type="text"
                value={equipmentData.nome}
                onChange={(e) =>
                  setEquipmentData({ ...equipmentData, nome: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Marca: </label>
              <input
                type="text"
                value={equipmentData.marca}
                onChange={(e) =>
                  setEquipmentData({ ...equipmentData, marca: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Modelo: </label>
              <input
                type="text"
                value={equipmentData.modelo}
                onChange={(e) =>
                  setEquipmentData({ ...equipmentData, modelo: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Setor: </label>
              <input
                type="text"
                value={equipmentData.setor}
                onChange={(e) =>
                  setEquipmentData({ ...equipmentData, setor: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Patrimônio: </label>
              <input
                type="text"
                value={equipmentData.patrimonio}
                onChange={(e) =>
                  setEquipmentData({ ...equipmentData, patrimonio: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <button onClick={handleEditEquipment} style={styles.button}>
              Salvar Alterações
            </button>
            <button onClick={closeModal} style={styles.button}>
              Cancelar
            </button>
          </div>
        )}

        <SearchEquipment />
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
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
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

export default EditEquipment;
