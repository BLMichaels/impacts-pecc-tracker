import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import type { ReadinessAssessment } from '../utils/storage';

const PDFExport: React.FC<{ assessment: ReadinessAssessment }> = ({ assessment }) => {
  if (!assessment) return null;

  return (
    <Button
      variant="contained"
      color="primary"
      disabled
      startIcon={<DownloadIcon />}
      sx={{ mt: 2 }}
    >
      PDF Export Coming Soon
    </Button>
  );
};

export default PDFExport; 