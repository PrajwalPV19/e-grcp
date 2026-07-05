import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchNotifications } from '../../services/notificationService';

export const loadNotifications = createAsyncThunk(
  'notifications/loadNotifications',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchNotifications();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    markAsRead: (state, action) => {
      const item = state.items.find((entry) => entry.id === action.payload);
      if (item) {
        item.read = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
