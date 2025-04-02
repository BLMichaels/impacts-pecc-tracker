import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  AppBar,
  Toolbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStorage } from '../utils/storage';
import type { ReadinessAssessment } from '../utils/storage';
import ReadinessAssessmentForm from '../components/ReadinessAssessmentForm';
import { useAuth } from '../context/AuthContext';

const ReadinessAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getData, saveData } = useUserStorage();
  const [assessment, setAssessment] = useState<ReadinessAssessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const loadAssessment = () => {
      try {
        const data = getData();
        setAssessment(data.readinessAssessment);
      } catch (err) {
        setError('Failed to load assessment data');
        console.error('Error loading assessment:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAssessment();
  }, [getData]);

  const handleChange = (newAssessment: ReadinessAssessment) => {
    setAssessment(newAssessment);
  };

  const handleSave = async () => {
    if (!assessment || !user?.email) {
      setError('Unable to save - no user logged in');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      saveData({ readinessAssessment: assessment });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save assessment. Please try again.');
      console.error('Error saving assessment:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!assessment) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">Failed to load assessment data</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Readiness Assessment
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={saving}
              color="primary"
            >
              {saving ? <CircularProgress size={24} /> : 'Save Assessment'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3 }}>
            <ReadinessAssessmentForm
              assessment={assessment}
              onChange={handleChange}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <CircularProgress size={24} /> : 'Save Assessment'}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)} variant="filled">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={() => setSaveSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSaveSuccess(false)} variant="filled">
          Assessment saved successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReadinessAssessmentPage; 