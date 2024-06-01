import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';  // Make sure Axios is imported
import { clearProducts } from './productSlice'; // Import the clearProducts action

interface AuthState {
  username: string;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  username: '',
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

// Define the async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post('https://dummyjson.com/auth/login', {
      username,
      password,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.username = '';
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    setAuthFromStorage(state) {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (token && username) {
        state.token = token;
        state.username = username;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; username: string }>) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.username = action.payload.username;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('username', action.payload.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      });
  },
});

export const { logout, setAuthFromStorage } = authSlice.actions;

export const logoutAndClear = (): any => (dispatch: any) => {
  dispatch(logout());
  dispatch(clearProducts());
};

export default authSlice.reducer;
