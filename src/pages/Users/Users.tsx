import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, deleteUser } from '../../services/userService'; // Importando funções nomeadas

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 0,  // 0 = Usuário comum, 1 = Admin
  });

  // Função para buscar os usuários
  const fetchAllUsers = async () => {
    try {
      const response = await fetchUsers();  // Chamando o userService para buscar todos os usuários
      setUsers(response);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  // Função para criar um novo usuário
  const handleCreateUser = async () => {
    try {
      await createUser(newUser);  // Chamando o userService para criar o novo usuário
      alert("Usuário criado com sucesso!");
      fetchAllUsers();  // Recarrega a lista de usuários
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    }
  };

  // Função para excluir um usuário
  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);  // Chamando o userService para excluir o usuário
      alert("Usuário excluído com sucesso!");
      fetchAllUsers();  // Recarrega a lista de usuários
    } catch (error) {
      console.error("Erro ao excluir usuário", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();  // Busca a lista de usuários assim que o componente for carregado
  }, []);

  return (
    <div style={styles.container}>
      <h2>Gestão de Usuários</h2>

      {/* Formulário de Criação de Usuário */}
      <div>
        <h3>Cadastrar Novo Usuário</h3>
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: Number(e.target.value) })}
        >
          <option value={0}>Usuário Comum</option>
          <option value={1}>Administrador</option>
        </select>
        <button onClick={handleCreateUser}>Cadastrar</button>
      </div>

      {/* Lista de Usuários */}
      <h3>Lista de Usuários</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email}) - {user.role === 1 ? 'Admin' : 'Usuário'}
            <button onClick={() => handleDeleteUser(user.id)}>Excluir</button> {/* Aqui chamamos a função handleDeleteUser */}
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

export default Users;
