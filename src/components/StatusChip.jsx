import { Chip } from '@mui/material';

const statusMap = {
  Approved: 'success',
  Active: 'success',
  Compliant: 'success',
  Pending: 'warning',
  Review: 'warning',
  Medium: 'warning',
  Escalated: 'error',
  Rejected: 'error',
  High: 'error',
  Inactive: 'default',
};

export default function StatusChip({ label }) {
  return <Chip size="small" color={statusMap[label] ?? 'info'} label={label} />;
}
