import React, { useState } from 'react';
import axios from 'axios';

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

interface RegisterEquipmentProps {
  closeModal: () => void;
}

const RegisterEquipment: React.FC<RegisterEquipmentProps> = ({ closeModal }) => {
  const [newEquipment, setNewEquipment] = useState({
    numeroSerie: '',
    patrimonio: '',
    nome: '',
    marca: '',
    modelo: '',
    setor: '',
  });

  const handleCreateEquipment = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      alert('Você precisa estar logado para criar um equipamento.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/equipment', newEquipment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Equipamento criado com sucesso!');

      setNewEquipment({
        numeroSerie: '',
        patrimonio: '',
        nome: '',
        marca: '',
        modelo: '',
        setor: '',
      });

      if (response.status === 201) {
        closeModal();
      }
    } catch (error) {
      alert('Erro ao criar equipamento');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cadastrar Novo Equipamento</h2>
      {<div style={styles.error}></div>}
      <form onSubmit={handleCreateEquipment}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Número de Série: </label>
          <input
            type="text"
            placeholder="Número de Série"
            value={newEquipment.numeroSerie}
            onChange={(e) => setNewEquipment({ ...newEquipment, numeroSerie: e.target.value })}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Patrimônio: </label>
          <input
            type="text"
            placeholder="Patrimônio"
            value={newEquipment.patrimonio}
            onChange={(e) => setNewEquipment({ ...newEquipment, patrimonio: e.target.value })}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome: </label>
          <input
            type="text"
            placeholder="Nome"
            value={newEquipment.nome}
            onChange={(e) => setNewEquipment({ ...newEquipment, nome: e.target.value })}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Marca: </label>
          <input
            type="text"
            placeholder="Marca"
            value={newEquipment.marca}
            onChange={(e) => setNewEquipment({ ...newEquipment, marca: e.target.value })}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Modelo: </label>
          <input
            type="text"
            placeholder="Modelo"
            value={newEquipment.modelo}
            onChange={(e) => setNewEquipment({ ...newEquipment, modelo: e.target.value })}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Setor: </label>
          <input
            type="text"
            placeholder="Setor"
            value={newEquipment.setor}
            onChange={(e) => setNewEquipment({ ...newEquipment, setor: e.target.value })}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Cadastrar</button>
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
  formGroup: {
    display: 'flex',
    marginBottom: '5px',
    gap: '10px',
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
    width: '100%',
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
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default RegisterEquipment;
