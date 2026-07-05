import { useAsyncData } from '../hooks/useAsyncData';
import { loadNotifications, markAsRead } from '../features/notifications/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';

export default function NotificationCenterPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.notifications);
  useAsyncData(status, loadNotifications);

  if (status === 'loading' || status === 'idle') {
    return <Loader label="Loading notifications..." />;
  }

  return (
    <>
      <PageHeader title="Notification Center" subtitle="Track real-time alerts, priority issues, and read status." />
      <Stack spacing={2}>
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                sx={{ justifyContent: 'space-between' }}
              >
                <div>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography color="text.secondary">{item.message}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(item.timestamp).toLocaleString()}
                  </Typography>
                </div>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Chip label={item.priority} color={item.priority === 'High' ? 'error' : 'primary'} />
                  <Chip label={item.read ? 'Read' : 'Unread'} variant="outlined" />
                  {!item.read ? (
                    <Button onClick={() => dispatch(markAsRead(item.id))}>Mark as read</Button>
                  ) : null}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
}
