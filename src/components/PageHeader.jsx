import { Box, Button, Stack, Typography } from '@mui/material';

export default function PageHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      sx={{
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        mb: 3,
      }}
    >
      <Box>
        <Typography variant="h4">{title}</Typography>
        <Typography color="text.secondary">{subtitle}</Typography>
      </Box>
      {actionLabel ? (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Stack>
  );
}
