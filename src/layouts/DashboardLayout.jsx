import Sidebar from '../components/Sidebar';
import { useContext } from 'react';
import { AuthContext } from '../context/userContext';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar logout={logout} />
      <div className="flex-1 overflow-auto">
        <main className="p-6"><Outlet /></main>
      </div>
    </div>
  );
};

export default DashboardLayout;