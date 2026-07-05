import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDashboard } from '../../services/dashboardService';

export const loadDashboard = createAsyncThunk('dashboard/loadDashboard', async (_, { rejectWithValue }) => {
  try {
    return await fetchDashboard();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(loadDashboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
