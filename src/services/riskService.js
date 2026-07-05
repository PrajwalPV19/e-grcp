import riskData from '../mocks/riskData.json';
import { simulateRequest } from '../utils/mockApi';

export function fetchRisks() {
  return simulateRequest(riskData);
}
