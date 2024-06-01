import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { login } from '../store/slices/authSlice';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import './Login.css';
import { red } from '@mui/material/colors';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ username, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <Box className="login-box">
        <Typography variant="h3"
            sx={{
             fontWeight: 700,
            }} className="login-title">LOGIN</Typography>
        {auth.status === 'failed' && (
          <Alert severity="error">Invalid credentials</Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#b10404',
              color: 'white',
              fontFamily: 'Roboto, sans-serif',
              marginTop: 2,
              '&:hover': {
                backgroundColor: '#8b0303',
              },
            }}
            disabled={auth.status === 'loading'}
          >
            {auth.status === 'loading' ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
