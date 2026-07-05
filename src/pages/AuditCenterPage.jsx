import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import { loadAuditLogs } from '../features/audit/auditSlice';
import { useAsyncData } from '../hooks/useAsyncData';

export default function AuditCenterPage() {
  const { items, status } = useSelector((state) => state.audit);
  useAsyncData(status, loadAuditLogs);

  const columns = useMemo(
    () => [
      { key: 'id', header: 'Log ID' },
      { key: 'actor', header: 'Actor' },
      { key: 'action', header: 'Action' },
      { key: 'module', header: 'Module' },
      { key: 'timestamp', header: 'Timestamp' },
    ],
    [],
  );

  if (status === 'loading' || status === 'idle') {
    return <Loader label="Loading audit center..." />;
  }

  return (
    <>
      <PageHeader title="Audit Center" subtitle="Approval history, user activity, and system logs for auditors." />
      <DataTable
        columns={columns}
        rows={items}
        page={0}
        rowsPerPage={5}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </>
  );
}
