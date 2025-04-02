import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate(user ? '/dashboard' : '/')}
        >
          ImPACTS PECC Tracker
        </Typography>
        <Box>
          {user ? (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/dashboard')}
                sx={{ backgroundColor: isActive('/dashboard') ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }}
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/milestones')}
                sx={{ backgroundColor: isActive('/milestones') ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }}
              >
                Milestones
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/activities')}
                sx={{ backgroundColor: isActive('/activities') ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }}
              >
                Activities
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/readiness-assessment')}
                sx={{ backgroundColor: isActive('/readiness-assessment') ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }}
              >
                Readiness Assessment
              </Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 