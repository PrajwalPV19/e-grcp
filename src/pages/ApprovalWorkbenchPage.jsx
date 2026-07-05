import { useMemo } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import StatusChip from '../components/StatusChip';
import { useAsyncData } from '../hooks/useAsyncData';
import { loadProcurements } from '../features/procurement/procurementSlice';

export default function ApprovalWorkbenchPage() {
  const { items, status } = useSelector((state) => state.procurement);
  useAsyncData(status, loadProcurements);

  const grouped = useMemo(
    () =>
      ['Pending', 'Approved', 'Rejected', 'Escalated'].map((status) => ({
        status,
        items: items.filter((item) => item.status === status),
      })),
    [items],
  );

  return (
    <>
      <PageHeader
        title="Approval Workbench"
        subtitle="Review queues for pending, approved, rejected, and escalated procurement actions."
      />
      <Grid container spacing={3}>
        {grouped.map((group) => (
          <Grid key={group.status} size={{ xs: 12, md: 6, xl: 3 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {group.status}
                </Typography>
                {group.items.map((item) => (
                  <Card key={item.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Typography fontWeight={600}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.id} • {item.department}
                    </Typography>
                    <StatusChip label={item.priority} />
                  </Card>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
