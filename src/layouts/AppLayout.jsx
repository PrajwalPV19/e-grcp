import { useMemo, useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GavelIcon from '@mui/icons-material/Gavel';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ApprovalIcon from '@mui/icons-material/Approval';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { toggleTheme } from '../features/ui/uiSlice';
import { selectVisibleNavigation } from '../utils/appConfig';

const drawerWidth = 280;

const iconMap = {
  dashboard: <DashboardIcon />,
  procurement: <ShoppingCartIcon />,
  vendors: <ApartmentIcon />,
  risk: <WarningAmberIcon />,
  compliance: <GavelIcon />,
  audit: <FactCheckIcon />,
  approvals: <ApprovalIcon />,
  reports: <AssessmentIcon />,
  notifications: <NotificationsIcon />,
  settings: <SettingsIcon />,
};

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const unreadCount = useSelector((state) => {
    const items = Array.isArray(state.notifications.items) ? state.notifications.items : [];
    return items.filter((item) => !item.read).length;
  });
  const mode = useSelector((state) => state.ui.themeMode);
  const navigation = useMemo(() => selectVisibleNavigation(user?.role), [user?.role]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">e-GRCP</Typography>
        <Typography variant="body2" color="text.secondary">
          Enterprise control tower
        </Typography>
      </Box>
      <List sx={{ px: 2, flexGrow: 1 }}>
        {navigation.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            selected={location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)}
            onClick={() => setMobileOpen(false)}
            sx={{ mb: 1, borderRadius: 3 }}
          >
            <ListItemIcon>{iconMap[item.icon]}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 3 }}>
          <ListItemText primary="Sign out" secondary={user?.name} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` } }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              px: 2,
              py: 1,
              borderRadius: 99,
              bgcolor: 'background.default',
              flexGrow: 1,
              maxWidth: 460,
            }}
          >
            <SearchIcon fontSize="small" />
            <InputBase sx={{ ml: 1, flexGrow: 1 }} placeholder="Global search" />
          </Stack>
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton component={NavLink} to="/notifications">
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Avatar>{user?.name?.[0] ?? 'U'}</Avatar>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="body2">{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.role}
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
