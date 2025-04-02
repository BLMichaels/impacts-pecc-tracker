import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
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
  Chip,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useUserStorage } from '../utils/storage';
import type { Milestone } from '../utils/storage';

type NewMilestone = Omit<Milestone, 'id' | 'completed' | 'category'>;

const categoryLabels: Record<Milestone['category'], string> = {
  initial: 'Initial Setup',
  ongoing: 'Ongoing Monthly Activities',
  prs: 'Pediatric Readiness Score',
  equipment: 'Equipment & Supplies',
  'patient-safety': 'Patient Safety',
  staffing: 'Staffing & Training',
  policies: 'Policies & Procedures',
  qi: 'Quality Improvement'
};

const MilestonesPage: React.FC = () => {
  const { getData, saveData } = useUserStorage();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [open, setOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState<NewMilestone>({
    title: '',
    description: '',
    links: [],
    subItems: []
  });

  useEffect(() => {
    const data = getData();
    console.log('Loaded milestones:', data.milestones);
    setMilestones(data.milestones);
  }, [getData]);

  const handleToggle = (id: number) => {
    const updatedMilestones = milestones.map(milestone =>
      milestone.id === id
        ? { ...milestone, completed: !milestone.completed }
        : milestone
    );
    setMilestones(updatedMilestones);
    saveData({ milestones: updatedMilestones });
  };

  const handleAddMilestone = () => {
    const newId = Math.max(...milestones.map(m => m.id), 0) + 1;
    const milestoneToAdd: Milestone = {
      ...newMilestone,
      id: newId,
      completed: false,
      category: 'initial' // Default category
    };
    const updatedMilestones = [...milestones, milestoneToAdd];
    setMilestones(updatedMilestones);
    saveData({ milestones: updatedMilestones });
    setOpen(false);
    setNewMilestone({
      title: '',
      description: '',
      links: [],
      subItems: []
    });
  };

  const groupedMilestones = milestones.reduce((acc, milestone) => {
    if (!acc[milestone.category]) {
      acc[milestone.category] = [];
    }
    acc[milestone.category].push(milestone);
    return acc;
  }, {} as Record<Milestone['category'], Milestone[]>);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        PECC Milestones
      </Typography>

      {Object.entries(groupedMilestones).map(([category, categoryMilestones]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            {categoryLabels[category as Milestone['category']]}
          </Typography>
          <Paper sx={{ p: 2 }}>
            <List>
              {categoryMilestones.map((milestone) => (
                <React.Fragment key={milestone.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={milestone.completed}
                                onChange={() => handleToggle(milestone.id)}
                                color="primary"
                              />
                            }
                            label=""
                          />
                          <Typography variant="subtitle1">
                            {milestone.title}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {milestone.description}
                          </Typography>
                          {milestone.subItems && milestone.subItems.length > 0 && (
                            <List sx={{ pl: 2 }}>
                              {milestone.subItems.map((item, index) => (
                                <ListItem key={index} sx={{ py: 0 }}>
                                  <ListItemText
                                    primary={
                                      <Typography variant="body2" color="text.secondary">
                                        • {item}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          )}
                          {milestone.links && milestone.links.length > 0 && (
                            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                              {milestone.links.map((link, index) => {
                                console.log('Rendering link:', link);
                                return (
                                  <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none' }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      window.open(link.url, '_blank');
                                    }}
                                  >
                                    <Chip
                                      label={link.text}
                                      color="primary"
                                      variant="outlined"
                                      clickable
                                    />
                                  </a>
                                );
                              })}
                            </Stack>
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
        </Box>
      ))}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        Add Milestone
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Milestone</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newMilestone.title}
            onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newMilestone.description}
            onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddMilestone} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MilestonesPage; 