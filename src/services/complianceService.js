import complianceData from '../mocks/compliance.json';
import { simulateRequest } from '../utils/mockApi';

export function fetchComplianceRecords() {
  return simulateRequest(complianceData);
}
