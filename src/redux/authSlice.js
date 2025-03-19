import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://connections-api.goit.global';

export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post(`${API_URL}/users/signup`, userData);
  return response.data;
});

export const loginUser = createAsyncThunk('auth/login', async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      
      if (!token) {
        console.error("No token found for logout");
        return rejectWithValue("No token available");
      }
  
      const response = await axios.post(
        `${API_URL}/users/logout`, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      return response.data;
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  });
  
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isAuthenticated: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
