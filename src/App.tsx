import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Components
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MilestonesPage from './pages/MilestonesPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ReadinessAssessmentPage from './pages/ReadinessAssessmentPage';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

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

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Container>
            <Routes>
              <Route path="/" element={
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <h1>Welcome to ImPACTS PECC Tracker</h1>
                  <p>Please login or register to continue</p>
                </div>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/milestones" 
                element={
                  <ProtectedRoute>
                    <MilestonesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/activities" 
                element={
                  <ProtectedRoute>
                    <ActivitiesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/readiness-assessment" 
                element={
                  <ProtectedRoute>
                    <ReadinessAssessmentPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
