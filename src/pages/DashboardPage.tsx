import React from 'react';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Assignment, History, Assessment } from '@mui/icons-material';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const DashboardCard = ({ title, description, icon, path }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
  }) => (
    <Paper 
      sx={{ 
        p: 3, 
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
      onClick={() => navigate(path)}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography sx={{ mb: 2 }}>
        {description}
      </Typography>
      <Button variant="contained" color="primary" fullWidth>
        View Details
      </Button>
    </Paper>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DashboardCard
            title="PECC Milestones"
            description="Track and manage your PECC milestones. View progress, update status, and add new milestones."
            icon={<Assignment fontSize="large" color="primary" />}
            path="/milestones"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardCard
            title="Recent Activities"
            description="View and log your recent activities. Keep track of your progress and achievements."
            icon={<History fontSize="large" color="primary" />}
            path="/activities"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardCard
            title="Pediatric Readiness Survey"
            description="Complete and update your facility's pediatric readiness assessment. Track your hospital's preparedness for pediatric emergencies."
            icon={<Assessment fontSize="large" color="primary" />}
            path="/readiness-assessment"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage; 