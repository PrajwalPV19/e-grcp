import { Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Stack spacing={2} sx={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h3">404</Typography>
      <Typography color="text.secondary">The requested workspace could not be found.</Typography>
      <Button component={RouterLink} to="/dashboard" variant="contained">
        Back to dashboard
      </Button>
    </Stack>
  );
}
