import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const auth = useSelector((state: RootState) => state.auth);

  return auth.token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
