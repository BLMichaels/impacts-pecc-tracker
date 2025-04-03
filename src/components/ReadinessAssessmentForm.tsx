import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  TextField,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { ReadinessAssessment } from '../utils/storage';
import ActionPlanDialog, { ActionPlan } from './ActionPlanDialog';

interface ReadinessAssessmentFormProps {
  assessment: ReadinessAssessment;
  onChange: (assessment: ReadinessAssessment) => void;
}

const ReadinessAssessmentForm: React.FC<ReadinessAssessmentFormProps> = ({ assessment, onChange }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [actionPlans, setActionPlans] = useState<Record<string, ActionPlan>>({});

  const handleChange = (path: string, value: any) => {
    const pathParts = path.split('.');
    const newAssessment = { ...assessment };
    let current: any = newAssessment;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }
    
    current[pathParts[pathParts.length - 1]] = value;
    onChange(newAssessment);
  };

  const handleActionPlanSave = (actionPlan: ActionPlan) => {
    if (selectedQuestion) {
      setActionPlans(prev => ({
        ...prev,
        [selectedQuestion]: actionPlan
      }));
      setSelectedQuestion(null);
    }
  };

  const renderYesNoQuestion = (question: string, number: string | number, value: boolean | undefined, onChange: (value: boolean | undefined) => void, isSubQuestion: boolean = false) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography sx={{ flex: 1, mr: 2 }}>
        {isSubQuestion ? `${number}.` : `${number}.`} {question}
      </Typography>
      <FormControl component="fieldset" sx={{ flexDirection: 'row', mr: 2 }}>
        <RadioGroup
          row
          value={value === undefined ? '' : value ? 'yes' : 'no'}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue === '') {
              onChange(undefined);
            } else if (newValue === 'yes') {
              onChange(true);
            } else if (newValue === 'no') {
              onChange(false);
            }
          }}
        >
          <FormControlLabel 
            value="yes" 
            control={
              <Radio 
                onClick={(e) => {
                  if (value === true) {
                    e.preventDefault();
                    onChange(undefined);
                  }
                }}
              />
            } 
            label="Yes" 
          />
          <FormControlLabel 
            value="no" 
            control={
              <Radio 
                onClick={(e) => {
                  if (value === false) {
                    e.preventDefault();
                    onChange(undefined);
                  }
                }}
              />
            } 
            label="No" 
          />
        </RadioGroup>
      </FormControl>
      <Tooltip title={actionPlans[question] ? "Edit Action Plan" : "Add Action Plan"}>
        <IconButton onClick={() => setSelectedQuestion(question)} size="small">
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderDropdownQuestion = (question: string, number: string | number, value: string, options: string[], onChange: (value: string) => void, isSubQuestion: boolean = false) => (
    <Box sx={{ mb: 2, ml: isSubQuestion ? 4 : 0 }}>
      <Typography variant="body1">
        {isSubQuestion ? `${number}.` : `${number}.`} {question}
      </Typography>
      <FormControl sx={{ minWidth: 200, mr: 2 }}>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip title={actionPlans[question] ? "Edit Action Plan" : "Add Action Plan"}>
        <IconButton onClick={() => setSelectedQuestion(question)} size="small">
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderTextQuestion = (question: string, number: string | number, value: string, onChange: (value: string) => void, isSubQuestion: boolean = false) => (
    <Box sx={{ mb: 2, ml: isSubQuestion ? 4 : 0 }}>
      <Typography variant="body1">
        {isSubQuestion ? `${number}.` : `${number}.`} {question}
      </Typography>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
      />
      <Tooltip title={actionPlans[question] ? "Edit Action Plan" : "Add Action Plan"}>
        <IconButton onClick={() => setSelectedQuestion(question)} size="small">
          <EditIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderCoordinatorSection = (title: string, coordinator: { hasCoordinator: boolean; type: string; hasDedicatedTime: boolean; scope: string }, index: number) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
      {renderYesNoQuestion('Has a coordinator been identified?', index, coordinator.hasCoordinator, (value) => handleChange(`${title.toLowerCase()}.hasCoordinator`, value))}
      {coordinator.hasCoordinator && (
        <>
          {renderDropdownQuestion('Type of coordinator', index + 1, coordinator.type, ['md-do', 'app', 'rn', 'np', 'none'], (value) => handleChange(`${title.toLowerCase()}.type`, value), true)}
          {renderYesNoQuestion('Has dedicated time for this role?', index + 2, coordinator.hasDedicatedTime, (value) => handleChange(`${title.toLowerCase()}.hasDedicatedTime`, value), true)}
          {renderDropdownQuestion('Scope of role', index + 3, coordinator.scope, ['single-hospital', 'multiple-hospitals'], (value) => handleChange(`${title.toLowerCase()}.scope`, value), true)}
        </>
      )}
    </Box>
  );

  const renderComponentsSection = (title: string, components: Record<string, boolean>, index: number) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
      {Object.entries(components).map(([key, value], i) => (
        renderYesNoQuestion(
          key.split(/(?=[A-Z])/).join(' ').replace(/^./, str => str.toUpperCase()),
          index + i,
          value || false,
          (newValue) => handleChange(`${title.toLowerCase()}.components.${key}`, newValue),
          true
        )
      ))}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Readiness Assessment</Typography>
      
      {/* Contact Info Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Contact Information</Typography>
        {renderTextQuestion('Name', 1, assessment.contactInfo.name, (value) => handleChange('contactInfo.name', value))}
        {renderTextQuestion('Title', 2, assessment.contactInfo.title, (value) => handleChange('contactInfo.title', value))}
        {renderTextQuestion('Phone', 3, assessment.contactInfo.phone, (value) => handleChange('contactInfo.phone', value))}
        {renderTextQuestion('Email', 4, assessment.contactInfo.email, (value) => handleChange('contactInfo.email', value))}
        {renderTextQuestion('Facility Name', 5, assessment.contactInfo.facilityName, (value) => handleChange('contactInfo.facilityName', value))}
        {renderTextQuestion('Facility Address', 6, assessment.contactInfo.facilityAddress, (value) => handleChange('contactInfo.facilityAddress', value))}
        {renderTextQuestion('City', 7, assessment.contactInfo.facilityCity, (value) => handleChange('contactInfo.facilityCity', value))}
        {renderTextQuestion('ZIP Code', 8, assessment.contactInfo.facilityZip, (value) => handleChange('contactInfo.facilityZip', value))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Facility Info Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Facility Information</Typography>
        {renderYesNoQuestion('24-Hour Emergency Department', 9, assessment.facilityInfo.has24HourED, (value) => handleChange('facilityInfo.has24HourED', value))}
        {renderDropdownQuestion('Hospital Type', 10, assessment.facilityInfo.hospitalType, ['general', 'childrens', 'other'], (value) => handleChange('facilityInfo.hospitalType', value))}
        {assessment.facilityInfo.hospitalType === 'other' && (
          renderTextQuestion('Other Hospital Type', '10a', assessment.facilityInfo.otherHospitalType || '', (value) => handleChange('facilityInfo.otherHospitalType', value), true)
        )}
        {renderDropdownQuestion('ED Configuration', 11, assessment.facilityInfo.edConfiguration, ['general', 'pediatric', 'mixed', 'other'], (value) => handleChange('facilityInfo.edConfiguration', value))}
        {assessment.facilityInfo.edConfiguration === 'other' && (
          renderTextQuestion('Other ED Configuration', '11a', assessment.facilityInfo.otherEDConfig || '', (value) => handleChange('facilityInfo.otherEDConfig', value), true)
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Trauma Designation Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Trauma Designation</Typography>
        {renderYesNoQuestion('Is your facility a trauma center?', 12, assessment.traumaDesignation.isTraumaCenter, (value) => handleChange('traumaDesignation.isTraumaCenter', value))}
        {assessment.traumaDesignation.isTraumaCenter && (
          <>
            {renderYesNoQuestion('ACS Verified', '12a', assessment.traumaDesignation.verificationBodies.acs, (value) => handleChange('traumaDesignation.verificationBodies.acs', value), true)}
            {renderYesNoQuestion('State/Regional Verified', '12b', assessment.traumaDesignation.verificationBodies.stateRegional, (value) => handleChange('traumaDesignation.verificationBodies.stateRegional', value), true)}
            {renderDropdownQuestion('Adult Level', '12c', assessment.traumaDesignation.adultLevel, ['I', 'II', 'III', 'IV', 'V', 'none'], (value) => handleChange('traumaDesignation.adultLevel', value), true)}
            {renderDropdownQuestion('Pediatric Level', '12d', assessment.traumaDesignation.pediatricLevel, ['I', 'II', 'III', 'IV', 'V', 'none'], (value) => handleChange('traumaDesignation.pediatricLevel', value), true)}
          </>
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Inpatient Services Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Inpatient Services</Typography>
        {renderYesNoQuestion('Newborn Nursery', 13, assessment.inpatientServices.newbornNursery, (value) => handleChange('inpatientServices.newbornNursery', value))}
        {renderYesNoQuestion('NICU', 14, assessment.inpatientServices.nicu, (value) => handleChange('inpatientServices.nicu', value))}
        {renderYesNoQuestion('PICU', 15, assessment.inpatientServices.picu, (value) => handleChange('inpatientServices.picu', value))}
        {renderYesNoQuestion('Pediatric Step-Down Unit', 16, assessment.inpatientServices.pediatricStepDown, (value) => handleChange('inpatientServices.pediatricStepDown', value))}
        {renderYesNoQuestion('Pediatric Ward', 17, assessment.inpatientServices.pediatricWard, (value) => handleChange('inpatientServices.pediatricWard', value))}
        {renderYesNoQuestion('Adult ICU', 18, assessment.inpatientServices.adultICU, (value) => handleChange('inpatientServices.adultICU', value))}
        {assessment.inpatientServices.adultICU && (
          renderYesNoQuestion('Children admitted to Adult ICU?', '18a', assessment.inpatientServices.childrenInAdultICU, (value) => handleChange('inpatientServices.childrenInAdultICU', value), true)
        )}
        {renderYesNoQuestion('Adult Step-Down Unit', 19, assessment.inpatientServices.adultStepDown, (value) => handleChange('inpatientServices.adultStepDown', value))}
        {assessment.inpatientServices.adultStepDown && (
          renderYesNoQuestion('Children admitted to Adult Step-Down?', '19a', assessment.inpatientServices.childrenInAdultStepDown, (value) => handleChange('inpatientServices.childrenInAdultStepDown', value), true)
        )}
        {renderYesNoQuestion('Adult Ward', 20, assessment.inpatientServices.adultWard, (value) => handleChange('inpatientServices.adultWard', value))}
        {assessment.inpatientServices.adultWard && (
          renderYesNoQuestion('Children admitted to Adult Ward?', '20a', assessment.inpatientServices.childrenInAdultWard, (value) => handleChange('inpatientServices.childrenInAdultWard', value), true)
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Administration Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Administration</Typography>
        {renderCoordinatorSection('physicianCoordinator', assessment.administration.physicianCoordinator, 21)}
        {renderCoordinatorSection('nurseCoordinator', assessment.administration.nurseCoordinator, 25)}
        {renderYesNoQuestion('Pediatric Emergency Department Medical Director', 29, assessment.administration.hasPediatricED, (value) => handleChange('administration.hasPediatricED', value))}
        {renderYesNoQuestion('Pediatric Inpatient Medical Director', 30, assessment.administration.hasPediatricInpatient, (value) => handleChange('administration.hasPediatricInpatient', value))}
        {renderYesNoQuestion('Pediatric ICU Medical Director', 31, assessment.administration.hasPediatricICU, (value) => handleChange('administration.hasPediatricICU', value))}
        {renderYesNoQuestion('Pediatric Surgery Medical Director', 32, assessment.administration.hasPediatricSurgery, (value) => handleChange('administration.hasPediatricSurgery', value))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Personnel Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Personnel</Typography>
        {renderYesNoQuestion('24-Hour Physician Coverage', 33, assessment.personnel.has24HourPhysician, (value) => handleChange('personnel.has24HourPhysician', value))}
        {renderYesNoQuestion('Pediatrician Available', 34, assessment.personnel.hasPediatrician, (value) => handleChange('personnel.hasPediatrician', value))}
        {renderYesNoQuestion('Pediatric Emergency Medicine Physician Available', 35, assessment.personnel.hasPediatricEM, (value) => handleChange('personnel.hasPediatricEM', value))}
        {renderYesNoQuestion('Pediatric Nurse Available', 36, assessment.personnel.hasPediatricNurse, (value) => handleChange('personnel.hasPediatricNurse', value))}
        {renderYesNoQuestion('Pediatric Respiratory Therapist Available', 37, assessment.personnel.hasPediatricRT, (value) => handleChange('personnel.hasPediatricRT', value))}
        {renderYesNoQuestion('PALS Certification Required', 38, assessment.personnel.hasPALS, (value) => handleChange('personnel.hasPALS', value))}
        {renderYesNoQuestion('ENPC Certification Available', 39, assessment.personnel.hasENPC, (value) => handleChange('personnel.hasENPC', value))}
        {renderYesNoQuestion('TNCC Certification Available', 40, assessment.personnel.hasTNCC, (value) => handleChange('personnel.hasTNCC', value))}
        {renderYesNoQuestion('ATLS Certification Available', 41, assessment.personnel.hasATLS, (value) => handleChange('personnel.hasATLS', value))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Quality Improvement Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Quality Improvement</Typography>
        {renderYesNoQuestion('Has QI Plan', 42, assessment.qualityImprovement.hasQIPlan, (value) => handleChange('qualityImprovement.hasQIPlan', value))}
        {assessment.qualityImprovement.hasQIPlan && (
          renderComponentsSection('qualityImprovement', assessment.qualityImprovement.components, 43)
        )}
      </Box>

      {/* Action Plan Dialog */}
      <ActionPlanDialog
        open={selectedQuestion !== null}
        onClose={() => setSelectedQuestion(null)}
        onSave={handleActionPlanSave}
        question={selectedQuestion || ''}
      />
    </Box>
  );
};

export default ReadinessAssessmentForm; 