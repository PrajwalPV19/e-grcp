import { useEffect, useMemo, useState } from 'react';
import { Button, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import { loadReportDataset, loadReports } from '../features/reports/reportSlice';
import { exportToCsv, exportToExcel } from '../utils/export';

export default function ReportingCenterPage() {
  const dispatch = useDispatch();
  const { items, dataset, status } = useSelector((state) => state.reports);
  const [selectedType, setSelectedType] = useState('Procurement');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadReports());
      dispatch(loadReportDataset(selectedType));
    }
  }, [dispatch, status, selectedType]);

  const columns = useMemo(() => {
    const sample = dataset[0] ?? {};
    return Object.keys(sample).map((key) => ({
      key,
      header: key,
    }));
  }, [dataset]);

  if (status === 'loading' || status === 'idle') {
    return <Loader label="Loading reporting center..." />;
  }

  return (
    <>
      <PageHeader title="Reporting Center" subtitle="Generate procurement, vendor, audit, and risk exports." />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Report type"
            value={selectedType}
            onChange={(event) => {
              setSelectedType(event.target.value);
              dispatch(loadReportDataset(event.target.value));
            }}
          >
            {['Procurement', 'Vendor', 'Audit', 'Risk'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => exportToCsv(`${selectedType}.csv`, dataset)}>
              Export CSV
            </Button>
            <Button variant="contained" onClick={() => exportToExcel(`${selectedType}.xlsx`, dataset)}>
              Export Excel
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <DataTable
        columns={columns}
        rows={dataset}
        page={0}
        rowsPerPage={5}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
      <Stack spacing={1} sx={{ mt: 3 }}>
        {items.map((item) => (
          <div key={item.id}>
            {item.name} • {item.records} records • updated {item.updatedOn}
          </div>
        ))}
      </Stack>
    </>
  );
}
