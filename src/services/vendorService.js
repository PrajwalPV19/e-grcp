import vendors from '../mocks/vendors.json';
import { simulateRequest } from '../utils/mockApi';

export function fetchVendors() {
  return simulateRequest(vendors);
}

export function fetchVendorById(id) {
  const vendor = vendors.find((item) => item.id === id);
  if (!vendor) {
    throw new Error('Vendor not found');
  }

  return simulateRequest({
    ...vendor,
    contacts: ['operations@vendor.com', '+91 98765 43210'],
    documents: ['MSA.pdf', 'Insurance_Certificate.pdf'],
    history: ['Onboarded in 2023', 'Risk review reopened in 2026'],
  });
}
