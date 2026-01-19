import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Code as ComponentsIcon,
  TouchApp as InteractionIcon,
  Update as EffectsIcon,
  Input as FormsIcon,
  Layers as ContextIcon,
  Bolt as HooksIcon,
  Cloud as ApiIcon
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

interface MenuItem {
  text: string;
  path: string;
  icon: React.ReactElement;
  description: string;
}

// 菜单配置
// Menu configuration
const menuItems: MenuItem[] = [
  { text: 'Home (首页)', path: '/', icon: <HomeIcon />, description: 'Welcome' },
  { text: '1. Basics (基础)', path: '/basics', icon: <ComponentsIcon />, description: 'Components & Props' },
  { text: '2. State (状态)', path: '/state', icon: <InteractionIcon />, description: 'useState & Events' },
  { text: '3. Effects (副作用)', path: '/effects', icon: <EffectsIcon />, description: 'useEffect' },
  { text: '4. Forms (表单)', path: '/forms', icon: <FormsIcon />, description: 'Inputs & Validation' },
  { text: '5. Context (上下文)', path: '/context', icon: <ContextIcon />, description: 'Global State' },
  { text: '6. Hooks (高级钩子)', path: '/hooks', icon: <HooksIcon />, description: 'Advanced Logic' },
  { text: '7. API (接口)', path: '/api', icon: <ApiIcon />, description: 'Fetching Data' },
];

/**
 * Layout Component (布局组件)
 * 
 * This component acts as the "shell" of our application. It provides the persistent
 * navigation (Drawer) and header (AppBar) that stays visible while the content changes.
 * 
 * 这个组件是应用程序的“外壳”。它提供了持久的导航（侧边栏）和头部（顶栏），
 * 当内容改变时，它们保持可见。
 */
export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          React Learning
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false); // Close drawer on mobile after click
              }}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'inherit',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'inherit' : 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                secondary={item.description}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: location.pathname === item.path ? 700 : 500
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                  color: location.pathname === item.path ? 'inherit' : 'text.secondary'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar: The top navigation bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            React Developer Course
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Box: The navigation drawer container */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer (Temporary) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer (Permanent) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar /> {/* Spacer to push content below AppBar */}

        {/* Outlet: This is where the routed pages will be rendered */}
        {/* Outlet: 路由页面将在这里渲染 */}
        <Outlet />
      </Box>
    </Box>
  );
}
