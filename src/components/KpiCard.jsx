import { memo } from 'react';
import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';

const KpiCard = memo(function KpiCard({ title, value, delta, tone = 'primary' }) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {value}
            </Typography>
          </div>
          <Chip
            size="small"
            color={tone}
            variant="outlined"
            label={delta}
            sx={{ fontWeight: 600 }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
});

export default KpiCard;
