import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProcurementById, fetchProcurements } from '../../services/procurementService';

function buildProcurementDetail(item) {
  return {
    ...item,
    attachments: item.attachments ?? ['SOW.pdf', 'Budget_Approval.xlsx'],
    approvalHistory: item.approvalHistory ?? ['Submitted by employee', 'Validated by procurement desk'],
    comments: item.comments ?? ['Urgent renewal required before month-end'],
    auditLogs: item.auditLogs ?? ['Created on portal', 'Viewed by manager'],
  };
}

function mergeProcurementItems(baseItems, currentItems) {
  const currentMap = new Map(currentItems.map((item) => [item.id, item]));
  const merged = baseItems.map((item) => currentMap.get(item.id) ?? item);
  const extraItems = currentItems.filter((item) => !baseItems.some((baseItem) => baseItem.id === item.id));

  return [...extraItems, ...merged];
}

export const loadProcurements = createAsyncThunk(
  'procurement/loadProcurements',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProcurements();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loadProcurementDetail = createAsyncThunk(
  'procurement/loadProcurementDetail',
  async (id, { getState, rejectWithValue }) => {
    try {
      const existingItem = getState().procurement.items.find((item) => item.id === id);
      if (existingItem) {
        return buildProcurementDetail(existingItem);
      }

      return await fetchProcurementById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const procurementSlice = createSlice({
  name: 'procurement',
  initialState: {
    items: [],
    selected: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    addProcurementRequest: (state, action) => {
      const nextId = `REQ-${new Date().getFullYear()}-${String(state.items.length + 1).padStart(3, '0')}`;
      const nextItem = buildProcurementDetail({
        ...action.payload,
        id: nextId,
        amount: Number(action.payload.amount),
        submittedOn: new Date().toISOString().slice(0, 10),
        attachments: [],
        approvalHistory: ['Created by procurement team'],
        comments: [action.payload.justification],
        auditLogs: ['Created from procurement workspace'],
      });

      state.items.unshift(nextItem);
      state.selected = nextItem;
    },
    updateProcurementRequest: (state, action) => {
      const updatedItem = action.payload;
      state.items = state.items.map((item) =>
        item.id === updatedItem.id
          ? buildProcurementDetail({
              ...item,
              ...updatedItem,
              amount: Number(updatedItem.amount),
              comments: updatedItem.justification
                ? [updatedItem.justification, ...(item.comments ?? [])]
                : item.comments,
              auditLogs: ['Updated from procurement workspace', ...(item.auditLogs ?? [])],
            })
          : item,
      );

      if (state.selected?.id === updatedItem.id) {
        state.selected = state.items.find((item) => item.id === updatedItem.id) ?? state.selected;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProcurements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadProcurements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = mergeProcurementItems(action.payload, state.items);
      })
      .addCase(loadProcurements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loadProcurementDetail.fulfilled, (state, action) => {
        state.selected = buildProcurementDetail(action.payload);
      });
  },
});

export const { addProcurementRequest, updateProcurementRequest } = procurementSlice.actions;
export default procurementSlice.reducer;
