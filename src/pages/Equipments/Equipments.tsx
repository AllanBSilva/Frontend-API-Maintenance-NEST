import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Equipment: React.FC = () => {
  const [equipments, setEquipments] = useState<any[]>([]);
  const [newEquipment, setNewEquipment] = useState({
    numeroSerie: '',
    patrimonio: '',
    nome: '',
    marca: '',
    modelo: '',
    setor: '',
  });

  // Função para buscar os equipamentos
  const fetchEquipments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/equipment'); 
      setEquipments(response.data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos", error);
    }
  };

  // Função para criar um novo equipamento
  const handleCreateEquipment = async () => {
    try {
      await axios.post('http://localhost:3000/equipment', newEquipment); 
      alert("Equipamento criado com sucesso!");
      fetchEquipments();  // Recarrega a lista de equipamentos
    } catch (error) {
      console.error("Erro ao criar equipamento", error);
    }
  };

  // Função para excluir um equipamento
  const handleDeleteEquipment = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/equipment/${id}`); 
      alert("Equipamento excluído com sucesso!");
      fetchEquipments();  // Recarrega a lista de equipamentos
    } catch (error) {
      console.error("Erro ao excluir equipamento", error);
    }
  };

  useEffect(() => {
    fetchEquipments();  
  }, []);

  return (
    <div style={styles.container}>
      <h2>Gestão de Equipamentos</h2>

      {/* Formulário de Criação de Equipamento */}
      <div>
        <h3>Cadastrar Novo Equipamento</h3>
        <input
          type="text"
          placeholder="Número de Série"
          value={newEquipment.numeroSerie}
          onChange={(e) => setNewEquipment({ ...newEquipment, numeroSerie: e.target.value })}
        />
        <input
          type="text"
          placeholder="Patrimônio"
          value={newEquipment.patrimonio}
          onChange={(e) => setNewEquipment({ ...newEquipment, patrimonio: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nome"
          value={newEquipment.nome}
          onChange={(e) => setNewEquipment({ ...newEquipment, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Marca"
          value={newEquipment.marca}
          onChange={(e) => setNewEquipment({ ...newEquipment, marca: e.target.value })}
        />
        <input
          type="text"
          placeholder="Modelo"
          value={newEquipment.modelo}
          onChange={(e) => setNewEquipment({ ...newEquipment, modelo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Setor"
          value={newEquipment.setor}
          onChange={(e) => setNewEquipment({ ...newEquipment, setor: e.target.value })}
        />
        <button onClick={handleCreateEquipment}>Cadastrar</button>
      </div>

      {/* Lista de Equipamentos */}
      <h3>Lista de Equipamentos</h3>
      <ul>
        {equipments.map((equipment) => (
          <li key={equipment.id}>
            {equipment.nome} ({equipment.marca}) - {equipment.setor}
            <button onClick={() => handleDeleteEquipment(equipment.id)}>Excluir</button>
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

export default Equipment;
