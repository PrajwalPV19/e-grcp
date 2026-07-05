import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loader({ label = 'Loading data...' }) {
  return (
    <Box sx={{ minHeight: 240, display: 'grid', placeItems: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }} color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Box>
  );
}
