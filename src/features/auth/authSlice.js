import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

export const loginUser = createAsyncThunk('auth/loginUser', async (payload, { rejectWithValue }) => {
  try {
    return await authService.login(payload);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    return await authService.forgotPassword(email);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (_payload, { rejectWithValue }) => {
  try {
    return await authService.resetPassword();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      window.localStorage.removeItem('e-grcp-token');
    },
    clearAuthFeedback: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.error = null;
      });
  },
});

export const { logout, clearAuthFeedback } = authSlice.actions;
export default authSlice.reducer;
