import React, { useState } from 'react';
import axios from 'axios';

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const SearchMaintenance: React.FC = () => {
  const [maintenances, setMaintenances] = useState<any[]>([]);
  const [equipamentoId, setEquipamentoId] = useState('');
  const [tipoManutencao, setTipoManutencao] = useState('');
  const [tecnicoExecutor, setTecnicoExecutor] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [numeroManutencao, setNumeroManutencao] = useState('');

  const fetchMaintenances = async () => {
    const token = getToken();

    if (!token) {
      alert('Você precisa estar logado para buscar manutenções.');
      return;
    }

    try {
      const params: { [key: string]: string } = {};
      if (equipamentoId) params.equipamentoId = equipamentoId;
      if (tipoManutencao) params.tipoManutencao = tipoManutencao;
      if (tecnicoExecutor) params.tecnicoExecutor = tecnicoExecutor;
      if (dataEntrada) params.dataEntrada = dataEntrada;
      if (dataSaida) params.dataSaida = dataSaida;
      if (numeroManutencao) params.numeroManutencao = numeroManutencao;

      const response = await axios.get('http://localhost:3000/maintenance', {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMaintenances(response.data);
    } catch (error) {
      alert('Erro ao buscar manutenções');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMaintenances();
  };

  return (
    <div style={styles.container}>
      <h2>Buscar Manutenções</h2>
      <form onSubmit={handleSearchSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>ID do equipamento: </label>
          <input
            type="text"
            placeholder="Pesquisar por ID de Equipamento"
            value={equipamentoId}
            onChange={(e) => setEquipamentoId(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tipo de manutenção: </label>
          <select
            value={tipoManutencao}
            onChange={(e) => setTipoManutencao(e.target.value)}
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
          <label style={styles.label}>Nome do Técnico: </label>
          <input
            type="text"
            placeholder="Pesquisar por Técnico Executor"
            value={tecnicoExecutor}
            onChange={(e) => setTecnicoExecutor(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Número da Manutenção: </label>
          <input
            type="text"
            placeholder="Pesquisar por Número da Manutenção"
            value={numeroManutencao}
            onChange={(e) => setNumeroManutencao(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Data de Entrada: </label>
          <input
            type="date"
            value={dataEntrada}
            onChange={(e) => setDataEntrada(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Data de Saída: </label>
          <input
            type="date"
            value={dataSaida}
            onChange={(e) => setDataSaida(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>Buscar</button>
        </div>
      </form>

      <h3>Manutenções Encontradas</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Número da Manutenção</th>
            <th style={styles.tableHeader}>Tipo de Manutenção</th>
            <th style={styles.tableHeader}>Ocorrência</th>
            <th style={styles.tableHeader}>Causa</th>
            <th style={styles.tableHeader}>Solução</th>
            <th style={styles.tableHeader}>Data de Entrada</th>
            <th style={styles.tableHeader}>Data de Solução</th>
            <th style={styles.tableHeader}>Técnico Executor</th>
            <th style={styles.tableHeader}>ID Equipamento</th>
          </tr>
        </thead>
        <tbody>
          {maintenances.map((maintenance) => (
            <tr key={maintenance.id}>
              <td style={styles.tableCell}>{maintenance.id}</td>
              <td style={styles.tableCell}>{maintenance.numeroManutencao}</td>
              <td style={styles.tableCell}>{maintenance.tipoManutencao}</td>
              <td style={styles.tableCell}>{maintenance.ocorrencia}</td>
              <td style={styles.tableCell}>{maintenance.causa}</td>
              <td style={styles.tableCell}>{maintenance.solucao}</td>
              <td style={styles.tableCell}>{maintenance.dataEntrada}</td>
              <td style={styles.tableCell}>{maintenance.dataSolucao}</td>
              <td style={styles.tableCell}>{maintenance.tecnicoExecutor}</td>
              <td style={styles.tableCell}>{maintenance.equipamentoId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    margin: '0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  formGroup: {
    display: 'flex',
    gap: '5px',
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
    width: '30%',
    height: '10%',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px',
  },
  button: {
    padding: '10px 12px',
    backgroundColor: 'rgba(85, 85, 83, 0.92)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '10px 5px',
    width: '12%',
  },
  table: {
    width: '80%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  tableHeader: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },

};

export default SearchMaintenance;
