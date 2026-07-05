import reports from '../mocks/reports.json';
import requests from '../mocks/requests.json';
import vendors from '../mocks/vendors.json';
import { simulateRequest } from '../utils/mockApi';

const reportMap = {
  Procurement: requests,
  Vendor: vendors,
  Audit: reports,
  Risk: requests.map((item) => ({ id: item.id, status: item.status, priority: item.priority })),
};

export function fetchReports() {
  return simulateRequest(reports);
}

export function getReportDataset(type) {
  return simulateRequest(reportMap[type] ?? reports);
}
