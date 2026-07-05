import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import procurementReducer from '../features/procurement/procurementSlice';
import vendorReducer from '../features/vendor/vendorSlice';
import riskReducer from '../features/risk/riskSlice';
import complianceReducer from '../features/compliance/complianceSlice';
import auditReducer from '../features/audit/auditSlice';
import reportReducer from '../features/reports/reportSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import uiReducer from '../features/ui/uiSlice';
import persistStorage from './persistStorage';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  procurement: procurementReducer,
  vendors: vendorReducer,
  risk: riskReducer,
  compliance: complianceReducer,
  audit: auditReducer,
  reports: reportReducer,
  notifications: notificationReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: 'e-grcp-root',
  storage: persistStorage,
  whitelist: ['auth', 'procurement', 'ui', 'notifications'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
