import { Alert, Button, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, ref, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/auth/authSlice';
import AuthShell from './AuthShell';

const schema = object({
  password: string().min(8, 'Minimum 8 characters').required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <AuthShell title="Reset password" subtitle="This demo route completes the password reset lifecycle.">
      <form onSubmit={handleSubmit(() => dispatch(resetPassword()))}>
        <Stack spacing={2}>
          {message ? <Alert severity="success">{message}</Alert> : null}
          <TextField
            label="New password"
            type="password"
            {...register('password')}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm password"
            type="password"
            {...register('confirmPassword')}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
          />
          <Button type="submit" variant="contained">
            Reset password
          </Button>
        </Stack>
      </form>
    </AuthShell>
  );
}
