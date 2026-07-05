import notifications from '../mocks/notifications.json';
import { simulateRequest } from '../utils/mockApi';

export function fetchNotifications() {
  return simulateRequest(notifications);
}
