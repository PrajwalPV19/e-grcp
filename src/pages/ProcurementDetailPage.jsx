import { useEffect, useMemo, useState } from 'react';
import { Alert, Card, CardContent, Chip, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import ProcurementRequestForm from '../components/ProcurementRequestForm';
import { loadProcurementDetail, updateProcurementRequest } from '../features/procurement/procurementSlice';

export default function ProcurementDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.procurement);
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    dispatch(loadProcurementDetail(id));
  }, [dispatch, id]);

  const formValues = useMemo(
    () => ({
      title: selected?.title ?? '',
      department: selected?.department ?? '',
      owner: selected?.owner ?? '',
      vendor: selected?.vendor ?? '',
      amount: selected?.amount ?? '',
      priority: selected?.priority ?? 'Medium',
      status: selected?.status ?? 'Pending',
      justification: selected?.comments?.[0] ?? '',
    }),
    [selected],
  );

  if (!selected || selected.id !== id) {
    return <Loader label="Loading procurement request..." />;
  }

  const handleUpdateRequest = (values) => {
    dispatch(
      updateProcurementRequest({
        id: selected.id,
        ...values,
      }),
    );
    setIsEditing(false);
    setSaveMessage('Procurement request updated successfully.');
  };

  return (
    <>
      <PageHeader
        title={selected.title}
        subtitle={`Request ${selected.id} overview, attachments, approvals, and audit logs.`}
        actionLabel={isEditing ? 'Close Editor' : 'Edit Request'}
        onAction={() => {
          setIsEditing((current) => !current);
          setSaveMessage('');
        }}
      />
      {saveMessage ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          {saveMessage}
        </Alert>
      ) : null}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              {isEditing ? (
                <Stack spacing={2}>
                  <Typography variant="h6">Edit Overview</Typography>
                  <ProcurementRequestForm
                    initialValues={formValues}
                    submitLabel="Save Changes"
                    onSubmit={handleUpdateRequest}
                    onCancel={() => setIsEditing(false)}
                  />
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Typography variant="h6">Overview</Typography>
                  <Typography>Department: {selected.department}</Typography>
                  <Typography>Owner: {selected.owner}</Typography>
                  <Typography>Vendor: {selected.vendor}</Typography>
                  <Typography>Amount: Rs {selected.amount.toLocaleString()}</Typography>
                  <Typography>Submitted On: {selected.submittedOn}</Typography>
                  <Chip label={selected.status} color="primary" sx={{ width: 'fit-content' }} />
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
        {[
          ['Attachments', selected.attachments],
          ['Approval History', selected.approvalHistory],
          ['Comments', selected.comments],
          ['Audit Logs', selected.auditLogs],
        ].map(([title, values]) => (
          <Grid key={title} size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {title}
                </Typography>
                <List dense>
                  {values.map((value) => (
                    <ListItem key={value} divider>
                      <ListItemText primary={value} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
