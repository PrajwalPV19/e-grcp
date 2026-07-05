import { Alert, Button, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../features/auth/authSlice';
import AuthShell from './AuthShell';

const schema = object({
  email: string().email('Use a valid email').required('Email is required'),
});

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <AuthShell title="Forgot password" subtitle="We simulate the reset workflow using mock email delivery.">
      <form onSubmit={handleSubmit((values) => dispatch(forgotPassword(values.email)))}>
        <Stack spacing={2}>
          {message ? <Alert severity="success">{message}</Alert> : null}
          {error ? <Alert severity="error">{error}</Alert> : null}
          <TextField
            label="Work email"
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <Button type="submit" variant="contained">
            Send reset link
          </Button>
        </Stack>
      </form>
    </AuthShell>
  );
}
