import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../routes/AppRouter';
import ErrorBoundary from '../components/ErrorBoundary';
import { useAppTheme } from './theme';

export default function App() {
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
