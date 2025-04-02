import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useUserStorage } from '../utils/storage';
import type { Activity } from '../utils/storage';

type NewActivity = Omit<Activity, 'id'>;

const activityCategories = [
  { value: 'general-admin', label: 'General Administration Tasks' },
  { value: 'pecc-education', label: 'PECC role education and advancement' },
  { value: 'mentor-meeting', label: 'Meeting with Pediatric Readiness Mentor' },
  { value: 'sim-prep', label: 'Simulation Case Preparations' },
  { value: 'sim-facilitation', label: 'Simulation Facilitation' },
  { value: 'hospital-ed', label: 'Hospital-based Pediatric Educational Activities (NOT including simulation)' },
  { value: 'policies', label: 'Ensuring all Pediatric Policies and Procedures are implemented and updated' },
  { value: 'qi-pi', label: 'Facilitating and participating in ED pediatric QI/PI activities' },
  { value: 'collaborative', label: 'Collaborative work with PECC counterpart, EMS, or other EDs' },
  { value: 'staffing', label: 'Staffing competency evaluations' },
  { value: 'disaster', label: 'Promoting pediatric disaster preparedness' },
  { value: 'injury-prevention', label: 'Promoting patient and family education in injury prevention' },
  { value: 'equipment', label: 'Ensuring equipment, medication, and supplies are available to all ED staff' },
  { value: 'special-needs', label: 'Ensuring ED staff are prepared to care for all children, including those with special health needs' }
] as const;

const simulationTypes = [
  'Agitation',
  'Altered Mental Status',
  'Anaphylaxis',
  'Asthma/Child with a Wheeze',
  'Bronchiolitis/Respiratory Distress',
  'Newborn Resuscitation',
  'Pediatric Trauma/Abdominal',
  'Postpartum Hemmorhage',
  'Scald Burn',
  'Seizing Child',
  'Seizing Infant',
  'Severe Head Trauma',
  'Sick Neonate',
  'Vomiting Infant',
  'Other'
] as const;

const ActivitiesPage: React.FC = () => {
  const { getData, saveData } = useUserStorage();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [open, setOpen] = useState(false);
  const [newActivity, setNewActivity] = useState<NewActivity>({
    date: new Date().toISOString().split('T')[0],
    title: '',
    category: 'general-admin',
    hours: 0,
    simulationType: '',
    simulationParticipants: 0,
    feedbackSubmitted: false,
    notes: ''
  });

  useEffect(() => {
    const data = getData();
    setActivities(data.activities);
  }, [getData]);

  const handleAddActivity = () => {
    const newId = Math.max(...activities.map(a => a.id), 0) + 1;
    const activityToAdd: Activity = {
      ...newActivity,
      id: newId
    };
    const updatedActivities = [...activities, activityToAdd];
    setActivities(updatedActivities);
    saveData({ activities: updatedActivities });
    setOpen(false);
    setNewActivity({
      date: new Date().toISOString().split('T')[0],
      title: '',
      category: 'general-admin',
      hours: 0,
      simulationType: '',
      simulationParticipants: 0,
      feedbackSubmitted: false,
      notes: ''
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Activity Log
      </Typography>

      <Paper sx={{ p: 2 }}>
        <List>
          {activities.map((activity) => (
            <React.Fragment key={activity.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="subtitle1" sx={{ minWidth: 150 }}>
                        {formatDate(activity.date)}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ flex: 1 }}>
                        {activity.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                        {activityCategories.find(cat => cat.value === activity.category)?.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                        {activity.hours} hours
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      {activity.simulationType && (
                        <Typography variant="body2" color="text.secondary">
                          Simulation: {activity.simulationType}
                        </Typography>
                      )}
                      {activity.simulationParticipants && (
                        <Typography variant="body2" color="text.secondary">
                          Participants: {activity.simulationParticipants}
                        </Typography>
                      )}
                      {activity.feedbackSubmitted !== undefined && (
                        <Typography variant="body2" color="text.secondary">
                          Feedback Forms: {activity.feedbackSubmitted ? 'Submitted' : 'Not Submitted'}
                        </Typography>
                      )}
                      {activity.notes && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Notes: {activity.notes}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        Add Activity
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Activity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                value={newActivity.date}
                onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Activity Title"
                fullWidth
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newActivity.category}
                  label="Category"
                  onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value as Activity['category'] })}
                >
                  {activityCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Hours"
                type="number"
                fullWidth
                value={newActivity.hours}
                onChange={(e) => setNewActivity({ ...newActivity, hours: Number(e.target.value) })}
                InputProps={{ inputProps: { min: 0, step: 0.5 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Simulation Type</InputLabel>
                <Select
                  value={newActivity.simulationType}
                  label="Simulation Type"
                  onChange={(e) => setNewActivity({ ...newActivity, simulationType: e.target.value })}
                >
                  {simulationTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Simulation Participants"
                type="number"
                fullWidth
                value={newActivity.simulationParticipants}
                onChange={(e) => setNewActivity({ ...newActivity, simulationParticipants: Number(e.target.value) })}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newActivity.feedbackSubmitted}
                    onChange={(e) => setNewActivity({ ...newActivity, feedbackSubmitted: e.target.checked })}
                  />
                }
                label="Feedback Forms Submitted"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={4}
                value={newActivity.notes}
                onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddActivity} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActivitiesPage; 