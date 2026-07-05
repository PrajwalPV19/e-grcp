import { useMemo } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useSelector } from 'react-redux';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import { loadRisks } from '../features/risk/riskSlice';
import { useAsyncData } from '../hooks/useAsyncData';

export default function RiskCenterPage() {
  const { items, status } = useSelector((state) => state.risk);
  useAsyncData(status, loadRisks);

  const columns = useMemo(
    () => [
      { key: 'id', header: 'Risk ID' },
      { key: 'category', header: 'Category' },
      { key: 'impact', header: 'Impact' },
      { key: 'likelihood', header: 'Likelihood' },
      { key: 'score', header: 'Score' },
      { key: 'owner', header: 'Owner' },
    ],
    [],
  );

  if (status === 'loading' || status === 'idle') {
    return <Loader label="Loading risk center..." />;
  }

  return (
    <>
      <PageHeader title="Risk Center" subtitle="Matrix-style monitoring for business, vendor, and compliance risks." />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard title="Risk Heat Trend">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#d97706" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Risk Matrix
            </Typography>
            <Typography color="text.secondary">
              High-impact vendor and approval delay risks remain the top watch items this cycle.
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <DataTable
            columns={columns}
            rows={items}
            page={0}
            rowsPerPage={5}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </Grid>
      </Grid>
    </>
  );
}
