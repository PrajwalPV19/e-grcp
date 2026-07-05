import { Box, Paper, Stack, Typography } from '@mui/material';

export default function AuthShell({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        background:
          'linear-gradient(135deg, rgba(0,90,156,0.95), rgba(20,122,150,0.92)), radial-gradient(circle at top right, #59c4ff, transparent 35%)',
      }}
    >
      <Paper sx={{ width: '100%', maxWidth: 440, p: 4 }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4">{title}</Typography>
          <Typography color="text.secondary">{subtitle}</Typography>
        </Stack>
        {children}
      </Paper>
    </Box>
  );
}
