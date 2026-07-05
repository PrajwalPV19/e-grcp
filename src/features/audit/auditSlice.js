import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAuditLogs } from '../../services/auditService';

export const loadAuditLogs = createAsyncThunk('audit/loadAuditLogs', async (_, { rejectWithValue }) => {
  try {
    return await fetchAuditLogs();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const auditSlice = createSlice({
  name: 'audit',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAuditLogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAuditLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadAuditLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default auditSlice.reducer;
