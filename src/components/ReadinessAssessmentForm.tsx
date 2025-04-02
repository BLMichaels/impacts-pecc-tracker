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
  Grid,
  Divider,
  FormHelperText,
  Paper,
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
      <Tooltip title="Add Action Plan">
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
      <Tooltip title="Add Action Plan">
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
      <Tooltip title="Add Action Plan">
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

  const renderEquipmentSection = (title: string, equipment: Record<string, boolean | { [key: string]: boolean }>, index: number) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
      {Object.entries(equipment).map(([key, value], i) => {
        if (typeof value === 'object') {
          return (
            <Box key={key} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ ml: 4, mb: 1 }}>
                {key.split(/(?=[A-Z])/).join(' ').replace(/^./, str => str.toUpperCase())}
              </Typography>
              {Object.entries(value).map(([subKey, subValue], j) => (
                renderYesNoQuestion(
                  subKey.split(/(?=[A-Z])/).join(' ').replace(/^./, str => str.toUpperCase()),
                  index + i + j,
                  subValue as boolean || false,
                  (newValue) => handleChange(`${title.toLowerCase()}.${key}.${subKey}`, newValue),
                  true
                )
              ))}
            </Box>
          );
        }
        return renderYesNoQuestion(
          key.split(/(?=[A-Z])/).join(' ').replace(/^./, str => str.toUpperCase()),
          index + i,
          value || false,
          (newValue) => handleChange(`${title.toLowerCase()}.${key}`, newValue),
          true
        );
      })}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Contact Information
      </Typography>
      {renderTextQuestion('Name', 1, assessment.contactInfo.name, (value) => handleChange('contactInfo.name', value))}
      {renderTextQuestion('Title/Position', 2, assessment.contactInfo.title, (value) => handleChange('contactInfo.title', value))}
      {renderTextQuestion('Phone number', 3, assessment.contactInfo.phone, (value) => handleChange('contactInfo.phone', value))}
      {renderTextQuestion('Email', 4, assessment.contactInfo.email, (value) => handleChange('contactInfo.email', value))}
      {renderTextQuestion('Name of your facility/hospital', 5, assessment.contactInfo.facilityName, (value) => handleChange('contactInfo.facilityName', value))}
      {renderTextQuestion('Physical street address of your facility/hospital', 6, assessment.contactInfo.facilityAddress, (value) => handleChange('contactInfo.facilityAddress', value))}
      {renderTextQuestion('City your facility/hospital is located in', 7, assessment.contactInfo.facilityCity, (value) => handleChange('contactInfo.facilityCity', value))}
      {renderTextQuestion('Zip code of your facility/hospital', 8, assessment.contactInfo.facilityZip, (value) => handleChange('contactInfo.facilityZip', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
        From this point forward, we will use the term "hospital" to indicate a hospital or facility where your emergency department is located.
      </Typography>

      {renderYesNoQuestion('Does your hospital have an emergency department (ED) that is open 24/7?', 9, assessment.facilityInfo.has24HourED, (value) => handleChange('facilityInfo.has24HourED', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
        These first few questions will help us understand the infrastructure of your hospital and emergency department.
      </Typography>

      {renderDropdownQuestion('Which of the following best describes your hospital?', 10, assessment.facilityInfo.hospitalType, [
        'general',
        'childrens-within-general',
        'childrens-standalone',
        'critical-access',
        'micro',
        'offsite',
        'freestanding',
        'other'
      ], (value) => handleChange('facilityInfo.hospitalType', value))}
      
      {assessment.facilityInfo.hospitalType === 'other' && 
        renderTextQuestion('You answered "other," please describe your hospital', 11, assessment.facilityInfo.otherHospitalType || '', 
          (value) => handleChange('facilityInfo.otherHospitalType', value), true)}

      {renderDropdownQuestion('Which one of the following is the best description of your ED configuration for the care of children (children as defined by your hospital)?', 12, 
        assessment.facilityInfo.edConfiguration, [
          'general',
          'separate-pediatric',
          'pediatric-childrens',
          'other'
        ], (value) => handleChange('facilityInfo.edConfiguration', value))}

      {assessment.facilityInfo.edConfiguration === 'other' &&
        renderTextQuestion('You answered "other," please describe your hospital\'s ED configuration for the care of children', 13, 
          assessment.facilityInfo.otherEDConfig || '', (value) => handleChange('facilityInfo.otherEDConfig', value), true)}

      <Typography variant="body1" sx={{ mb: 2, mt: 4, fontStyle: 'italic' }}>
        These next questions are about your hospital's trauma designation.
      </Typography>

      {renderYesNoQuestion('Is your hospital designated as a trauma center?', 14, assessment.traumaDesignation.isTraumaCenter, 
        (value) => handleChange('traumaDesignation.isTraumaCenter', value))}

      {assessment.traumaDesignation.isTraumaCenter && (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            15. Which of the following are used to verify your trauma center for designation? (Check all that apply)
          </Typography>
          {renderYesNoQuestion('American College of Surgeons', 'a', assessment.traumaDesignation.verificationBodies.acs, 
            (value) => handleChange('traumaDesignation.verificationBodies.acs', value), true)}
          {renderYesNoQuestion('State or Regional Level Entity (e.g., EMS authority/governing board/bureau, Department of Health)', 'b', 
            assessment.traumaDesignation.verificationBodies.stateRegional, 
            (value) => handleChange('traumaDesignation.verificationBodies.stateRegional', value), true)}
        </>
      )}

      {renderDropdownQuestion('At what trauma level is your hospital currently designated for adults?', 16, assessment.traumaDesignation.adultLevel, [
        'level1',
        'level2',
        'level3',
        'level4',
        'level5',
        'none'
      ], (value) => handleChange('traumaDesignation.adultLevel', value))}

      {renderDropdownQuestion('At what trauma level is your hospital currently designated for children?', 17, assessment.traumaDesignation.pediatricLevel, [
        'level1',
        'level2',
        'none'
      ], (value) => handleChange('traumaDesignation.pediatricLevel', value))}

      <Typography variant="body1" sx={{ mb: 2, mt: 4, color: 'primary.main', fontStyle: 'italic' }}>
        Now, we would like to ask you some questions regarding your hospital's inpatient services.
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        18. Which of the following inpatient services does your hospital have on-site? (Check Yes or No for each)
      </Typography>

      {renderYesNoQuestion('Newborn nursery', 'a', assessment.inpatientServices.newbornNursery, 
        (value) => handleChange('inpatientServices.newbornNursery', value), true)}
      {renderYesNoQuestion('Neonatal intensive care unit', 'b', assessment.inpatientServices.nicu, 
        (value) => handleChange('inpatientServices.nicu', value), true)}
      {renderYesNoQuestion('Pediatric intensive care unit', 'c', assessment.inpatientServices.picu, 
        (value) => handleChange('inpatientServices.picu', value), true)}
      {renderYesNoQuestion('Pediatric step-down unit', 'd', assessment.inpatientServices.pediatricStepDown, 
        (value) => handleChange('inpatientServices.pediatricStepDown', value), true)}
      {renderYesNoQuestion('Pediatric inpatient ward', 'e', assessment.inpatientServices.pediatricWard, 
        (value) => handleChange('inpatientServices.pediatricWard', value), true)}
      {renderYesNoQuestion('Adult intensive care unit (medical or surgical)', 'f', assessment.inpatientServices.adultICU, 
        (value) => handleChange('inpatientServices.adultICU', value), true)}
      {renderYesNoQuestion('Adult step-down unit', 'g', assessment.inpatientServices.adultStepDown, 
        (value) => handleChange('inpatientServices.adultStepDown', value), true)}
      {renderYesNoQuestion('Adult inpatient ward', 'h', assessment.inpatientServices.adultWard, 
        (value) => handleChange('inpatientServices.adultWard', value), true)}

      <Typography variant="body1" sx={{ mb: 2, mt: 4, fontStyle: 'italic' }}>
        Please answer the following questions according to your hospital's definition of children.
      </Typography>

      {assessment.inpatientServices.adultICU && 
        renderYesNoQuestion('Does your hospital ever admit children to the adult intensive care unit (medical or surgical)?', 19, 
          assessment.inpatientServices.childrenInAdultICU || false, 
          (value) => handleChange('inpatientServices.childrenInAdultICU', value))}

      {assessment.inpatientServices.adultStepDown && 
        renderYesNoQuestion('Does your hospital ever admit children to the adult step-down unit?', 20, 
          assessment.inpatientServices.childrenInAdultStepDown || false, 
          (value) => handleChange('inpatientServices.childrenInAdultStepDown', value))}

      {assessment.inpatientServices.adultWard && 
        renderYesNoQuestion('Does your hospital ever admit children to the adult inpatient ward?', 21, 
          assessment.inpatientServices.childrenInAdultWard || false, 
          (value) => handleChange('inpatientServices.childrenInAdultWard', value))}

      {renderCoordinatorSection('Physician Coordinator', assessment.administration.physicianCoordinator, 1)}
      {renderCoordinatorSection('Nurse Coordinator', assessment.administration.nurseCoordinator, 5)}
      {renderYesNoQuestion('Does your hospital have a pediatric ED?', 9, assessment.administration.hasPediatricED, (value) => handleChange('administration.hasPediatricED', value))}
      {renderYesNoQuestion('Does your hospital have pediatric inpatient services?', 10, assessment.administration.hasPediatricInpatient, (value) => handleChange('administration.hasPediatricInpatient', value))}
      {renderYesNoQuestion('Does your hospital have a pediatric ICU?', 11, assessment.administration.hasPediatricICU, (value) => handleChange('administration.hasPediatricICU', value))}
      {renderYesNoQuestion('Does your hospital have pediatric surgery services?', 12, assessment.administration.hasPediatricSurgery, (value) => handleChange('administration.hasPediatricSurgery', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Personnel
      </Typography>
      {renderYesNoQuestion('Does your hospital have a physician available 24/7?', 1, assessment.personnel.has24HourPhysician, (value) => handleChange('personnel.has24HourPhysician', value))}
      {renderYesNoQuestion('Does your hospital have a pediatrician available 24/7?', 2, assessment.personnel.hasPediatrician, (value) => handleChange('personnel.hasPediatrician', value))}
      {renderYesNoQuestion('Does your hospital have a pediatric emergency medicine physician available 24/7?', 3, assessment.personnel.hasPediatricEM, (value) => handleChange('personnel.hasPediatricEM', value))}
      {renderYesNoQuestion('Does your hospital have a pediatric nurse available 24/7?', 4, assessment.personnel.hasPediatricNurse, (value) => handleChange('personnel.hasPediatricNurse', value))}
      {renderYesNoQuestion('Does your hospital have a pediatric respiratory therapist available 24/7?', 5, assessment.personnel.hasPediatricRT, (value) => handleChange('personnel.hasPediatricRT', value))}
      {renderYesNoQuestion('Does your hospital have staff with PALS certification?', 6, assessment.personnel.hasPALS, (value) => handleChange('personnel.hasPALS', value))}
      {renderYesNoQuestion('Does your hospital have staff with ENPC certification?', 7, assessment.personnel.hasENPC, (value) => handleChange('personnel.hasENPC', value))}
      {renderYesNoQuestion('Does your hospital have staff with TNCC certification?', 8, assessment.personnel.hasTNCC, (value) => handleChange('personnel.hasTNCC', value))}
      {renderYesNoQuestion('Does your hospital have staff with ATLS certification?', 9, assessment.personnel.hasATLS, (value) => handleChange('personnel.hasATLS', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Quality Improvement
      </Typography>
      {renderYesNoQuestion('Does your hospital have a quality improvement plan?', 1, assessment.qualityImprovement.hasQIPlan, (value) => handleChange('qualityImprovement.hasQIPlan', value))}
      {assessment.qualityImprovement.hasQIPlan && (
        renderComponentsSection('Components', assessment.qualityImprovement.components, 2)
      )}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Patient Safety
      </Typography>
      {renderYesNoQuestion('Does your hospital record patient weight in kilograms?', 1, assessment.patientSafety.weightInKg, (value) => handleChange('patientSafety.weightInKg', value))}
      {renderYesNoQuestion('Does your hospital record patient weight in kilograms?', 2, assessment.patientSafety.weightRecordedInKg, (value) => handleChange('patientSafety.weightRecordedInKg', value))}
      {renderYesNoQuestion('Does your hospital record vital signs?', 3, assessment.patientSafety.vitalsRecorded, (value) => handleChange('patientSafety.vitalsRecorded', value))}
      {renderYesNoQuestion('Does your hospital monitor blood pressure?', 4, assessment.patientSafety.bloodPressureMonitoring, (value) => handleChange('patientSafety.bloodPressureMonitoring', value))}
      {renderYesNoQuestion('Does your hospital monitor pulse oximetry?', 5, assessment.patientSafety.pulseOximetry, (value) => handleChange('patientSafety.pulseOximetry', value))}
      {renderYesNoQuestion('Does your hospital monitor end-tidal CO2?', 6, assessment.patientSafety.endTidalCO2, (value) => handleChange('patientSafety.endTidalCO2', value))}
      {renderYesNoQuestion('Does your hospital have a system for abnormal vital signs notification?', 7, assessment.patientSafety.abnormalVitalsNotification, (value) => handleChange('patientSafety.abnormalVitalsNotification', value))}
      {renderYesNoQuestion('Does your hospital use pre-calculated dosing?', 8, assessment.patientSafety.preCalculatedDosing, (value) => handleChange('patientSafety.preCalculatedDosing', value))}
      {renderYesNoQuestion('Does your hospital provide interpreter services?', 9, assessment.patientSafety.interpreterServices, (value) => handleChange('patientSafety.interpreterServices', value))}
      {renderYesNoQuestion('Does your hospital assess consciousness?', 10, assessment.patientSafety.consciousnessAssessment, (value) => handleChange('patientSafety.consciousnessAssessment', value))}
      {renderYesNoQuestion('Does your hospital assess pain?', 11, assessment.patientSafety.painAssessment, (value) => handleChange('patientSafety.painAssessment', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific safety measures?', 12, assessment.patientSafety.hasPediatricSafety, (value) => handleChange('patientSafety.hasPediatricSafety', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific medication safety?', 13, assessment.patientSafety.hasPediatricMedication, (value) => handleChange('patientSafety.hasPediatricMedication', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific equipment safety?', 14, assessment.patientSafety.hasPediatricEquipment, (value) => handleChange('patientSafety.hasPediatricEquipment', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific environment safety?', 15, assessment.patientSafety.hasPediatricEnvironment, (value) => handleChange('patientSafety.hasPediatricEnvironment', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific handoff procedures?', 16, assessment.patientSafety.hasPediatricHandoff, (value) => handleChange('patientSafety.hasPediatricHandoff', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific transfer procedures?', 17, assessment.patientSafety.hasPediatricTransfer, (value) => handleChange('patientSafety.hasPediatricTransfer', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific discharge procedures?', 18, assessment.patientSafety.hasPediatricDischarge, (value) => handleChange('patientSafety.hasPediatricDischarge', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific follow-up procedures?', 19, assessment.patientSafety.hasPediatricFollowup, (value) => handleChange('patientSafety.hasPediatricFollowup', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Policies
      </Typography>
      {renderYesNoQuestion('Does your hospital have a triage policy?', 1, assessment.policies.triagePolicy, (value) => handleChange('policies.triagePolicy', value))}
      {renderYesNoQuestion('Does your hospital have an assessment and reassessment policy?', 2, assessment.policies.assessmentReassessment, (value) => handleChange('policies.assessmentReassessment', value))}
      {renderYesNoQuestion('Does your hospital have an immunization assessment policy?', 3, assessment.policies.immunizationAssessment, (value) => handleChange('policies.immunizationAssessment', value))}
      {renderYesNoQuestion('Does your hospital have a child maltreatment policy?', 4, assessment.policies.childMaltreatment, (value) => handleChange('policies.childMaltreatment', value))}
      {renderYesNoQuestion('Does your hospital have a death in ED policy?', 5, assessment.policies.deathInED, (value) => handleChange('policies.deathInED', value))}
      {renderYesNoQuestion('Does your hospital have a radiation reduction policy?', 6, assessment.policies.radiationReduction, (value) => handleChange('policies.radiationReduction', value))}
      {renderYesNoQuestion('Does your hospital have a behavioral health policy?', 7, assessment.policies.behavioralHealth, (value) => handleChange('policies.behavioralHealth', value))}
      {renderYesNoQuestion('Does your hospital have transfer guidelines?', 8, assessment.policies.transferGuidelines, (value) => handleChange('policies.transferGuidelines', value))}
      {renderYesNoQuestion('Does your hospital have pediatric admission policies?', 9, assessment.policies.hasPediatricAdmission, (value) => handleChange('policies.hasPediatricAdmission', value))}
      {renderYesNoQuestion('Does your hospital have pediatric transfer policies?', 10, assessment.policies.hasPediatricTransfer, (value) => handleChange('policies.hasPediatricTransfer', value))}
      {renderYesNoQuestion('Does your hospital have pediatric consent policies?', 11, assessment.policies.hasPediatricConsent, (value) => handleChange('policies.hasPediatricConsent', value))}
      {renderYesNoQuestion('Does your hospital have pediatric restraint policies?', 12, assessment.policies.hasPediatricRestraint, (value) => handleChange('policies.hasPediatricRestraint', value))}
      {renderYesNoQuestion('Does your hospital have pediatric triage policies?', 13, assessment.policies.hasPediatricTriage, (value) => handleChange('policies.hasPediatricTriage', value))}
      {renderYesNoQuestion('Does your hospital have pediatric pain management policies?', 14, assessment.policies.hasPediatricPain, (value) => handleChange('policies.hasPediatricPain', value))}
      {renderYesNoQuestion('Does your hospital have pediatric sedation policies?', 15, assessment.policies.hasPediatricSedation, (value) => handleChange('policies.hasPediatricSedation', value))}
      {renderYesNoQuestion('Does your hospital have pediatric imaging policies?', 16, assessment.policies.hasPediatricImaging, (value) => handleChange('policies.hasPediatricImaging', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Family-Centered Care
      </Typography>
      {renderYesNoQuestion('Does your hospital have a family-centered care policy?', 1, assessment.familyCenteredCare.hasPolicy, (value) => handleChange('familyCenteredCare.hasPolicy', value))}
      {assessment.familyCenteredCare.hasPolicy && (
        <>
          {renderYesNoQuestion('Does your family-centered care policy include shared decision-making?', 2, assessment.familyCenteredCare.components.decisionMaking, (value) => handleChange('familyCenteredCare.components.decisionMaking', value), true)}
          {renderYesNoQuestion('Does your family-centered care policy include medication safety?', 3, assessment.familyCenteredCare.components.medicationSafety, (value) => handleChange('familyCenteredCare.components.medicationSafety', value), true)}
          {renderYesNoQuestion('Does your family-centered care policy include family presence?', 4, assessment.familyCenteredCare.components.familyPresence, (value) => handleChange('familyCenteredCare.components.familyPresence', value), true)}
          {renderYesNoQuestion('Does your family-centered care policy include education?', 5, assessment.familyCenteredCare.components.education, (value) => handleChange('familyCenteredCare.components.education', value), true)}
          {renderYesNoQuestion('Does your family-centered care policy include bereavement?', 6, assessment.familyCenteredCare.components.bereavement, (value) => handleChange('familyCenteredCare.components.bereavement', value), true)}
        </>
      )}
      {renderYesNoQuestion('Does your hospital have family presence policies?', 7, assessment.familyCenteredCare.hasFamilyPresence, (value) => handleChange('familyCenteredCare.hasFamilyPresence', value))}
      {renderYesNoQuestion('Does your hospital have family support services?', 8, assessment.familyCenteredCare.hasFamilySupport, (value) => handleChange('familyCenteredCare.hasFamilySupport', value))}
      {renderYesNoQuestion('Does your hospital have family education services?', 9, assessment.familyCenteredCare.hasFamilyEducation, (value) => handleChange('familyCenteredCare.hasFamilyEducation', value))}
      {renderYesNoQuestion('Does your hospital have family feedback mechanisms?', 10, assessment.familyCenteredCare.hasFamilyFeedback, (value) => handleChange('familyCenteredCare.hasFamilyFeedback', value))}
      {renderYesNoQuestion('Does your hospital have cultural competency training?', 11, assessment.familyCenteredCare.hasCulturalCompetency, (value) => handleChange('familyCenteredCare.hasCulturalCompetency', value))}
      {renderYesNoQuestion('Does your hospital have language services?', 12, assessment.familyCenteredCare.hasLanguageServices, (value) => handleChange('familyCenteredCare.hasLanguageServices', value))}
      {renderYesNoQuestion('Does your hospital have interpreter services?', 13, assessment.familyCenteredCare.hasInterpreter, (value) => handleChange('familyCenteredCare.hasInterpreter', value))}
      {renderYesNoQuestion('Does your hospital have translation services?', 14, assessment.familyCenteredCare.hasTranslation, (value) => handleChange('familyCenteredCare.hasTranslation', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Disaster Planning
      </Typography>
      {renderYesNoQuestion('Does your hospital\'s disaster plan address children?', 1, assessment.disasterPlanning.addressesChildren, (value) => handleChange('disasterPlanning.addressesChildren', value))}
      {assessment.disasterPlanning.addressesChildren && (
        <>
          {renderYesNoQuestion('Does your disaster plan include medications and supplies for children?', 2, assessment.disasterPlanning.components.medicationsSupplies, (value) => handleChange('disasterPlanning.components.medicationsSupplies', value), true)}
          {renderYesNoQuestion('Does your disaster plan include decontamination procedures for children?', 3, assessment.disasterPlanning.components.decontamination, (value) => handleChange('disasterPlanning.components.decontamination', value), true)}
          {renderYesNoQuestion('Does your disaster plan include family reunification procedures?', 4, assessment.disasterPlanning.components.familyReunification, (value) => handleChange('disasterPlanning.components.familyReunification', value), true)}
          {renderYesNoQuestion('Does your disaster plan include pediatric disaster drills?', 5, assessment.disasterPlanning.components.pediatricDrills, (value) => handleChange('disasterPlanning.components.pediatricDrills', value), true)}
          {renderYesNoQuestion('Does your disaster plan include surge capacity for children?', 6, assessment.disasterPlanning.components.surgeCapacity, (value) => handleChange('disasterPlanning.components.surgeCapacity', value), true)}
          {renderYesNoQuestion('Does your disaster plan include behavioral health services for children?', 7, assessment.disasterPlanning.components.behavioralHealth, (value) => handleChange('disasterPlanning.components.behavioralHealth', value), true)}
          {renderYesNoQuestion('Does your disaster plan include social services for children?', 8, assessment.disasterPlanning.components.socialServices, (value) => handleChange('disasterPlanning.components.socialServices', value), true)}
          {renderYesNoQuestion('Does your disaster plan include special needs considerations for children?', 9, assessment.disasterPlanning.components.specialNeeds, (value) => handleChange('disasterPlanning.components.specialNeeds', value), true)}
        </>
      )}
      {renderYesNoQuestion('Does your hospital have pediatric-specific disaster plans?', 10, assessment.disasterPlanning.hasPediatricDisaster, (value) => handleChange('disasterPlanning.hasPediatricDisaster', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific mass casualty plans?', 11, assessment.disasterPlanning.hasPediatricMassCasualty, (value) => handleChange('disasterPlanning.hasPediatricMassCasualty', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific evacuation plans?', 12, assessment.disasterPlanning.hasPediatricEvacuation, (value) => handleChange('disasterPlanning.hasPediatricEvacuation', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific shelter plans?', 13, assessment.disasterPlanning.hasPediatricShelter, (value) => handleChange('disasterPlanning.hasPediatricShelter', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific disaster supplies?', 14, assessment.disasterPlanning.hasPediatricSupplies, (value) => handleChange('disasterPlanning.hasPediatricSupplies', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific disaster equipment?', 15, assessment.disasterPlanning.hasPediatricEquipment, (value) => handleChange('disasterPlanning.hasPediatricEquipment', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific disaster medications?', 16, assessment.disasterPlanning.hasPediatricMedications, (value) => handleChange('disasterPlanning.hasPediatricMedications', value))}
      {renderYesNoQuestion('Does your hospital have pediatric-specific disaster staff?', 17, assessment.disasterPlanning.hasPediatricStaff, (value) => handleChange('disasterPlanning.hasPediatricStaff', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Equipment Management
      </Typography>
      {renderYesNoQuestion('Does your hospital have pediatric equipment inventory?', 1, assessment.equipmentManagement.hasPediatricInventory, (value) => handleChange('equipmentManagement.hasPediatricInventory', value))}
      {renderYesNoQuestion('Does your hospital have pediatric equipment maintenance?', 2, assessment.equipmentManagement.hasPediatricMaintenance, (value) => handleChange('equipmentManagement.hasPediatricMaintenance', value))}
      {renderYesNoQuestion('Does your hospital have pediatric equipment calibration?', 3, assessment.equipmentManagement.hasPediatricCalibration, (value) => handleChange('equipmentManagement.hasPediatricCalibration', value))}
      {renderYesNoQuestion('Does your hospital have pediatric equipment replacement?', 4, assessment.equipmentManagement.hasPediatricReplacement, (value) => handleChange('equipmentManagement.hasPediatricReplacement', value))}
      {renderYesNoQuestion('Does your hospital have pediatric equipment training?', 5, assessment.equipmentManagement.hasPediatricTraining, (value) => handleChange('equipmentManagement.hasPediatricTraining', value))}
      {renderYesNoQuestion('Does your hospital have pediatric equipment competency?', 6, assessment.equipmentManagement.hasPediatricCompetency, (value) => handleChange('equipmentManagement.hasPediatricCompetency', value))}
      {renderYesNoQuestion('Does your hospital have pediatric equipment documentation?', 7, assessment.equipmentManagement.hasPediatricDocumentation, (value) => handleChange('equipmentManagement.hasPediatricDocumentation', value))}
      {renderYesNoQuestion('Does your hospital have pediatric equipment quality review?', 8, assessment.equipmentManagement.hasPediatricQuality, (value) => handleChange('equipmentManagement.hasPediatricQuality', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Monitoring Equipment
      </Typography>
      {renderYesNoQuestion('Does your hospital have pediatric stethoscopes?', 1, assessment.monitoringEquipment.hasPediatricStethoscope, (value) => handleChange('monitoringEquipment.hasPediatricStethoscope', value))}
      {renderYesNoQuestion('Does your hospital have pediatric blood pressure cuffs?', 2, assessment.monitoringEquipment.hasPediatricBP, (value) => handleChange('monitoringEquipment.hasPediatricBP', value))}
      {renderYesNoQuestion('Does your hospital have pediatric thermometers?', 3, assessment.monitoringEquipment.hasPediatricThermometer, (value) => handleChange('monitoringEquipment.hasPediatricThermometer', value))}
      {renderYesNoQuestion('Does your hospital have pediatric scales?', 4, assessment.monitoringEquipment.hasPediatricScale, (value) => handleChange('monitoringEquipment.hasPediatricScale', value))}
      {renderYesNoQuestion('Does your hospital have pediatric ECG monitors?', 5, assessment.monitoringEquipment.hasPediatricECG, (value) => handleChange('monitoringEquipment.hasPediatricECG', value))}
      {renderYesNoQuestion('Does your hospital have pediatric pulse oximeters?', 6, assessment.monitoringEquipment.hasPediatricPulse, (value) => handleChange('monitoringEquipment.hasPediatricPulse', value))}
      {renderYesNoQuestion('Does your hospital have pediatric ETCO2 monitors?', 7, assessment.monitoringEquipment.hasPediatricETCO2, (value) => handleChange('monitoringEquipment.hasPediatricETCO2', value))}
      {renderYesNoQuestion('Does your hospital have pediatric glucose monitors?', 8, assessment.monitoringEquipment.hasPediatricGlucose, (value) => handleChange('monitoringEquipment.hasPediatricGlucose', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Resuscitation Equipment
      </Typography>
      {renderYesNoQuestion('Does your hospital have 22-gauge needles?', 1, assessment.resuscitationEquipment.gauge22, (value) => handleChange('resuscitationEquipment.gauge22', value))}
      {renderYesNoQuestion('Does your hospital have 24-gauge needles?', 2, assessment.resuscitationEquipment.gauge24, (value) => handleChange('resuscitationEquipment.gauge24', value))}
      {renderYesNoQuestion('Does your hospital have IO needles?', 3, assessment.resuscitationEquipment.ioNeedles, (value) => handleChange('resuscitationEquipment.ioNeedles', value))}
      {renderYesNoQuestion('Does your hospital have IV administration sets?', 4, assessment.resuscitationEquipment.ivAdministration, (value) => handleChange('resuscitationEquipment.ivAdministration', value))}
      {renderYesNoQuestion('Does your hospital have pediatric bag-valve-masks?', 5, assessment.resuscitationEquipment.hasPediatricBag, (value) => handleChange('resuscitationEquipment.hasPediatricBag', value))}
      {renderYesNoQuestion('Does your hospital have pediatric suction?', 6, assessment.resuscitationEquipment.hasPediatricSuction, (value) => handleChange('resuscitationEquipment.hasPediatricSuction', value))}
      {renderYesNoQuestion('Does your hospital have pediatric oxygen?', 7, assessment.resuscitationEquipment.hasPediatricOxygen, (value) => handleChange('resuscitationEquipment.hasPediatricOxygen', value))}
      {renderYesNoQuestion('Does your hospital have pediatric defibrillators?', 8, assessment.resuscitationEquipment.hasPediatricDefibrillator, (value) => handleChange('resuscitationEquipment.hasPediatricDefibrillator', value))}
      {renderYesNoQuestion('Does your hospital have pediatric endotracheal tubes?', 9, assessment.resuscitationEquipment.hasPediatricETT, (value) => handleChange('resuscitationEquipment.hasPediatricETT', value))}
      {renderYesNoQuestion('Does your hospital have pediatric laryngeal mask airways?', 10, assessment.resuscitationEquipment.hasPediatricLMA, (value) => handleChange('resuscitationEquipment.hasPediatricLMA', value))}
      {renderYesNoQuestion('Does your hospital have pediatric intraosseous access?', 11, assessment.resuscitationEquipment.hasPediatricIO, (value) => handleChange('resuscitationEquipment.hasPediatricIO', value))}
      {renderYesNoQuestion('Does your hospital have pediatric chest tubes?', 12, assessment.resuscitationEquipment.hasPediatricChest, (value) => handleChange('resuscitationEquipment.hasPediatricChest', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Respiratory Equipment
      </Typography>
      {renderYesNoQuestion('Does your hospital have pediatric nebulizers?', 1, assessment.respiratoryEquipment.hasPediatricNebulizer, (value) => handleChange('respiratoryEquipment.hasPediatricNebulizer', value))}
      {renderYesNoQuestion('Does your hospital have pediatric spacers?', 2, assessment.respiratoryEquipment.hasPediatricSpacer, (value) => handleChange('respiratoryEquipment.hasPediatricSpacer', value))}
      {renderYesNoQuestion('Does your hospital have pediatric metered dose inhalers?', 3, assessment.respiratoryEquipment.hasPediatricMetered, (value) => handleChange('respiratoryEquipment.hasPediatricMetered', value))}
      {renderYesNoQuestion('Does your hospital have pediatric CPAP?', 4, assessment.respiratoryEquipment.hasPediatricCPAP, (value) => handleChange('respiratoryEquipment.hasPediatricCPAP', value))}
      {renderYesNoQuestion('Does your hospital have pediatric ventilators?', 5, assessment.respiratoryEquipment.hasPediatricVentilator, (value) => handleChange('respiratoryEquipment.hasPediatricVentilator', value))}
      {renderYesNoQuestion('Does your hospital have pediatric high-flow nasal cannula?', 6, assessment.respiratoryEquipment.hasPediatricHighFlow, (value) => handleChange('respiratoryEquipment.hasPediatricHighFlow', value))}
      {renderYesNoQuestion('Does your hospital have pediatric suction?', 7, assessment.respiratoryEquipment.hasPediatricSuction, (value) => handleChange('respiratoryEquipment.hasPediatricSuction', value))}
      {renderYesNoQuestion('Does your hospital have pediatric chest tubes?', 8, assessment.respiratoryEquipment.hasPediatricChest, (value) => handleChange('respiratoryEquipment.hasPediatricChest', value))}
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Patient Volume
      </Typography>
      {renderTextQuestion('Total number of patients seen in your ED annually', 1, assessment.patientVolume.totalPatients, (value) => handleChange('patientVolume.totalPatients', value))}
      {renderDropdownQuestion('Pediatric Volume', 2, assessment.patientVolume.pediatricVolume, ['low', 'medium', 'high'], (value) => handleChange('patientVolume.pediatricVolume', value))}
      {renderTextQuestion('Total number of ED visits annually', 3, assessment.patientVolume.totalEDVisits, (value) => handleChange('patientVolume.totalEDVisits', value))}
      {renderTextQuestion('Number of pediatric ED visits annually', 4, assessment.patientVolume.pediatricEDVisits, (value) => handleChange('patientVolume.pediatricEDVisits', value))}
      {renderTextQuestion('Number of pediatric ICU admissions annually', 5, assessment.patientVolume.pediatricICUAdmissions, (value) => handleChange('patientVolume.pediatricICUAdmissions', value))}
      {renderTextQuestion('Number of pediatric trauma admissions annually', 6, assessment.patientVolume.pediatricTraumaAdmissions, (value) => handleChange('patientVolume.pediatricTraumaAdmissions', value))}

      <ActionPlanDialog
        open={!!selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
        onSave={handleActionPlanSave}
        question={selectedQuestion || ''}
      />
    </Box>
  );
};

export default ReadinessAssessmentForm; 