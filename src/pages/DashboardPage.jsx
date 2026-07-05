import { useMemo } from 'react';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from '../components/ChartCard';
import ErrorState from '../components/ErrorState';
import KpiCard from '../components/KpiCard';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import { loadDashboard } from '../features/dashboard/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.dashboard);
  useAsyncData(status, loadDashboard);

  const kpis = useMemo(() => data?.kpis ?? [], [data]);

  if (status === 'loading' || status === 'idle') {
    return <Loader label="Loading executive dashboard..." />;
  }

  if (status === 'failed') {
    return <ErrorState message={error} onRetry={() => dispatch(loadDashboard())} />;
  }

  return (
    <>
      <PageHeader
        title="Executive Dashboard"
        subtitle="Centralized visibility across procurement, vendors, risks, and compliance."
      />
      <Grid container spacing={3}>
        {kpis.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 6, xl: 3 }}>
            <KpiCard {...item} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard title="Monthly Procurement Trend">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.monthlyProcurementTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#005a9c" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ChartCard title="Risk Distribution">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={data.riskTrend} dataKey="value" nameKey="name" outerRadius={88} fill="#1b806a" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Department Spending">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.departmentSpending} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#1b806a" radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ChartCard title="Activity Timeline">
            <List dense>
              {data.activities.map((activity) => (
                <ListItem key={activity} divider>
                  <ListItemText primary={activity} />
                </ListItem>
              ))}
            </List>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );
}
