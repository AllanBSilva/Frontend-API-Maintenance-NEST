import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../components/UsersList';
import SearchMaintenance from './SearchMaintenance';

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

interface EditMaintenanceProps {
  closeModal: () => void;
}

const EditMaintenance: React.FC<EditMaintenanceProps> = ({ closeModal }) => {
  const [maintenances, setMaintenances] = useState<any[]>([]);
  const [maintenanceIdToEdit, setMaintenanceIdToEdit] = useState<string>('');
  const [maintenanceData, setMaintenanceData] = useState<any>({});
  const [error, setError] = useState<string>('');
  const { user: loggedUser } = useUser();

  useEffect(() => {
    if (!loggedUser) {
      setError('Você precisa estar logado para editar manutenções.');
      closeModal();
    }
  }, [loggedUser, closeModal]);

  const fetchMaintenances = async () => {
    setError('');
    const token = getToken();

    if (!token) {
      alert('Você precisa estar logado para buscar manutenções.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/maintenance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMaintenances(response.data);
    } catch (error) {
      alert('Erro ao buscar manutenções');
    }
  };

  const loadMaintenanceData = async () => {
    setError('');
    const token = getToken();

    if (!token) {
      alert('Você precisa estar logado para editar a manutenção.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/maintenance/${maintenanceIdToEdit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMaintenanceData(response.data);
    } catch (error) {
      setError('Manutenção não encontrada.');
    }
  };

  const handleEditMaintenance = async () => {
    const token = getToken();

    if (!token) {
      alert('Você precisa estar logado para editar esta manutenção.');
      return;
    }

    if (!maintenanceIdToEdit) {
      setError('Por favor, forneça um ID de manutenção válido.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/maintenance/${maintenanceIdToEdit}`,
        maintenanceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Manutenção atualizada com sucesso!');
      closeModal();
    } catch (error) {
      alert('Erro ao editar manutenção');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Editar Manutenção</h2>
      {error && <div style={styles.error}>{error}</div>}

      <div>
        <h3>Selecione o ID da manutenção que deseja editar</h3>

        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Digite o ID da manutenção"
            value={maintenanceIdToEdit}
            onChange={(e) => setMaintenanceIdToEdit(e.target.value)}
            style={styles.input}
          />
          <button onClick={loadMaintenanceData} style={styles.button}>
            Carregar Manutenção
          </button>
        </div>

        {maintenanceData && (
          <div>
            <h3>Dados da Manutenção</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>Tipo de Manutenção: </label>
              <select
                value={maintenanceData.tipoManutencao}
                onChange={(e) =>
                  setMaintenanceData({ ...maintenanceData, tipoManutencao: e.target.value })
                }
                style={styles.input}
              >
                <option value="Corretiva">Corretiva</option>
                <option value="Preventiva">Preventiva</option>
                <option value="Calibração">Calibração</option>
                <option value="Preditiva">Preditiva</option>
                <option value="Gerencial">Gerencial</option>
                <option value="Ronda">Ronda</option>
                <option value="Inspeção">Inspeção</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Ocorrência: </label>
              <input
                type="text"
                value={maintenanceData.ocorrencia}
                onChange={(e) =>
                  setMaintenanceData({ ...maintenanceData, ocorrencia: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Causa: </label>
              <input
                type="text"
                value={maintenanceData.causa}
                onChange={(e) =>
                  setMaintenanceData({ ...maintenanceData, causa: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Solução: </label>
              <input
                type="text"
                value={maintenanceData.solucao}
                onChange={(e) =>
                  setMaintenanceData({ ...maintenanceData, solucao: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Data de Entrada: </label>
              <input
                type="date"
                value={maintenanceData.dataEntrada}
                onChange={(e) =>
                  setMaintenanceData({ ...maintenanceData, dataEntrada: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Data de Solução: </label>
              <input
                type="date"
                value={maintenanceData.dataSolucao}
                onChange={(e) =>
                  setMaintenanceData({ ...maintenanceData, dataSolucao: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Técnico Executor: </label>
              <input
                type="text"
                value={maintenanceData.tecnicoExecutor}
                onChange={(e) =>
                  setMaintenanceData({ ...maintenanceData, tecnicoExecutor: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <div style={styles.buttonGroup}>
              <button onClick={handleEditMaintenance} style={styles.button}>
                Salvar Alterações
              </button>
              <button onClick={closeModal} style={styles.button}>
                Cancelar
              </button>
            </div>
          </div>
        )}
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
    width: '40%',
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
    marginTop: '5px',
    marginRight: '5px',
    marginLeft: '5px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px',
    marginTop: '10px',
  },
};

export default EditMaintenance;
