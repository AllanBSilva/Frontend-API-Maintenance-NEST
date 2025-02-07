import React, { useState } from 'react';
import axios from 'axios';

const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const SearchEquipment: React.FC = () => {
  const [equipments, setEquipments] = useState<any[]>([]);
  const [patrimonio, setPatrimonio] = useState('');
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [setor, setSetor] = useState('');

  const fetchEquipments = async () => {
    const token = getToken();

    if (!token) {
      alert('Você precisa estar logado para buscar equipamentos.');
      return;
    }

    try {
      const params: { [key: string]: string } = {};
      if (patrimonio) params.patrimonio = patrimonio;
      if (nome) params.nome = nome;
      if (marca) params.marca = marca;
      if (modelo) params.modelo = modelo;
      if (setor) params.setor = setor;

      const response = await axios.get('http://localhost:3000/equipment', {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEquipments(response.data);
    } catch (error) {
      alert('Erro ao buscar equipamentos');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEquipments();
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.h3}>Buscar Equipamentos</h3>
      <form onSubmit={handleSearchSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Patrimônio:</label>
          <input
            type="text"
            placeholder="Pesquisar por patrimônio"
            value={patrimonio}
            onChange={(e) => setPatrimonio(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome:</label>
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Marca:</label>
          <input
            type="text"
            placeholder="Pesquisar por marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Modelo:</label>
          <input
            type="text"
            placeholder="Pesquisar por modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Setor:</label>
          <input
            type="text"
            placeholder="Pesquisar por setor"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Buscar</button>
      </form>

      <h3 style={styles.resultsTitle}>Equipamentos Encontrados</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Nome</th>
            <th style={styles.tableHeader}>Número de Série</th>
            <th style={styles.tableHeader}>Patrimônio</th>
            <th style={styles.tableHeader}>Marca</th>
            <th style={styles.tableHeader}>Modelo</th>
            <th style={styles.tableHeader}>Setor</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment.id}>
              <td style={styles.tableCell}>{equipment.id}</td>
              <td style={styles.tableCell}>{equipment.nome}</td>
              <td style={styles.tableCell}>{equipment.numeroSerie}</td>
              <td style={styles.tableCell}>{equipment.patrimonio}</td>
              <td style={styles.tableCell}>{equipment.marca}</td>
              <td style={styles.tableCell}>{equipment.modelo}</td>
              <td style={styles.tableCell}>{equipment.setor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    margin: '0',
  },
  h3: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '1px',
  },
  formGroup: {
    marginBottom: '5px',
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
    width: '50%',
    height: '20%',
    boxSizing: 'border-box' as 'border-box',
  },
  button: {
    padding: '10px 12px',
    backgroundColor: 'rgba(85, 85, 83, 0.92)' as 'rgba(85, 85, 83, 0.92)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '20%',
    maxWidth: '200px',
    marginTop: '10px',
  },
  resultsTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center' as 'center',
    marginTop: '30px',
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
  },
  tableHeader: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center' as 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center' as 'center',
    fontSize: 'smaller',
  },
};

export default SearchEquipment;
