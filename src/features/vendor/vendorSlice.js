import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchVendorById, fetchVendors } from '../../services/vendorService';

export const loadVendors = createAsyncThunk('vendors/loadVendors', async (_, { rejectWithValue }) => {
  try {
    return await fetchVendors();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loadVendorDetail = createAsyncThunk('vendors/loadVendorDetail', async (id, { rejectWithValue }) => {
  try {
    return await fetchVendorById(id);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const vendorSlice = createSlice({
  name: 'vendors',
  initialState: {
    items: [],
    selected: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadVendors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadVendors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadVendors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loadVendorDetail.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export default vendorSlice.reducer;
