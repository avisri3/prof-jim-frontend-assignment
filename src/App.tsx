import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './store';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth.token ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
