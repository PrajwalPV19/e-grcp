import { useMemo, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import StatusChip from '../components/StatusChip';
import { loadVendors } from '../features/vendor/vendorSlice';
import { useAsyncData } from '../hooks/useAsyncData';

export default function VendorsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.vendors);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useAsyncData(status, loadVendors);

  const rows = useMemo(
    () => items.filter((item) => `${item.id} ${item.name}`.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );

  const columns = useMemo(
    () => [
      { key: 'id', header: 'Vendor ID' },
      { key: 'name', header: 'Vendor Name' },
      { key: 'status', header: 'Status', render: (value) => <StatusChip label={value} /> },
      { key: 'riskLevel', header: 'Risk Level', render: (value) => <StatusChip label={value} /> },
      { key: 'country', header: 'Country' },
      { key: 'spend', header: 'Spend', render: (value) => `₹${value.toLocaleString()}` },
      {
        key: 'actions',
        header: 'Actions',
        render: (_, row) => (
          <Button component={RouterLink} to={`/vendors/${row.id}`} size="small">
            View
          </Button>
        ),
      },
    ],
    [],
  );

  if (status === 'loading' || status === 'idle') {
    return <Loader label="Loading vendor governance..." />;
  }

  if (status === 'failed') {
    return <ErrorState message={error} onRetry={() => dispatch(loadVendors())} />;
  }

  return (
    <>
      <PageHeader
        title="Vendor Governance"
        subtitle="Centralized vendor oversight with risk, certification, and spend visibility."
      />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SearchBar value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search vendors" />
        </Grid>
      </Grid>
      <DataTable
        columns={columns}
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, nextPage) => setPage(nextPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number(event.target.value));
          setPage(0);
        }}
      />
    </>
  );
}
