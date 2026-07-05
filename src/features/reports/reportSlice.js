import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchReports, getReportDataset } from '../../services/reportService';

export const loadReports = createAsyncThunk('reports/loadReports', async (_, { rejectWithValue }) => {
  try {
    return await fetchReports();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loadReportDataset = createAsyncThunk(
  'reports/loadReportDataset',
  async (type, { rejectWithValue }) => {
    try {
      return await getReportDataset(type);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    items: [],
    dataset: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadReports.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loadReportDataset.fulfilled, (state, action) => {
        state.dataset = action.payload;
      });
  },
});

export default reportSlice.reducer;
