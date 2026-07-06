# e-GRCP Platform

Enterprise Governance, Risk, Compliance & Procurement Platform built from the trainer assignment using React, Vite, Redux Toolkit, React Router, Axios, React Hook Form, Yup, Material UI, Recharts, and Vitest.



## Demo credentials

- `employee@egrcp.com`
- `manager@egrcp.com`
- `compliance@egrcp.com`
- `auditor@egrcp.com`
- `admin@egrcp.com`

Password for all demo users: `Password@123`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run test`

## Architecture

- `src/components`: reusable UI building blocks including table, KPI card, loader, error state, and chart container
- `src/features`: Redux Toolkit slices and async thunks for each business module
- `src/layouts`: shell layout with sidebar, header, role-based navigation, and theme switcher
- `src/pages`: route-level screens for auth, dashboard, procurement, vendors, risk, compliance, audit, approvals, reports, notifications, and settings
- `src/services`: Axios client plus mock service layer
- `src/mocks`: frontend-only JSON datasets to simulate enterprise workflows
- `src/store`: persisted Redux store configuration
- `src/tests`: unit tests for forms, reducers, and services

## Assignment coverage

- Authentication with protected routes and session persistence
- Executive dashboard with KPI cards, charts, and activity timeline
- Procurement workspace with list/detail views, search, filtering, pagination, and status tracking
- Vendor governance with advanced overview and vendor profile routes
- Risk, compliance, audit, approvals, reports, notifications, and settings modules
- Redux Toolkit with `configureStore`, `createSlice`, `createAsyncThunk`, Redux DevTools, and Redux Persist
- Axios interceptors and centralized error handling
- React Hook Form + Yup validation
- Error boundary, lazy-loaded routes, and reusable components
- CSV and Excel export from the reporting center

## document export:
xlsx and csv file format
##deploymet
-this application as been deployed to vercel:
-**URL**:https://e-grcp.vercel.app/login

##Repository
-Github repo URL-


