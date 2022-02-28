/* eslint-disable no-undef */
import { Outlet, Navigate } from 'react-router';

const RequireAuth: React.FC = () => {
  const token = localStorage.getItem('token');

  return (
    token ? <Outlet /> : <Navigate to="/signIn" />
  );
};

export default RequireAuth;
