import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {
  Home as HomeIcon,
  LocalHospital as LocalHospitalIcon,
  Assessment as AssessmentIcon,
  ListAlt as ListAltIcon,
  Flag as FlagIcon
} from '@mui/icons-material';

// Components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MilestonesPage from './pages/MilestonesPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ReadinessAssessmentPage from './pages/ReadinessAssessmentPage';
import HospitalInfoPage from './pages/HospitalInfoPage';
import RequireAuth from './components/RequireAuth';

// Context
import { AuthProvider } from './context/AuthContext';

const drawerWidth = 240;

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                  ImPACTS PECC Tracker - v2
                </Typography>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: 'auto' }}>
                <List>
                  <ListItem button component={Link} to="/">
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button component={Link} to="/hospital-info">
                    <ListItemIcon>
                      <LocalHospitalIcon />
                    </ListItemIcon>
                    <ListItemText primary="Hospital Information" />
                  </ListItem>
                  <ListItem button component={Link} to="/readiness-assessment">
                    <ListItemIcon>
                      <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Readiness Assessment" />
                  </ListItem>
                  <ListItem button component={Link} to="/activities">
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Activities" />
                  </ListItem>
                  <ListItem button component={Link} to="/milestones">
                    <ListItemIcon>
                      <FlagIcon />
                    </ListItemIcon>
                    <ListItemText primary="Milestones" />
                  </ListItem>
                </List>
              </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/activities"
                  element={
                    <RequireAuth>
                      <ActivitiesPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/milestones"
                  element={
                    <RequireAuth>
                      <MilestonesPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/readiness-assessment"
                  element={
                    <RequireAuth>
                      <ReadinessAssessmentPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/hospital-info"
                  element={
                    <RequireAuth>
                      <HospitalInfoPage />
                    </RequireAuth>
                  }
                />
              </Routes>
            </Box>
          </Box>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
