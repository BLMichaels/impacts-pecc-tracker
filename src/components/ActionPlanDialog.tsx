import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography
} from '@mui/material';

export interface ActionPlan {
  action: string;
  owner: string;
  status: 'In Progress' | 'Needs Update' | 'Need to Develop' | 'Cannot Be Done at This Time';
  priority: 'High Importance & High Urgency (Do Now)' | 'High Importance & Low Urgency (Do Next)' | 'Low Importance & High Urgency (Do Later)' | 'Low Importance & Low Urgency (Do Last)';
  difficulty: 'Low Impact & Low Effort (Filler Tasks)' | 'Low Impact & High Effort (Hard Slogs)' | 'High Impact & Low Effort (Quick Wins)' | 'High Impact & High Effort (Big Projects)';
  dueDate: string;
  notes: string;
}

interface ActionPlanDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (actionPlan: ActionPlan) => void;
  question: string;
}

const ActionPlanDialog: React.FC<ActionPlanDialogProps> = ({
  open,
  onClose,
  onSave,
  question
}) => {
  const [actionPlan, setActionPlan] = useState<ActionPlan>({
    action: '',
    owner: '',
    status: 'Need to Develop',
    priority: 'High Importance & High Urgency (Do Now)',
    difficulty: 'High Impact & Low Effort (Quick Wins)',
    dueDate: '',
    notes: ''
  });

  const handleChange = (field: keyof ActionPlan) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setActionPlan(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    onSave(actionPlan);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Gap Reduction Action Plan</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Question: {question}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="What is the action/plan to resolve?"
            fullWidth
            multiline
            rows={2}
            value={actionPlan.action}
            onChange={handleChange('action')}
          />
          <TextField
            label="Owner"
            fullWidth
            value={actionPlan.owner}
            onChange={handleChange('owner')}
          />
          <TextField
            select
            label="Status"
            fullWidth
            value={actionPlan.status}
            onChange={handleChange('status')}
          >
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Needs Update">Needs Update</MenuItem>
            <MenuItem value="Need to Develop">Need to Develop</MenuItem>
            <MenuItem value="Cannot Be Done at This Time">Cannot Be Done at This Time</MenuItem>
          </TextField>
          <TextField
            select
            label="Priority: Importance vs Urgency"
            fullWidth
            value={actionPlan.priority}
            onChange={handleChange('priority')}
          >
            <MenuItem value="High Importance & High Urgency (Do Now)">High Importance & High Urgency (Do Now)</MenuItem>
            <MenuItem value="High Importance & Low Urgency (Do Next)">High Importance & Low Urgency (Do Next)</MenuItem>
            <MenuItem value="Low Importance & High Urgency (Do Later)">Low Importance & High Urgency (Do Later)</MenuItem>
            <MenuItem value="Low Importance & Low Urgency (Do Last)">Low Importance & Low Urgency (Do Last)</MenuItem>
          </TextField>
          <TextField
            select
            label="Difficulty (Impact vs Effort)"
            fullWidth
            value={actionPlan.difficulty}
            onChange={handleChange('difficulty')}
          >
            <MenuItem value="Low Impact & Low Effort (Filler Tasks)">Low Impact & Low Effort (Filler Tasks)</MenuItem>
            <MenuItem value="Low Impact & High Effort (Hard Slogs)">Low Impact & High Effort (Hard Slogs)</MenuItem>
            <MenuItem value="High Impact & Low Effort (Quick Wins)">High Impact & Low Effort (Quick Wins)</MenuItem>
            <MenuItem value="High Impact & High Effort (Big Projects)">High Impact & High Effort (Big Projects)</MenuItem>
          </TextField>
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            value={actionPlan.dueDate}
            onChange={handleChange('dueDate')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={4}
            value={actionPlan.notes}
            onChange={handleChange('notes')}
            placeholder="Progress? Where did you get this information?"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Action Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionPlanDialog; 