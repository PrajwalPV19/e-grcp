import auditData from '../mocks/audit.json';
import { simulateRequest } from '../utils/mockApi';

export function fetchAuditLogs() {
  return simulateRequest(auditData);
}
