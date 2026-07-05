import dashboard from '../mocks/dashboard.json';
import { simulateRequest } from '../utils/mockApi';

export function fetchDashboard() {
  return simulateRequest(dashboard);
}
