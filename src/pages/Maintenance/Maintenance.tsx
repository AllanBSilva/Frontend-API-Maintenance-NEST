import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Maintenance: React.FC = () => {
  const [maintenances, setMaintenances] = useState<any[]>([]);
  const [newMaintenance, setNewMaintenance] = useState({
    tipoManutencao: '',
    ocorrencia: '',
    causa: '',
    solucao: '',
    dataEntrada: '',
    dataSolucao: '',
    tecnicoExecutor: '',
    equipamentoId: 0, // ID do equipamento relacionado à manutenção
  });

  // Função para buscar as manutenções
  const fetchMaintenances = async () => {
    try {
      const response = await axios.get('/maintenance');  // Endpoint para listar manutenções
      setMaintenances(response.data);
    } catch (error) {
      console.error("Erro ao buscar manutenções", error);
    }
  };

  // Função para criar uma nova manutenção
  const handleCreateMaintenance = async () => {
    try {
      await axios.post(`/maintenance/${newMaintenance.equipamentoId}`, newMaintenance);  // Endpoint para criar manutenção
      alert("Manutenção criada com sucesso!");
      fetchMaintenances();  // Recarrega a lista de manutenções
    } catch (error) {
      console.error("Erro ao criar manutenção", error);
    }
  };

  // Função para excluir uma manutenção
  const handleDeleteMaintenance = async (id: number) => {
    try {
      await axios.delete(`/maintenance/${id}`);  // Endpoint para excluir manutenção
      alert("Manutenção excluída com sucesso!");
      fetchMaintenances();  // Recarrega a lista de manutenções
    } catch (error) {
      console.error("Erro ao excluir manutenção", error);
    }
  };

  useEffect(() => {
    fetchMaintenances();  // Busca a lista de manutenções assim que o componente for carregado
  }, []);

  return (
    <div style={styles.container}>
      <h2>Gestão de Manutenções</h2>

      {/* Formulário de Criação de Manutenção */}
      <div>
        <h3>Cadastrar Nova Manutenção</h3>
        <input
          type="text"
          placeholder="Tipo de Manutenção"
          value={newMaintenance.tipoManutencao}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, tipoManutencao: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ocorrência"
          value={newMaintenance.ocorrencia}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, ocorrencia: e.target.value })}
        />
        <input
          type="text"
          placeholder="Causa"
          value={newMaintenance.causa}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, causa: e.target.value })}
        />
        <input
          type="text"
          placeholder="Solução"
          value={newMaintenance.solucao}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, solucao: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data de Entrada"
          value={newMaintenance.dataEntrada}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, dataEntrada: e.target.value })}
        />
        <input
          type="date"
          placeholder="Data de Solução"
          value={newMaintenance.dataSolucao}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, dataSolucao: e.target.value })}
        />
        <input
          type="text"
          placeholder="Técnico Executor"
          value={newMaintenance.tecnicoExecutor}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, tecnicoExecutor: e.target.value })}
        />
        <input
          type="number"
          placeholder="ID Equipamento"
          value={newMaintenance.equipamentoId}
          onChange={(e) => setNewMaintenance({ ...newMaintenance, equipamentoId: Number(e.target.value) })}
        />
        <button onClick={handleCreateMaintenance}>Cadastrar</button>
      </div>

      {/* Lista de Manutenções */}
      <h3>Lista de Manutenções</h3>
      <ul>
        {maintenances.map((maintenance) => (
          <li key={maintenance.id}>
            {maintenance.tipoManutencao} - {maintenance.ocorrencia} ({maintenance.tecnicoExecutor})
            <button onClick={() => handleDeleteMaintenance(maintenance.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    margin: '0',
  },
};

export default Maintenance;
