import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchComplianceRecords } from '../../services/complianceService';

export const loadCompliance = createAsyncThunk('compliance/loadCompliance', async (_, { rejectWithValue }) => {
  try {
    return await fetchComplianceRecords();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const complianceSlice = createSlice({
  name: 'compliance',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCompliance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCompliance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadCompliance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default complianceSlice.reducer;
