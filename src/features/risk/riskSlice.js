import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchRisks } from '../../services/riskService';

export const loadRisks = createAsyncThunk('risk/loadRisks', async (_, { rejectWithValue }) => {
  try {
    return await fetchRisks();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const riskSlice = createSlice({
  name: 'risk',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRisks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadRisks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadRisks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default riskSlice.reducer;
