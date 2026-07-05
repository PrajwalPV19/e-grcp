import { useMemo, useState } from 'react';
import { Alert, Button, Card, CardContent, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import ProcurementRequestForm from '../components/ProcurementRequestForm';
import SearchBar from '../components/SearchBar';
import StatusChip from '../components/StatusChip';
import { addProcurementRequest, loadProcurements } from '../features/procurement/procurementSlice';
import { useAsyncData } from '../hooks/useAsyncData';

export default function ProcurementListPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.procurement);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useAsyncData(status, loadProcurements);

  const rows = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.department.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [items, query, statusFilter]);

  const columns = useMemo(
    () => [
      { key: 'id', header: 'Request ID' },
      { key: 'title', header: 'Title' },
      { key: 'department', header: 'Department' },
      { key: 'amount', header: 'Amount', render: (value) => `Rs ${value.toLocaleString()}` },
      { key: 'status', header: 'Status', render: (value) => <StatusChip label={value} /> },
      { key: 'priority', header: 'Priority' },
      { key: 'submittedOn', header: 'Submitted On' },
      {
        key: 'actions',
        header: 'Actions',
        render: (_, row) => (
          <Button component={RouterLink} to={`/procurement/${row.id}`} size="small">
            View
          </Button>
        ),
      },
    ],
    [],
  );

  if (status === 'loading' || status === 'idle') {
    return <Loader label="Loading procurement workspace..." />;
  }

  if (status === 'failed') {
    return <ErrorState message={error} onRetry={() => dispatch(loadProcurements())} />;
  }

  const handleCreateRequest = (values) => {
    dispatch(addProcurementRequest(values));
    setShowCreateForm(false);
    setPage(0);
    setSaveMessage('New procurement request created and added to the workspace.');
  };

  return (
    <>
      <PageHeader
        title="Procurement Workspace"
        subtitle="Search, filter, sort, and drill into procurement requests with a controlled workflow."
        actionLabel={showCreateForm ? 'Hide Request Form' : 'New Request'}
        onAction={() => {
          setShowCreateForm((current) => !current);
          setSaveMessage('');
        }}
      />
      {saveMessage ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          {saveMessage}
        </Alert>
      ) : null}
      {showCreateForm ? (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Create Procurement Request
            </Typography>
            <ProcurementRequestForm
              submitLabel="Create Request"
              onSubmit={handleCreateRequest}
              onCancel={() => setShowCreateForm(false)}
            />
          </CardContent>
        </Card>
      ) : null}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <SearchBar value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search requests" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              select
              size="small"
              fullWidth
              label="Status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              {['All', 'Pending', 'Approved', 'Rejected', 'Escalated'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
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
