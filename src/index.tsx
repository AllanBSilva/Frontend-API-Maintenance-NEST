import ReactDOM from 'react-dom/client'; // Alterado para 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecoverPassword from './pages/RecoverPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import './index.css'; // Certifique-se de ter um arquivo CSS global
import RegisterUser from './pages/Users/RegisterUser';
import EditUser from './pages/Users/EditUser';
import { UserProvider } from './components/UsersList';
import DeleteUser from './pages/Users/DeleteUser';
import RegisterEquipment from './pages/Equipments/RegisterEquipment';
import SearchEquipment from './pages/Equipments/SearchEquipment';
import DeleteEquipment from './pages/Equipments/DeleteEquipment';
import RegisterMaintenance from './pages/Maintenance/RegisterMaintenance';
import SearchMaintenance from './pages/Maintenance/SearchMaintenance';
import EditMaintenance from './pages/Maintenance/EditMaintenance';
import DeleteMaintenance from './pages/Maintenance/DeleteMaintenance';
import SearchUsers from './pages/Users/SearchUsers';
import EditEquipment from './pages/Equipments/EditEquipment';

// Criar o root da aplicação com React 18
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Renderizando a aplicação
root.render(

  <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users/register" element={<RegisterUser closeModal={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/users/search" element={<SearchUsers />} />
        <Route path="/users/edit/:id" element={<EditUser closeModal={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/users/delete/:id" element={<DeleteUser closeModal={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/equipments/registerEquip" element={<RegisterEquipment closeModal={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/equipments/searchEquip" element={<SearchEquipment/>} />
        <Route path="/equipments/editEquip" element={<EditEquipment closeModal={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/equipments/deleteEquip" element={<DeleteEquipment closeModal={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/maintenance/registerMaint" element={<RegisterMaintenance closeModal={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/maintenance/searchMaint" element={<SearchMaintenance  />} />
        <Route path="/maintenance/editMaint" element={<EditMaintenance closeModal={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/maintenance/deleteMaint" element={<DeleteMaintenance closeModal={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </UserProvider>
);
