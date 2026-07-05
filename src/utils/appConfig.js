export const rolePermissions = {
  all: ['Employee', 'Procurement Manager', 'Compliance Officer', 'Auditor', 'Administrator'],
  review: ['Procurement Manager', 'Compliance Officer', 'Auditor', 'Administrator'],
  admin: ['Administrator'],
};

export const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard', roles: rolePermissions.all },
  { path: '/procurement', label: 'Procurement', icon: 'procurement', roles: rolePermissions.all },
  { path: '/vendors', label: 'Vendors', icon: 'vendors', roles: rolePermissions.review },
  { path: '/risk', label: 'Risk', icon: 'risk', roles: rolePermissions.review },
  { path: '/compliance', label: 'Compliance', icon: 'compliance', roles: rolePermissions.review },
  { path: '/audit', label: 'Audit', icon: 'audit', roles: rolePermissions.review },
  { path: '/approvals', label: 'Approvals', icon: 'approvals', roles: rolePermissions.review },
  { path: '/reports', label: 'Reports', icon: 'reports', roles: rolePermissions.review },
  { path: '/notifications', label: 'Notifications', icon: 'notifications', roles: rolePermissions.all },
  { path: '/settings', label: 'Settings', icon: 'settings', roles: rolePermissions.all },
];

export function selectVisibleNavigation(role) {
  return navigationItems.filter((item) => item.roles.includes(role));
}
