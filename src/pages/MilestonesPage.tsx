import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import { useUserStorage } from '../../src/utils/storage';
import type { Milestone } from '../../src/utils/storage';

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

  const groupedMilestones = milestones.reduce<Record<Milestone['category'], Milestone[]>>((acc, milestone) => {
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

      {(Object.entries(groupedMilestones) as [Milestone['category'], Milestone[]][]).map(([category, categoryMilestones]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            {categoryLabels[category]}
          </Typography>
          <Paper sx={{ p: 2 }}>
            <List>
              {categoryMilestones.map((milestone: Milestone) => (
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
                              {milestone.subItems.map((item: string, index: number) => (
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
                              {milestone.links.map((link: { text: string; url: string }, index: number) => {
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
    </Box>
  );
};

export default MilestonesPage; 