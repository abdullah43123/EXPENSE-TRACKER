import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import NotFound from './pages/NotFound';
import Account from './pages/Account';
import Expenses from './pages/Expenses';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Income from './pages/Income';
import Records from './pages/Records';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from './context/userContext';

const queryClient = new QueryClient();

function App() {
  const { user } = useContext(AuthContext);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />

          {user ? (
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="income" element={<Income />} />
              <Route path="categories" element={<Categories />} />
              <Route path="account" element={<Account />} />
              <Route path="records" element={<Records />} />
            </Route>
          ) : (
            <Route path="/dashboard/*" element={<Navigate to="/login" />} />
          )}

          {/* <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} /> */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>

      </Router>
    </QueryClientProvider>
  );
}

export default App;
