import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import RegisterUser from './Users/RegisterUser';
import EditUser from './Users/EditUser';
import DeleteUser from './Users/DeleteUser';
import SearchUsers from './Users/SearchUsers';
import { useUser } from '../components/UsersList'
import RegisterEquipment from './Equipments/RegisterEquipment';
import SearchEquipment from './Equipments/SearchEquipment';
import EditEquipment from './Equipments/EditEquipment';
import DeleteEquipment from './Equipments/DeleteEquipment';
import RegisterMaintenance from './Maintenance/RegisterMaintenance';
import SearchMaintenance from './Maintenance/SearchMaintenance';
import EditMaintenance from './Maintenance/EditMaintenance';
import DeleteMaintenance from './Maintenance/DeleteMaintenance';

Modal.setAppElement('#root');

const Dashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { user, setUser } = useUser();

  const [modals, setModals] = useState<{ [key: string]: boolean }>({
    register: false,
    search: false,
    edit: false,
    delete: false,
    registerEquip: false,
    searchEquip: false,
    editEquip: false,
    deleteEquip: false,
    registerMaint: false,
    searchMaint: false,
    editMaint: false,
    deleteMaint: false,
  });

  const toggleModal = (modalName: string, status: boolean): void => {
    setModals((prevState) => ({
      ...prevState,
      [modalName]: status,
    }));
  };

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeAllMenus = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    if (!user) {
      setUser({ username: 'Nenhum Usuário', email: 'desconhecido@example.com', role: 0, id: "0" });
    }
  }, [user, setUser]);

  const handleHover = (e: React.MouseEvent, hover: boolean) => {
    const target = e.currentTarget as HTMLElement;
    if (target.innerText !== 'Sair') {
      target.style.backgroundColor = hover
        ? 'rgba(255, 255, 255, 0.27)'
        : 'transparent'; 
    }
    else {
      target.style.backgroundColor = hover
        ? 'rgba(122, 5, 11, 0.76)'
        : 'rgba(217, 5, 16, 0.68)'; 
    }
  };

  const handleSubmenuHover = (e: React.MouseEvent, hover: boolean) => {
    const target = e.currentTarget as HTMLElement;
    target.style.backgroundColor = hover
      ? 'rgba(255, 255, 255, 0.27)'
      : 'rgba(217, 5, 16, 0.37)';
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        {/* Botão "Usuários" com submenu */}
        <div style={styles.menuItem}>
          <button
            style={styles.button}
            onClick={() => toggleMenu('users')}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Usuários
          </button>
          {activeMenu === 'users' && (
            <div style={styles.submenu}>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('register', true); closeAllMenus(); }}
              >
                Cadastrar de Novo Usuário
              </button>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('search', true); closeAllMenus(); }}
              >
                Consultar Usuários
              </button>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('edit', true); closeAllMenus(); }}
              >
                Editar dados cadastrados
              </button>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('delete', true); closeAllMenus(); }}
              >
                Excluir de Usuário
              </button>
            </div>
          )}
        </div>

        {/* Botão "Equipamentos" com submenu */}
        <div style={styles.menuItem}>
          <button style={styles.button}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onClick={() => toggleMenu('equipments')}>
            Equipamentos
          </button>
          {activeMenu === 'equipments' && (
            <div style={styles.submenu}>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('registerEquip', true); closeAllMenus(); }}>
                Cadastro de Equipamentos
              </button>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('searchEquip', true); closeAllMenus(); }}>
                Consulta Lista de Equipamentos
              </button>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('editEquip', true); closeAllMenus(); }}>
                Edição de Equipamentos
              </button>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('deleteEquip', true); closeAllMenus(); }}>
                Exclusão de Equipamentos
              </button>
            </div>
          )}
        </div>

        {/* Botão "Manutenção" com submenu */}
        <div style={styles.menuItem}>
          <button style={styles.button}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onClick={() => toggleMenu('maintenance')}>
            Manutenção
          </button>
          {activeMenu === 'maintenance' && (
            <div style={styles.submenu}>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('registerMaint', true); closeAllMenus(); }}>
                Cadastro de Manutenção
              </button>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('searchMaint', true); closeAllMenus(); }}>
                Consulta de Manutenção
              </button>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('editMaint', true); closeAllMenus(); }}>
                Edição de Manutenção
              </button>
              <button style={styles.submenuButton}
                onMouseEnter={(e) => handleSubmenuHover(e, true)}
                onMouseLeave={(e) => handleSubmenuHover(e, false)}
                onClick={() => { toggleModal('deleteMaint', true); closeAllMenus(); }}>
                Exclusão de Manutenção
              </button>
            </div>
          )}
        </div>

        {/* Botão "Sair" */}
        <Link to="/login" style={styles.link}>
          <button style={{ ...styles.button, backgroundColor: 'rgba(217, 5, 16, 0.68)' }}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >Sair</button>
        </Link>

        <div style={styles.userInfo}>
          Usuário: {user?.username}!
        </div>
      </nav>

      {/* Modal de Cadastro de Usuário */}
      <Modal
        isOpen={modals.register}
        onRequestClose={() => toggleModal('register', false)}
        contentLabel="Cadastro de Usuário"
        style={modalStyles}
      >
        <RegisterUser closeModal={() => toggleModal('register', false)} />
        <button onClick={() => toggleModal('register', false)} style={modalStyles.button}>Fechar</button>
      </Modal>

      {/* Modal de Consulta de Usuários */}
      <Modal
        isOpen={modals.search}
        onRequestClose={() => toggleModal('search', false)}
        contentLabel="Consultar Usuários"
        style={modalStyles}
      >
        <SearchUsers />
        <button onClick={() => toggleModal('search', false)} style={modalStyles.button}>Fechar</button>
      </Modal>

      {/* Modal de Edição de Usuários */}
      <Modal
        isOpen={modals.edit}
        onRequestClose={() => toggleModal('edit', false)}
        contentLabel="Editar Usuário"
        style={modalStyles}
      >
        <EditUser closeModal={() => toggleModal('edit', false)} /> {/* Passando o closeModal para EditUser */}
        <button onClick={() => toggleModal('edit', false)} style={modalStyles.button}>Fechar</button>
      </Modal>

      {/* Modal de Exclusão de Usuários */}
      <Modal
        isOpen={modals.delete}
        onRequestClose={() => toggleModal('delete', false)}
        contentLabel="Excluir Usuário"
        style={modalStyles}
      >
        <DeleteUser closeModal={() => toggleModal('delete', false)} />
        <button onClick={() => toggleModal('delete', false)} style={modalStyles.button}>Fechar</button>
      </Modal>
      {/* Modais para Equipamentos e Manutenção */}
      <Modal
        isOpen={modals.registerEquip}
        onRequestClose={() => toggleModal('registerEquip', false)}
        contentLabel="Cadastro de Equipamento"
        style={modalStyles}
      >
        <RegisterEquipment closeModal={() => toggleModal('registerEquip', false)} />
        <button onClick={() => toggleModal('registerEquip', false)} style={modalStyles.button}>Fechar</button>
      </Modal>

      <Modal
        isOpen={modals.searchEquip}
        onRequestClose={() => toggleModal('searchEquip', false)}
        contentLabel="Consulta de Equipamento"
        style={modalStyles}
      >
        <SearchEquipment />
        <button onClick={() => toggleModal('searchEquip', false)} style={modalStyles.button}>Fechar</button>
      </Modal>

      <Modal
        isOpen={modals.editEquip}
        onRequestClose={() => toggleModal('editEquip', false)}
        contentLabel="Edição de Equipamento"
        style={modalStyles}
      >
        <EditEquipment closeModal={() => toggleModal('editEquip', false)} />
        <button onClick={() => toggleModal('editEquip', false)} style={modalStyles.button}>Fechar</button>
      </Modal>

      <Modal
        isOpen={modals.deleteEquip}
        onRequestClose={() => toggleModal('deleteEquip', false)}
        contentLabel="Exclusão de Equipamento"
        style={modalStyles}
      >
        <DeleteEquipment closeModal={() => toggleModal('deleteEquip', false)} />
        <button onClick={() => toggleModal('deleteEquip', false)} style={modalStyles.button}>Fechar</button>
      </Modal>

      {/* Modais para Manutenção (semelhante aos de Equipamento) */}
      <Modal
        isOpen={modals.registerMaint}
        onRequestClose={() => toggleModal('registerMaint', false)}
        contentLabel="Cadastro de Manutenção"
        style={modalStyles}
      >
        <RegisterMaintenance closeModal={() => toggleModal('registerMaint', false)} />
        <button onClick={() => toggleModal('registerMaint', false)} style={modalStyles.button}>Fechar</button>
      </Modal>

      <Modal
        isOpen={modals.searchMaint}
        onRequestClose={() => toggleModal('searchMaint', false)}
        contentLabel="Consulta de Manutenção"
        style={modalStyles2}
      >
        <SearchMaintenance />
        <button onClick={() => toggleModal('searchMaint', false)} style={modalStyles.button}>Fechar</button>
      </Modal>

      <Modal
        isOpen={modals.editMaint}
        onRequestClose={() => toggleModal('editMaint', false)}
        contentLabel="Edição de Manutenção"
        style={modalStyles2}
      >
        <EditMaintenance closeModal={() => toggleModal('editMaint', false)} />
        <button onClick={() => toggleModal('editMaint', false)} style={modalStyles.button}>Fechar</button>
      </Modal>

      <Modal
        isOpen={modals.deleteMaint}
        onRequestClose={() => toggleModal('deleteMaint', false)}
        contentLabel="Exclusão de Manutenção"
        style={modalStyles2}
      >
        <DeleteMaintenance closeModal={() => toggleModal('deleteMaint', false)} />
        <button onClick={() => toggleModal('deleteMaint', false)} style={modalStyles.button}>Fechar</button>
      </Modal>
    </div>
  );
};

const modalStyles = {
  content: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '70vh',
    padding: '10px',
    background: 'linear-gradient(to left,rgba(184, 184, 187, 0.7),rgba(231, 232, 236, 0.67))',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'auto',
    fontWeight: 'bolder',
  },
  contentWrapper: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: '60px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  button: {
    position: 'absolute' as 'absolute',
    top: '1px',
    right: '1px',
    padding: '10px 15px',
    backgroundColor: 'rgba(126, 6, 6, 0.8)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    zIndex: 999,
  },
  buttonHover: {
    backgroundColor: 'rgba(206, 203, 5, 0.8)',
  },
};

const modalStyles2 = {
  content: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1000px',
    height: '70vh',
    padding: '10px',
    background: 'linear-gradient(to left,rgba(184, 184, 187, 0.7),rgba(231, 232, 236, 0.67))',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'auto',
    fontWeight: 'bolder',
  },
  contentWrapper: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: '60px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  button: {
    position: 'absolute' as 'absolute',
    top: '1px',
    right: '1px',
    padding: '10px 15px',
    backgroundColor: 'rgba(126, 6, 6, 0.8)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    zIndex: 999,
  },
  buttonHover: {
    backgroundColor: 'rgba(206, 203, 5, 0.8)',
  },
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '0',
    margin: '0',
    height: '100vh',
    //background: 'linear-gradient(to left,rgb(2, 27, 93),rgb(107, 126, 179))',
    backgroundImage: 'url(/images/motherboard.jpg)', // Caminho da imagem
    backgroundSize: 'cover', // Garantir que a imagem cubra toda a área
    backgroundPosition: 'center', // Centralizar a imagem
    backgroundRepeat: 'no-repeat', // Não repetir a imagem
    //opacity: 0.9, // Transparência de 50% para a imagem
  },
  headingContainer: {
    textAlign: 'center',
    marginBottom: '0px',
  },
  heading: {
    fontSize: '12px',
    fontWeight: 'bold',
    margin: 0,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '12px',
    backgroundColor: 'rgba(162, 159, 5, 0.84)',
    color: 'black',
    fontWeight: 'bold',
  },
  menuItem: {
    position: 'relative',
    marginRight: '20px',
    backgroundColor: 'rgba(217, 5, 16, 0.15)',
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    fontWeight: 'bold',
  },
  submenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: 'rgba(162, 159, 5, 0.84)',
    borderRadius: '4px',
    marginTop: '5px',
    zIndex: 1,
  },
  submenuButton: {
    padding: '8px 16px',
    backgroundColor: 'rgba(217, 5, 16, 0.12)', // Cor de fundo
    color: 'white',
    border: '1px solid #ccc',
    textAlign: 'left',
    width: '200px',
    fontSize: '16px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    fontWeight: 'bold',
  },
  userInfo: {
    marginLeft: 'auto',
    fontSize: '14px',
  },
};

export default Dashboard;
