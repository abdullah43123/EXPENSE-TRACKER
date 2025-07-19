import Sidebar from '../components/Sidebar';
import { useAuth } from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';
const DashboardLayout = ({ children }) => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar logout={logout} />
      <div className="flex-1 overflow-auto">
        {/* <main className="p-6">{children}</main> */}
        <main className="p-6"><Outlet /></main>
      </div>
    </div>
  );
};

export default DashboardLayout;