import { Button, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { number, object, string } from 'yup';

const procurementSchema = object({
  title: string().required('Title is required'),
  department: string().required('Department is required'),
  owner: string().required('Owner is required'),
  vendor: string().required('Vendor is required'),
  amount: number()
    .typeError('Amount must be a number')
    .positive('Amount must be greater than zero')
    .required('Amount is required'),
  priority: string().oneOf(['Low', 'Medium', 'High']).required('Priority is required'),
  status: string().oneOf(['Pending', 'Approved', 'Rejected', 'Escalated']).required('Status is required'),
  justification: string().required('Justification is required'),
});

const defaultValues = {
  title: '',
  department: '',
  owner: '',
  vendor: '',
  amount: '',
  priority: 'Medium',
  status: 'Pending',
  justification: '',
};

export default function ProcurementRequestForm({
  initialValues = defaultValues,
  submitLabel,
  onSubmit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(procurementSchema),
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  useEffect(() => {
    reset({
      ...defaultValues,
      ...initialValues,
    });
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Request Title"
              {...register('title')}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Department"
              {...register('department')}
              error={Boolean(errors.department)}
              helperText={errors.department?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Request Owner"
              {...register('owner')}
              error={Boolean(errors.owner)}
              helperText={errors.owner?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Vendor"
              {...register('vendor')}
              error={Boolean(errors.vendor)}
              helperText={errors.vendor?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              {...register('amount')}
              error={Boolean(errors.amount)}
              helperText={errors.amount?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Priority"
              defaultValue={initialValues.priority ?? defaultValues.priority}
              {...register('priority')}
              error={Boolean(errors.priority)}
              helperText={errors.priority?.message}
            >
              {['Low', 'Medium', 'High'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Status"
              defaultValue={initialValues.status ?? defaultValues.status}
              {...register('status')}
              error={Boolean(errors.status)}
              helperText={errors.status?.message}
            >
              {['Pending', 'Approved', 'Rejected', 'Escalated'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Business Justification"
              {...register('justification')}
              error={Boolean(errors.justification)}
              helperText={errors.justification?.message}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
          {onCancel ? (
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {submitLabel}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
