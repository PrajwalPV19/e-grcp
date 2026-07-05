import React from 'react';
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Global UI error boundary', error);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
          <Paper sx={{ maxWidth: 520, p: 4 }}>
            <Stack spacing={2}>
              <Typography variant="h5">Something went wrong</Typography>
              <Alert severity="error">
                The application hit an unexpected error. Refresh to recover the session.
              </Alert>
              <Button variant="contained" onClick={this.handleRefresh}>
                Refresh Application
              </Button>
            </Stack>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
