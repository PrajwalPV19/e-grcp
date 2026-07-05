import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import Loader from '../components/Loader';
import PageHeader from '../components/PageHeader';
import StatusChip from '../components/StatusChip';
import { loadCompliance } from '../features/compliance/complianceSlice';
import { useAsyncData } from '../hooks/useAsyncData';

export default function ComplianceCenterPage() {
  const { items, status } = useSelector((state) => state.compliance);
  useAsyncData(status, loadCompliance);

  const columns = useMemo(
    () => [
      { key: 'area', header: 'Compliance Area' },
      { key: 'status', header: 'Status', render: (value) => <StatusChip label={value} /> },
      { key: 'issue', header: 'Issue' },
      { key: 'owner', header: 'Owner' },
    ],
    [],
  );

  if (status === 'loading' || status === 'idle') {
    return <Loader label="Loading compliance center..." />;
  }

  return (
    <>
      <PageHeader
        title="Compliance Center"
        subtitle="Track violations, missing documents, and expired certifications in one place."
      />
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
