import requests from '../mocks/requests.json';
import { simulateRequest } from '../utils/mockApi';

export function fetchProcurements() {
  return simulateRequest(requests);
}

export function fetchProcurementById(id) {
  const request = requests.find((item) => item.id === id);
  if (!request) {
    throw new Error('Procurement request not found');
  }

  return simulateRequest({
    ...request,
    attachments: ['SOW.pdf', 'Budget_Approval.xlsx'],
    approvalHistory: ['Submitted by employee', 'Validated by procurement desk'],
    comments: ['Urgent renewal required before month-end'],
    auditLogs: ['Created on portal', 'Viewed by manager'],
  });
}
