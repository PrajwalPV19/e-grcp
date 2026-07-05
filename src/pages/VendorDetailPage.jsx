import { useEffect } from 'react';
import { Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadVendorDetail } from '../features/vendor/vendorSlice';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import StatusChip from '../components/StatusChip';

export default function VendorDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(loadVendorDetail(id));
  }, [dispatch, id]);

  if (!selected || selected.id !== id) {
    return <Loader label="Loading vendor profile..." />;
  }

  return (
    <>
      <PageHeader title={selected.name} subtitle="Vendor profile, compliance documents, risk information, and history." />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Basic Details
              </Typography>
              <Typography>ID: {selected.id}</Typography>
              <Typography>Country: {selected.country}</Typography>
              <Typography>Owner: {selected.owner}</Typography>
              <Typography>Spend: ₹{selected.spend.toLocaleString()}</Typography>
              <Typography sx={{ mt: 2 }}>Status</Typography>
              <StatusChip label={selected.status} />
              <Typography sx={{ mt: 2 }}>Risk</Typography>
              <StatusChip label={selected.riskLevel} />
            </CardContent>
          </Card>
        </Grid>
        {[
          ['Contacts', selected.contacts],
          ['Documents', selected.documents],
          ['History', selected.history],
        ].map(([title, values]) => (
          <Grid key={title} size={{ xs: 12, lg: 7 }}>
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
