import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../components/UsersList';

interface RegisterMaintenanceProps {
  closeModal: () => void;
}

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const RegisterMaintenance: React.FC<RegisterMaintenanceProps> = ({ closeModal }) => {
  const { user } = useUser();
  const [maintenanceData, setMaintenanceData] = useState({
    equipamentoId: '',
    tipoManutencao: '',
    ocorrencia: '',
    causa: '',
    solucao: '',
    dataEntrada: '',
    dataSolucao: '',
    tecnicoExecutor: '',
  });
  const [error, setError] = useState<string>('');

  const handleRegisterMaintenance = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        setError('Token de autenticação inválido ou expirado.');
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/maintenance/${maintenanceData.equipamentoId}`,
        maintenanceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert('Manutenção registrada com sucesso!');
        closeModal();
      }
    } catch (error) {
      setError('Erro ao registrar manutenção');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registrar Manutenção</h2>
      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleRegisterMaintenance} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="equipamentoId" style={styles.label}>ID do Equipamento:</label>
          <input
            type="text"
            id="equipamentoId"
            value={maintenanceData.equipamentoId}
            onChange={(e) => setMaintenanceData({ ...maintenanceData, equipamentoId: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="tipoManutencao" style={styles.label}>Tipo de Manutenção:</label>
          <select
            id="tipoManutencao"
            value={maintenanceData.tipoManutencao}
            onChange={(e) => setMaintenanceData({ ...maintenanceData, tipoManutencao: e.target.value })}
            required
            style={styles.input}
          >
            <option value="">Selecione o tipo de manutenção</option>
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
          <label htmlFor="ocorrencia" style={styles.label}>Ocorrência:</label>
          <input
            type="text"
            id="ocorrencia"
            value={maintenanceData.ocorrencia}
            onChange={(e) => setMaintenanceData({ ...maintenanceData, ocorrencia: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="causa" style={styles.label}>Causa:</label>
          <input
            type="text"
            id="causa"
            value={maintenanceData.causa}
            onChange={(e) => setMaintenanceData({ ...maintenanceData, causa: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="solucao" style={styles.label}>Solução:</label>
          <input
            type="text"
            id="solucao"
            value={maintenanceData.solucao}
            onChange={(e) => setMaintenanceData({ ...maintenanceData, solucao: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="dataEntrada" style={styles.label}>Data de Entrada:</label>
          <input
            type="date"
            id="dataEntrada"
            value={maintenanceData.dataEntrada}
            onChange={(e) => setMaintenanceData({ ...maintenanceData, dataEntrada: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="dataSolucao" style={styles.label}>Data de Solução:</label>
          <input
            type="date"
            id="dataSolucao"
            value={maintenanceData.dataSolucao}
            onChange={(e) => setMaintenanceData({ ...maintenanceData, dataSolucao: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="tecnicoExecutor" style={styles.label}>Técnico Executor:</label>
          <input
            type="text"
            id="tecnicoExecutor"
            value={maintenanceData.tecnicoExecutor}
            onChange={(e) => setMaintenanceData({ ...maintenanceData, tecnicoExecutor: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>Registrar Manutenção</button>
          <button type="button" onClick={closeModal} style={styles.button}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '10px',
    margin: '0',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
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
    fontSize: '13px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '60%',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
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
    width: 'auto',
    maxWidth: '200px',
  },
};

export default RegisterMaintenance;
