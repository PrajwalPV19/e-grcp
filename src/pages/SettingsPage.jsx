import { Alert, Button, FormControlLabel, Stack, Switch, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import PageHeader from '../components/PageHeader';

const schema = object({
  fullName: string().required('Full name is required'),
  email: string().email('Use a valid email').required('Email is required'),
});

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: 'Nisha Iyer',
      email: 'admin@egrcp.com',
    },
  });

  return (
    <>
      <PageHeader title="User Settings" subtitle="Profile, theme, preferences, and security controls." />
      <form onSubmit={handleSubmit(() => undefined)}>
        <Stack spacing={2} sx={{ maxWidth: 520 }}>
          {isSubmitSuccessful ? <Alert severity="success">Preferences saved successfully.</Alert> : null}
          <TextField
            label="Full name"
            {...register('fullName')}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
          />
          <TextField
            label="Email"
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <FormControlLabel control={<Switch defaultChecked />} label="Enable audit notifications" />
          <FormControlLabel control={<Switch />} label="Require session expiry warnings" />
          <Button type="submit" variant="contained">
            Save settings
          </Button>
        </Stack>
      </form>
    </>
  );
}
