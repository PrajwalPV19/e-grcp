import { Alert, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthFeedback, loginUser } from '../features/auth/authSlice';
import AuthShell from './AuthShell';

const schema = object({
  email: string().email('Use a valid email').required('Email is required'),
  password: string().min(8, 'Minimum 8 characters').required('Password is required'),
});

const demoUsers = [
  'employee@egrcp.com',
  'manager@egrcp.com',
  'compliance@egrcp.com',
  'auditor@egrcp.com',
  'admin@egrcp.com',
];

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname ?? '/dashboard';
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'manager@egrcp.com',
      password: 'Password@123',
    },
  });

  const onSubmit = async (values) => {
    const result = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <AuthShell
      title="Sign in"
      subtitle="Use one of the trainer demo accounts to explore each role-based workflow."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {error ? (
            <Alert severity="error" onClose={() => dispatch(clearAuthFeedback())}>
              {error}
            </Alert>
          ) : null}
          <TextField
            select
            label="Demo account"
            defaultValue="manager@egrcp.com"
            onChange={(event) => {
              setValue('email', event.target.value, { shouldValidate: true });
            }}
          >
            {demoUsers.map((email) => (
              <MenuItem key={email} value={email}>
                {email}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Email"
            {...register('email')}
            autoComplete="username"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register('password')}
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <Button variant="contained" type="submit" disabled={status === 'loading'}>
            Sign in
          </Button>
          <Typography variant="body2" color="text.secondary">
            Demo password for all users: <strong>Password@123</strong>
          </Typography>
          <Typography component={RouterLink} to="/forgot-password" color="primary" sx={{ textDecoration: 'none' }}>
            Forgot password?
          </Typography>
        </Stack>
      </form>
    </AuthShell>
  );
}
