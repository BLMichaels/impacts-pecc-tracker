import { useAuth } from '../context/AuthContext';
import { useCallback } from 'react';

export interface StorageData {
  activities: Activity[];
  milestones: Milestone[];
  readinessAssessment: ReadinessAssessment;
}

export interface Activity {
  id: number;
  date: string;
  title: string;
  category: 'general-admin' | 'pecc-education' | 'mentor-meeting' | 'sim-prep' | 'sim-facilitation' | 'hospital-ed' | 'policies' | 'qi-pi' | 'collaborative' | 'staffing' | 'disaster' | 'injury-prevention' | 'equipment' | 'special-needs';
  hours: number;
  simulationType?: string;
  simulationParticipants?: number;
  feedbackSubmitted?: boolean;
  notes?: string;
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  category: 'initial' | 'ongoing' | 'prs' | 'equipment' | 'patient-safety' | 'staffing' | 'policies' | 'qi';
  links?: {
    text: string;
    url: string;
  }[];
  subItems?: string[];
}

export interface ReadinessAssessment {
  coordinator: {
    identified: boolean | undefined;
    type: string;
    dedicatedTime: boolean | undefined;
    scope: string;
  };
  components: {
    trauma: boolean | undefined;
    emergency: boolean | undefined;
    inpatient: boolean | undefined;
    outpatient: boolean | undefined;
    transport: boolean | undefined;
    rehabilitation: boolean | undefined;
    childLife: boolean | undefined;
    socialWork: boolean | undefined;
    pastoralCare: boolean | undefined;
    familySupport: boolean | undefined;
    quality: boolean | undefined;
    research: boolean | undefined;
    education: boolean | undefined;
    disaster: boolean | undefined;
    injury: boolean | undefined;
  };
  equipment: {
    trauma: {
      airway: boolean | undefined;
      breathing: boolean | undefined;
      circulation: boolean | undefined;
      disability: boolean | undefined;
      exposure: boolean | undefined;
    };
    emergency: {
      airway: boolean | undefined;
      breathing: boolean | undefined;
      circulation: boolean | undefined;
      disability: boolean | undefined;
      exposure: boolean | undefined;
    };
    inpatient: {
      airway: boolean | undefined;
      breathing: boolean | undefined;
      circulation: boolean | undefined;
      disability: boolean | undefined;
      exposure: boolean | undefined;
    };
    outpatient: {
      airway: boolean | undefined;
      breathing: boolean | undefined;
      circulation: boolean | undefined;
      disability: boolean | undefined;
      exposure: boolean | undefined;
    };
    transport: {
      airway: boolean | undefined;
      breathing: boolean | undefined;
      circulation: boolean | undefined;
      disability: boolean | undefined;
      exposure: boolean | undefined;
    };
    rehabilitation: {
      airway: boolean | undefined;
      breathing: boolean | undefined;
      circulation: boolean | undefined;
      disability: boolean | undefined;
      exposure: boolean | undefined;
    };
  };
  patientVolume: {
    totalPatients: string;
    pediatricVolume: 'low' | 'medium' | 'medium-high' | 'high';
    totalEDVisits: string;
    pediatricEDVisits: string;
    pediatricICUAdmissions: string;
    pediatricTraumaAdmissions: string;
  };
  hospitalType: string;
  hasEmergencyDepartment: boolean | undefined;
  emergencyDepartmentConfiguration: string;
  emergencyDepartmentBeds: string;
  emergencyDepartmentTraumaBays: string;
  emergencyDepartmentTraumaBayConfiguration: string;
  emergencyDepartmentTraumaBayEquipment: string;
  emergencyDepartmentTraumaBayStaffing: string;
  emergencyDepartmentTraumaBayProtocols: string;
  emergencyDepartmentTraumaBayDocumentation: string;
  emergencyDepartmentTraumaBayQuality: string;
  emergencyDepartmentTraumaBayResearch: string;
  emergencyDepartmentTraumaBayEducation: string;
  emergencyDepartmentTraumaBayFamily: string;
  emergencyDepartmentTraumaBayDisaster: string;
  emergencyDepartmentTraumaBayInjury: string;
  emergencyDepartmentTraumaBayTransport: string;
  emergencyDepartmentTraumaBayRehabilitation: string;
  emergencyDepartmentTraumaBayOutpatient: string;
  emergencyDepartmentTraumaBayInpatient: string;
  emergencyDepartmentTraumaBaySocial: string;
  emergencyDepartmentTraumaBayPastoral: string;
  emergencyDepartmentTraumaBayChildLife: string;
  emergencyDepartmentTraumaBayQualityImprovement: string;
  emergencyDepartmentTraumaBayResearchActivities: string;
  emergencyDepartmentTraumaBayEducationActivities: string;
  emergencyDepartmentTraumaBayFamilySupport: string;
  emergencyDepartmentTraumaBayDisasterPreparedness: string;
  emergencyDepartmentTraumaBayInjuryPrevention: string;
  emergencyDepartmentTraumaBayTransportCoordination: string;
  emergencyDepartmentTraumaBayRehabilitationCoordination: string;
  emergencyDepartmentTraumaBayOutpatientCoordination: string;
  emergencyDepartmentTraumaBayInpatientCoordination: string;
  emergencyDepartmentTraumaBaySocialWorkCoordination: string;
  emergencyDepartmentTraumaBayPastoralCareCoordination: string;
  emergencyDepartmentTraumaBayChildLifeCoordination: string;
  emergencyDepartmentTraumaBayQualityImprovementCoordination: string;
  emergencyDepartmentTraumaBayResearchCoordination: string;
  emergencyDepartmentTraumaBayEducationCoordination: string;
  emergencyDepartmentTraumaBayFamilySupportCoordination: string;
  emergencyDepartmentTraumaBayDisasterPreparednessCoordination: string;
  emergencyDepartmentTraumaBayInjuryPreventionCoordination: string;
  emergencyDepartmentTraumaBayTransportDocumentation: string;
  emergencyDepartmentTraumaBayRehabilitationDocumentation: string;
  emergencyDepartmentTraumaBayOutpatientDocumentation: string;
  emergencyDepartmentTraumaBayInpatientDocumentation: string;
  emergencyDepartmentTraumaBaySocialWorkDocumentation: string;
  emergencyDepartmentTraumaBayPastoralCareDocumentation: string;
  emergencyDepartmentTraumaBayChildLifeDocumentation: string;
  emergencyDepartmentTraumaBayQualityImprovementDocumentation: string;
  emergencyDepartmentTraumaBayResearchDocumentation: string;
  emergencyDepartmentTraumaBayEducationDocumentation: string;
  emergencyDepartmentTraumaBayFamilySupportDocumentation: string;
  emergencyDepartmentTraumaBayDisasterPreparednessDocumentation: string;
  emergencyDepartmentTraumaBayInjuryPreventionDocumentation: string;
  emergencyDepartmentTraumaBayTransportQuality: string;
  emergencyDepartmentTraumaBayRehabilitationQuality: string;
  emergencyDepartmentTraumaBayOutpatientQuality: string;
  emergencyDepartmentTraumaBayInpatientQuality: string;
  emergencyDepartmentTraumaBaySocialWorkQuality: string;
  emergencyDepartmentTraumaBayPastoralCareQuality: string;
  emergencyDepartmentTraumaBayChildLifeQuality: string;
  emergencyDepartmentTraumaBayQualityImprovementQuality: string;
  emergencyDepartmentTraumaBayResearchQuality: string;
  emergencyDepartmentTraumaBayEducationQuality: string;
  emergencyDepartmentTraumaBayFamilySupportQuality: string;
  emergencyDepartmentTraumaBayDisasterPreparednessQuality: string;
  emergencyDepartmentTraumaBayInjuryPreventionQuality: string;
  emergencyDepartmentTraumaBayTransportResearch: string;
  emergencyDepartmentTraumaBayRehabilitationResearch: string;
  emergencyDepartmentTraumaBayOutpatientResearch: string;
  emergencyDepartmentTraumaBayInpatientResearch: string;
  emergencyDepartmentTraumaBaySocialWorkResearch: string;
  emergencyDepartmentTraumaBayPastoralCareResearch: string;
  emergencyDepartmentTraumaBayChildLifeResearch: string;
  emergencyDepartmentTraumaBayQualityImprovementResearch: string;
  emergencyDepartmentTraumaBayEducationResearch: string;
  emergencyDepartmentTraumaBayFamilySupportResearch: string;
  emergencyDepartmentTraumaBayDisasterPreparednessResearch: string;
  emergencyDepartmentTraumaBayInjuryPreventionResearch: string;
  emergencyDepartmentTraumaBayTransportEducation: string;
  emergencyDepartmentTraumaBayRehabilitationEducation: string;
  emergencyDepartmentTraumaBayOutpatientEducation: string;
  emergencyDepartmentTraumaBayInpatientEducation: string;
  emergencyDepartmentTraumaBaySocialWorkEducation: string;
  emergencyDepartmentTraumaBayPastoralCareEducation: string;
  emergencyDepartmentTraumaBayChildLifeEducation: string;
  emergencyDepartmentTraumaBayQualityImprovementEducation: string;
  emergencyDepartmentTraumaBayResearchEducation: string;
  emergencyDepartmentTraumaBayFamilySupportEducation: string;
  emergencyDepartmentTraumaBayDisasterPreparednessEducation: string;
  emergencyDepartmentTraumaBayInjuryPreventionEducation: string;
  emergencyDepartmentTraumaBayTransportFamily: string;
  emergencyDepartmentTraumaBayRehabilitationFamily: string;
  emergencyDepartmentTraumaBayOutpatientFamily: string;
  emergencyDepartmentTraumaBayInpatientFamily: string;
  emergencyDepartmentTraumaBaySocialWorkFamily: string;
  emergencyDepartmentTraumaBayPastoralCareFamily: string;
  emergencyDepartmentTraumaBayChildLifeFamily: string;
  emergencyDepartmentTraumaBayQualityImprovementFamily: string;
  emergencyDepartmentTraumaBayResearchFamily: string;
  emergencyDepartmentTraumaBayEducationFamily: string;
  emergencyDepartmentTraumaBayFamilySupportFamily: string;
  emergencyDepartmentTraumaBayDisasterPreparednessFamily: string;
  emergencyDepartmentTraumaBayInjuryPreventionFamily: string;
  emergencyDepartmentTraumaBayTransportDisaster: string;
  emergencyDepartmentTraumaBayRehabilitationDisaster: string;
  emergencyDepartmentTraumaBayOutpatientDisaster: string;
  emergencyDepartmentTraumaBayInpatientDisaster: string;
  emergencyDepartmentTraumaBaySocialWorkDisaster: string;
  emergencyDepartmentTraumaBayPastoralCareDisaster: string;
  emergencyDepartmentTraumaBayChildLifeDisaster: string;
  emergencyDepartmentTraumaBayQualityImprovementDisaster: string;
  emergencyDepartmentTraumaBayResearchDisaster: string;
  emergencyDepartmentTraumaBayEducationDisaster: string;
  emergencyDepartmentTraumaBayFamilySupportDisaster: string;
  emergencyDepartmentTraumaBayDisasterPreparednessDisaster: string;
  emergencyDepartmentTraumaBayInjuryPreventionDisaster: string;
  emergencyDepartmentTraumaBayTransportInjury: string;
  emergencyDepartmentTraumaBayRehabilitationInjury: string;
  emergencyDepartmentTraumaBayOutpatientInjury: string;
  emergencyDepartmentTraumaBayInpatientInjury: string;
  emergencyDepartmentTraumaBaySocialWorkInjury: string;
  emergencyDepartmentTraumaBayPastoralCareInjury: string;
  emergencyDepartmentTraumaBayChildLifeInjury: string;
  emergencyDepartmentTraumaBayQualityImprovementInjury: string;
  emergencyDepartmentTraumaBayResearchInjury: string;
  emergencyDepartmentTraumaBayEducationInjury: string;
  emergencyDepartmentTraumaBayFamilySupportInjury: string;
  emergencyDepartmentTraumaBayDisasterPreparednessInjury: string;
  emergencyDepartmentTraumaBayInjuryPreventionInjury: string;
}

const STORAGE_PREFIX = 'impacts_';

const generateStorageKey = (email: string) => {
  return `${STORAGE_PREFIX}${email}`;
};

const saveUserData = (userId: string, data: Partial<StorageData>) => {
  const key = `${STORAGE_PREFIX}${userId}`;
  const existingData = getUserData(userId);
  const newData = {
    ...existingData,
    ...data
  };
  localStorage.setItem(key, JSON.stringify(newData));
};

const getUserData = (userId: string): StorageData => {
  const key = `${STORAGE_PREFIX}${userId}`;
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing user data:', e);
    }
  }
  return {
    activities: [],
    milestones: getDefaultMilestones(),
    readinessAssessment: getDefaultReadinessAssessment()
  };
};

export const getDefaultMilestones = (): Milestone[] => {
  const defaultMilestones: Milestone[] = [
    {
      id: 1,
      category: 'initial' as const,
      title: 'Reach out and contact your ED nursing leadership',
      description: 'Contact manager, educator, director and physician partners (medical director)',
      completed: false,
      links: [
        { text: 'Email template', url: 'https://docs.google.com/document/d/14QcAO6S8llniLOKo-NoIuwDpYgo63GCN/edit' }
      ]
    },
    {
      id: 2,
      category: 'initial' as const,
      title: 'Share information about Pediatric Readiness',
      description: 'Review key documents and resources about pediatric readiness',
      completed: false,
      links: [
        { text: 'Joint Policy Statement', url: 'https://publications.aap.org/pediatrics/article/142/5/e20182459/38608/Pediatric-Readiness-in-the-Emergency-Department?autologincheck=redirected' },
        { text: 'Pediatric Readiness Assessment', url: 'https://emscimprovement.center/domains/pediatric-readiness-project/assessment/' },
        { text: 'Pediatric Readiness Saves Lives', url: 'https://media.emscimprovement.center/documents/Pediatric_Readiness_Outcomes_-_2023_Q5q8cow.pdf%5C' },
        { text: 'Importance of the PECC', url: 'https://emscimprovement.center/domains/pecc/' }
      ]
    },
    {
      id: 3,
      category: 'initial' as const,
      title: 'Identify PECC or champion and sign community ED commitment letter',
      description: 'Complete and sign the commitment letter for your ED',
      completed: false,
      links: [
        { text: 'commitment letter', url: 'https://docs.google.com/document/d/1zuOqjQEjMox9fykO4Lgj0tNfk0TXufJtcozLX0_ATQM/edit?tab=t.0' }
      ]
    },
    {
      id: 4,
      category: 'initial' as const,
      title: 'Review PECC Job Description',
      description: 'Review the detailed PECC role description and responsibilities',
      completed: false,
      links: [
        { text: 'PECC Job Description', url: 'https://docs.google.com/document/d/1yCFW_TC7P4__N19HT0mHilmMLHLREeiwcuOMXJoYpCE/edit' }
      ]
    },
    {
      id: 5,
      category: 'initial' as const,
      title: 'Review EHC modules',
      description: 'Review the 7 domains of pediatric readiness',
      completed: false,
      links: [
        { text: 'EIIC Modules', url: 'https://emscimprovement.center/domains/pecc/pecc-module-ed/' },
        { text: 'module 1', url: 'https://ppn.h5p.com/content/1292018380989833718/embed' },
        { text: 'module 2', url: 'https://ppn.h5p.com/content/1292113550579127778#h5pbookid=1292113550579127778&chapter=h5p-interactive-book-chapter-3295f90f-7c82-4a4e-93b4-52822046d715&section=0' },
        { text: 'module 3', url: 'https://ppn.h5p.com/content/1292324953257974388#h5pbookid=1292324953257974388&chapter=h5p-interactive-book-chapter-7f3cc07a-615b-4a53-9870-47a92b004604&section=0' },
        { text: 'module 4', url: 'https://emscimprovement.center/domains/pecc/pecc-module-ed/module-4-safety/' }
      ]
    },
    {
      id: 6,
      category: 'ongoing' as const,
      title: 'Regular Monthly Activities',
      description: 'Ongoing monthly tasks and reviews',
      completed: false,
      subItems: [
        'Regularly review Activity Log',
        'Meet monthly with all PECCs in program',
        'Continue to share existing resources and request need for resources through ImPACTS and PECC cohort via Zulip'
      ],
      links: [
        { text: 'ImPACTS Website', url: 'https://www.impactscollaborative.com/' }
      ]
    },
    {
      id: 7,
      category: 'prs' as const,
      title: 'Pediatric Readiness Score Submission',
      description: 'Complete PRS requirements and updates',
      completed: false,
      subItems: [
        'Complete Pediatric Readiness Score (PRS) on ED site',
        'Update gap assessment status and action plans',
        'PECC will enter the PRS on the National Pediatric Readiness Project website for official score'
      ],
      links: [
        { text: 'Pediatric Readiness Score', url: 'https://pedsready.org/' },
        { text: 'NPRQI', url: 'https://emscimprovement.center/engage/nprqi/' }
      ]
    },
    {
      id: 8,
      category: 'equipment' as const,
      title: 'Equipment, Medication and Supplies I',
      description: 'Complete initial equipment assessment',
      completed: false,
      links: [
        { text: 'ED Checklist', url: 'https://emscimprovement.center/domains/pediatric-readiness-project/readiness-toolkit/readiness-ED-checklist/' },
        { text: 'SimBox', url: 'https://www.emergencysimbox.com/' }
      ]
    },
    {
      id: 9,
      category: 'patient-safety' as const,
      title: 'Patient Safety Resources',
      description: 'Review and implement patient safety tools',
      completed: false,
      subItems: [
        'PediStat',
        'HandTevy',
        'SafeDose'
      ],
      links: [
        { text: 'EIIC Templates', url: 'https://emscimprovement.center/domains/pediatric-readiness-project/readiness-toolkit/readiness-toolkit-checklist/safety/' },
        { text: 'PediStat', url: 'https://www.pedi-stat.com/' },
        { text: 'HandTevy', url: 'https://www.handtevy.com/' },
        { text: 'SafeDose', url: 'https://www.safedoseinc.com/' },
        { text: 'Sim!', url: 'http://emergencysimbox.com/' }
      ]
    },
    {
      id: 10,
      category: 'policies' as const,
      title: 'Policies, Procedures, and Protocols',
      description: 'Review and implement policies and procedures',
      completed: false,
      subItems: [
        'Medical direction support',
        'ED leadership support',
        'Policy Committee',
        'IT support through charting system or electronic policy system'
      ],
      links: [
        { text: 'Templates', url: 'https://emscimprovement.center/domains/pediatric-readiness-project/readiness-toolkit/readiness-toolkit-checklist/policies/' },
        { text: 'Sim!', url: 'http://emergencysimbox.com/' }
      ]
    },
    {
      id: 11,
      category: 'staffing' as const,
      title: 'Physician and Nurse Staffing and Training Milestones',
      description: 'Complete staffing and training requirements',
      completed: false,
      links: [
        { text: 'Simulation/Education Guide', url: 'https://docs.google.com/presentation/d/11CSEQ14iSZ8YD6GSA5WJUpuOI7drQckp/edit?usp=sharing&ouid=116288827536997281890&rtpof=true&sd=true' },
        { text: 'SimBox', url: 'http://emergencysimbox.com/' }
      ]
    }
  ];
  console.log('Default milestones:', defaultMilestones);
  return defaultMilestones;
};

export const getDefaultReadinessAssessment = (): ReadinessAssessment => ({
  coordinator: {
    identified: undefined,
    type: '',
    dedicatedTime: undefined,
    scope: ''
  },
  components: {
    trauma: undefined,
    emergency: undefined,
    inpatient: undefined,
    outpatient: undefined,
    transport: undefined,
    rehabilitation: undefined,
    childLife: undefined,
    socialWork: undefined,
    pastoralCare: undefined,
    familySupport: undefined,
    quality: undefined,
    research: undefined,
    education: undefined,
    disaster: undefined,
    injury: undefined
  },
  equipment: {
    trauma: {
      airway: undefined,
      breathing: undefined,
      circulation: undefined,
      disability: undefined,
      exposure: undefined
    },
    emergency: {
      airway: undefined,
      breathing: undefined,
      circulation: undefined,
      disability: undefined,
      exposure: undefined
    },
    inpatient: {
      airway: undefined,
      breathing: undefined,
      circulation: undefined,
      disability: undefined,
      exposure: undefined
    },
    outpatient: {
      airway: undefined,
      breathing: undefined,
      circulation: undefined,
      disability: undefined,
      exposure: undefined
    },
    transport: {
      airway: undefined,
      breathing: undefined,
      circulation: undefined,
      disability: undefined,
      exposure: undefined
    },
    rehabilitation: {
      airway: undefined,
      breathing: undefined,
      circulation: undefined,
      disability: undefined,
      exposure: undefined
    }
  },
  patientVolume: {
    totalPatients: '',
    pediatricVolume: 'low',
    totalEDVisits: '',
    pediatricEDVisits: '',
    pediatricICUAdmissions: '',
    pediatricTraumaAdmissions: ''
  },
  hospitalType: '',
  hasEmergencyDepartment: undefined,
  emergencyDepartmentConfiguration: '',
  emergencyDepartmentBeds: '',
  emergencyDepartmentTraumaBays: '',
  emergencyDepartmentTraumaBayConfiguration: '',
  emergencyDepartmentTraumaBayEquipment: '',
  emergencyDepartmentTraumaBayStaffing: '',
  emergencyDepartmentTraumaBayProtocols: '',
  emergencyDepartmentTraumaBayDocumentation: '',
  emergencyDepartmentTraumaBayQuality: '',
  emergencyDepartmentTraumaBayResearch: '',
  emergencyDepartmentTraumaBayEducation: '',
  emergencyDepartmentTraumaBayFamily: '',
  emergencyDepartmentTraumaBayDisaster: '',
  emergencyDepartmentTraumaBayInjury: '',
  emergencyDepartmentTraumaBayTransport: '',
  emergencyDepartmentTraumaBayRehabilitation: '',
  emergencyDepartmentTraumaBayOutpatient: '',
  emergencyDepartmentTraumaBayInpatient: '',
  emergencyDepartmentTraumaBaySocial: '',
  emergencyDepartmentTraumaBayPastoral: '',
  emergencyDepartmentTraumaBayChildLife: '',
  emergencyDepartmentTraumaBayQualityImprovement: '',
  emergencyDepartmentTraumaBayResearchActivities: '',
  emergencyDepartmentTraumaBayEducationActivities: '',
  emergencyDepartmentTraumaBayFamilySupport: '',
  emergencyDepartmentTraumaBayDisasterPreparedness: '',
  emergencyDepartmentTraumaBayInjuryPrevention: '',
  emergencyDepartmentTraumaBayTransportCoordination: '',
  emergencyDepartmentTraumaBayRehabilitationCoordination: '',
  emergencyDepartmentTraumaBayOutpatientCoordination: '',
  emergencyDepartmentTraumaBayInpatientCoordination: '',
  emergencyDepartmentTraumaBaySocialWorkCoordination: '',
  emergencyDepartmentTraumaBayPastoralCareCoordination: '',
  emergencyDepartmentTraumaBayChildLifeCoordination: '',
  emergencyDepartmentTraumaBayQualityImprovementCoordination: '',
  emergencyDepartmentTraumaBayResearchCoordination: '',
  emergencyDepartmentTraumaBayEducationCoordination: '',
  emergencyDepartmentTraumaBayFamilySupportCoordination: '',
  emergencyDepartmentTraumaBayDisasterPreparednessCoordination: '',
  emergencyDepartmentTraumaBayInjuryPreventionCoordination: '',
  emergencyDepartmentTraumaBayTransportDocumentation: '',
  emergencyDepartmentTraumaBayRehabilitationDocumentation: '',
  emergencyDepartmentTraumaBayOutpatientDocumentation: '',
  emergencyDepartmentTraumaBayInpatientDocumentation: '',
  emergencyDepartmentTraumaBaySocialWorkDocumentation: '',
  emergencyDepartmentTraumaBayPastoralCareDocumentation: '',
  emergencyDepartmentTraumaBayChildLifeDocumentation: '',
  emergencyDepartmentTraumaBayQualityImprovementDocumentation: '',
  emergencyDepartmentTraumaBayResearchDocumentation: '',
  emergencyDepartmentTraumaBayEducationDocumentation: '',
  emergencyDepartmentTraumaBayFamilySupportDocumentation: '',
  emergencyDepartmentTraumaBayDisasterPreparednessDocumentation: '',
  emergencyDepartmentTraumaBayInjuryPreventionDocumentation: '',
  emergencyDepartmentTraumaBayTransportQuality: '',
  emergencyDepartmentTraumaBayRehabilitationQuality: '',
  emergencyDepartmentTraumaBayOutpatientQuality: '',
  emergencyDepartmentTraumaBayInpatientQuality: '',
  emergencyDepartmentTraumaBaySocialWorkQuality: '',
  emergencyDepartmentTraumaBayPastoralCareQuality: '',
  emergencyDepartmentTraumaBayChildLifeQuality: '',
  emergencyDepartmentTraumaBayQualityImprovementQuality: '',
  emergencyDepartmentTraumaBayResearchQuality: '',
  emergencyDepartmentTraumaBayEducationQuality: '',
  emergencyDepartmentTraumaBayFamilySupportQuality: '',
  emergencyDepartmentTraumaBayDisasterPreparednessQuality: '',
  emergencyDepartmentTraumaBayInjuryPreventionQuality: '',
  emergencyDepartmentTraumaBayTransportResearch: '',
  emergencyDepartmentTraumaBayRehabilitationResearch: '',
  emergencyDepartmentTraumaBayOutpatientResearch: '',
  emergencyDepartmentTraumaBayInpatientResearch: '',
  emergencyDepartmentTraumaBaySocialWorkResearch: '',
  emergencyDepartmentTraumaBayPastoralCareResearch: '',
  emergencyDepartmentTraumaBayChildLifeResearch: '',
  emergencyDepartmentTraumaBayQualityImprovementResearch: '',
  emergencyDepartmentTraumaBayEducationResearch: '',
  emergencyDepartmentTraumaBayFamilySupportResearch: '',
  emergencyDepartmentTraumaBayDisasterPreparednessResearch: '',
  emergencyDepartmentTraumaBayInjuryPreventionResearch: '',
  emergencyDepartmentTraumaBayTransportEducation: '',
  emergencyDepartmentTraumaBayRehabilitationEducation: '',
  emergencyDepartmentTraumaBayOutpatientEducation: '',
  emergencyDepartmentTraumaBayInpatientEducation: '',
  emergencyDepartmentTraumaBaySocialWorkEducation: '',
  emergencyDepartmentTraumaBayPastoralCareEducation: '',
  emergencyDepartmentTraumaBayChildLifeEducation: '',
  emergencyDepartmentTraumaBayQualityImprovementEducation: '',
  emergencyDepartmentTraumaBayResearchEducation: '',
  emergencyDepartmentTraumaBayFamilySupportEducation: '',
  emergencyDepartmentTraumaBayDisasterPreparednessEducation: '',
  emergencyDepartmentTraumaBayInjuryPreventionEducation: '',
  emergencyDepartmentTraumaBayTransportFamily: '',
  emergencyDepartmentTraumaBayRehabilitationFamily: '',
  emergencyDepartmentTraumaBayOutpatientFamily: '',
  emergencyDepartmentTraumaBayInpatientFamily: '',
  emergencyDepartmentTraumaBaySocialWorkFamily: '',
  emergencyDepartmentTraumaBayPastoralCareFamily: '',
  emergencyDepartmentTraumaBayChildLifeFamily: '',
  emergencyDepartmentTraumaBayQualityImprovementFamily: '',
  emergencyDepartmentTraumaBayResearchFamily: '',
  emergencyDepartmentTraumaBayEducationFamily: '',
  emergencyDepartmentTraumaBayFamilySupportFamily: '',
  emergencyDepartmentTraumaBayDisasterPreparednessFamily: '',
  emergencyDepartmentTraumaBayInjuryPreventionFamily: '',
  emergencyDepartmentTraumaBayTransportDisaster: '',
  emergencyDepartmentTraumaBayRehabilitationDisaster: '',
  emergencyDepartmentTraumaBayOutpatientDisaster: '',
  emergencyDepartmentTraumaBayInpatientDisaster: '',
  emergencyDepartmentTraumaBaySocialWorkDisaster: '',
  emergencyDepartmentTraumaBayPastoralCareDisaster: '',
  emergencyDepartmentTraumaBayChildLifeDisaster: '',
  emergencyDepartmentTraumaBayQualityImprovementDisaster: '',
  emergencyDepartmentTraumaBayResearchDisaster: '',
  emergencyDepartmentTraumaBayEducationDisaster: '',
  emergencyDepartmentTraumaBayFamilySupportDisaster: '',
  emergencyDepartmentTraumaBayDisasterPreparednessDisaster: '',
  emergencyDepartmentTraumaBayInjuryPreventionDisaster: '',
  emergencyDepartmentTraumaBayTransportInjury: '',
  emergencyDepartmentTraumaBayRehabilitationInjury: '',
  emergencyDepartmentTraumaBayOutpatientInjury: '',
  emergencyDepartmentTraumaBayInpatientInjury: '',
  emergencyDepartmentTraumaBaySocialWorkInjury: '',
  emergencyDepartmentTraumaBayPastoralCareInjury: '',
  emergencyDepartmentTraumaBayChildLifeInjury: '',
  emergencyDepartmentTraumaBayQualityImprovementInjury: '',
  emergencyDepartmentTraumaBayResearchInjury: '',
  emergencyDepartmentTraumaBayEducationInjury: '',
  emergencyDepartmentTraumaBayFamilySupportInjury: '',
  emergencyDepartmentTraumaBayDisasterPreparednessInjury: '',
  emergencyDepartmentTraumaBayInjuryPreventionInjury: ''
});

export const useUserStorage = () => {
  const { user } = useAuth();

  const saveData = useCallback((data: Partial<StorageData>) => {
    if (!user?.email) return;
    const key = generateStorageKey(user.email);
    const existingData = getData();
    const newData = {
      ...existingData,
      ...data
    };
    localStorage.setItem(key, JSON.stringify(newData));
  }, [user?.email]);

  const getData = useCallback((): StorageData => {
    if (!user?.email) {
      return {
        activities: [],
        milestones: getDefaultMilestones(),
        readinessAssessment: getDefaultReadinessAssessment()
      };
    }

    const key = generateStorageKey(user.email);
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      return {
        activities: [],
        milestones: getDefaultMilestones(),
        readinessAssessment: getDefaultReadinessAssessment()
      };
    }

    try {
      const parsedData = JSON.parse(storedData);
      return {
        activities: parsedData.activities || [],
        milestones: parsedData.milestones || getDefaultMilestones(),
        readinessAssessment: parsedData.readinessAssessment || getDefaultReadinessAssessment()
      };
    } catch (e) {
      console.error('Error parsing stored data:', e);
      return {
        activities: [],
        milestones: getDefaultMilestones(),
        readinessAssessment: getDefaultReadinessAssessment()
      };
    }
  }, [user?.email]);

  return { saveData, getData };
};

export const getReadinessAssessment = async (): Promise<ReadinessAssessment> => {
  try {
    const response = await fetch('/api/readiness-assessment');
    if (!response.ok) {
      throw new Error('Failed to fetch readiness assessment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching readiness assessment:', error);
    // Return default assessment if fetch fails
    return {
      coordinator: {
        identified: undefined,
        type: '',
        dedicatedTime: undefined,
        scope: ''
      },
      components: {
        trauma: undefined,
        emergency: undefined,
        inpatient: undefined,
        outpatient: undefined,
        transport: undefined,
        rehabilitation: undefined,
        childLife: undefined,
        socialWork: undefined,
        pastoralCare: undefined,
        familySupport: undefined,
        quality: undefined,
        research: undefined,
        education: undefined,
        disaster: undefined,
        injury: undefined
      },
      equipment: {
        trauma: {
          airway: undefined,
          breathing: undefined,
          circulation: undefined,
          disability: undefined,
          exposure: undefined
        },
        emergency: {
          airway: undefined,
          breathing: undefined,
          circulation: undefined,
          disability: undefined,
          exposure: undefined
        },
        inpatient: {
          airway: undefined,
          breathing: undefined,
          circulation: undefined,
          disability: undefined,
          exposure: undefined
        },
        outpatient: {
          airway: undefined,
          breathing: undefined,
          circulation: undefined,
          disability: undefined,
          exposure: undefined
        },
        transport: {
          airway: undefined,
          breathing: undefined,
          circulation: undefined,
          disability: undefined,
          exposure: undefined
        },
        rehabilitation: {
          airway: undefined,
          breathing: undefined,
          circulation: undefined,
          disability: undefined,
          exposure: undefined
        }
      },
      patientVolume: {
        totalPatients: '',
        pediatricVolume: 'low',
        totalEDVisits: '',
        pediatricEDVisits: '',
        pediatricICUAdmissions: '',
        pediatricTraumaAdmissions: ''
      },
      hospitalType: '',
      hasEmergencyDepartment: undefined,
      emergencyDepartmentConfiguration: '',
      emergencyDepartmentBeds: '',
      emergencyDepartmentTraumaBays: '',
      emergencyDepartmentTraumaBayConfiguration: '',
      emergencyDepartmentTraumaBayEquipment: '',
      emergencyDepartmentTraumaBayStaffing: '',
      emergencyDepartmentTraumaBayProtocols: '',
      emergencyDepartmentTraumaBayDocumentation: '',
      emergencyDepartmentTraumaBayQuality: '',
      emergencyDepartmentTraumaBayResearch: '',
      emergencyDepartmentTraumaBayEducation: '',
      emergencyDepartmentTraumaBayFamily: '',
      emergencyDepartmentTraumaBayDisaster: '',
      emergencyDepartmentTraumaBayInjury: '',
      emergencyDepartmentTraumaBayTransport: '',
      emergencyDepartmentTraumaBayRehabilitation: '',
      emergencyDepartmentTraumaBayOutpatient: '',
      emergencyDepartmentTraumaBayInpatient: '',
      emergencyDepartmentTraumaBaySocial: '',
      emergencyDepartmentTraumaBayPastoral: '',
      emergencyDepartmentTraumaBayChildLife: '',
      emergencyDepartmentTraumaBayQualityImprovement: '',
      emergencyDepartmentTraumaBayResearchActivities: '',
      emergencyDepartmentTraumaBayEducationActivities: '',
      emergencyDepartmentTraumaBayFamilySupport: '',
      emergencyDepartmentTraumaBayDisasterPreparedness: '',
      emergencyDepartmentTraumaBayInjuryPrevention: '',
      emergencyDepartmentTraumaBayTransportCoordination: '',
      emergencyDepartmentTraumaBayRehabilitationCoordination: '',
      emergencyDepartmentTraumaBayOutpatientCoordination: '',
      emergencyDepartmentTraumaBayInpatientCoordination: '',
      emergencyDepartmentTraumaBaySocialWorkCoordination: '',
      emergencyDepartmentTraumaBayPastoralCareCoordination: '',
      emergencyDepartmentTraumaBayChildLifeCoordination: '',
      emergencyDepartmentTraumaBayQualityImprovementCoordination: '',
      emergencyDepartmentTraumaBayResearchCoordination: '',
      emergencyDepartmentTraumaBayEducationCoordination: '',
      emergencyDepartmentTraumaBayFamilySupportCoordination: '',
      emergencyDepartmentTraumaBayDisasterPreparednessCoordination: '',
      emergencyDepartmentTraumaBayInjuryPreventionCoordination: '',
      emergencyDepartmentTraumaBayTransportDocumentation: '',
      emergencyDepartmentTraumaBayRehabilitationDocumentation: '',
      emergencyDepartmentTraumaBayOutpatientDocumentation: '',
      emergencyDepartmentTraumaBayInpatientDocumentation: '',
      emergencyDepartmentTraumaBaySocialWorkDocumentation: '',
      emergencyDepartmentTraumaBayPastoralCareDocumentation: '',
      emergencyDepartmentTraumaBayChildLifeDocumentation: '',
      emergencyDepartmentTraumaBayQualityImprovementDocumentation: '',
      emergencyDepartmentTraumaBayResearchDocumentation: '',
      emergencyDepartmentTraumaBayEducationDocumentation: '',
      emergencyDepartmentTraumaBayFamilySupportDocumentation: '',
      emergencyDepartmentTraumaBayDisasterPreparednessDocumentation: '',
      emergencyDepartmentTraumaBayInjuryPreventionDocumentation: '',
      emergencyDepartmentTraumaBayTransportQuality: '',
      emergencyDepartmentTraumaBayRehabilitationQuality: '',
      emergencyDepartmentTraumaBayOutpatientQuality: '',
      emergencyDepartmentTraumaBayInpatientQuality: '',
      emergencyDepartmentTraumaBaySocialWorkQuality: '',
      emergencyDepartmentTraumaBayPastoralCareQuality: '',
      emergencyDepartmentTraumaBayChildLifeQuality: '',
      emergencyDepartmentTraumaBayQualityImprovementQuality: '',
      emergencyDepartmentTraumaBayResearchQuality: '',
      emergencyDepartmentTraumaBayEducationQuality: '',
      emergencyDepartmentTraumaBayFamilySupportQuality: '',
      emergencyDepartmentTraumaBayDisasterPreparednessQuality: '',
      emergencyDepartmentTraumaBayInjuryPreventionQuality: '',
      emergencyDepartmentTraumaBayTransportResearch: '',
      emergencyDepartmentTraumaBayRehabilitationResearch: '',
      emergencyDepartmentTraumaBayOutpatientResearch: '',
      emergencyDepartmentTraumaBayInpatientResearch: '',
      emergencyDepartmentTraumaBaySocialWorkResearch: '',
      emergencyDepartmentTraumaBayPastoralCareResearch: '',
      emergencyDepartmentTraumaBayChildLifeResearch: '',
      emergencyDepartmentTraumaBayQualityImprovementResearch: '',
      emergencyDepartmentTraumaBayEducationResearch: '',
      emergencyDepartmentTraumaBayFamilySupportResearch: '',
      emergencyDepartmentTraumaBayDisasterPreparednessResearch: '',
      emergencyDepartmentTraumaBayInjuryPreventionResearch: '',
      emergencyDepartmentTraumaBayTransportEducation: '',
      emergencyDepartmentTraumaBayRehabilitationEducation: '',
      emergencyDepartmentTraumaBayOutpatientEducation: '',
      emergencyDepartmentTraumaBayInpatientEducation: '',
      emergencyDepartmentTraumaBaySocialWorkEducation: '',
      emergencyDepartmentTraumaBayPastoralCareEducation: '',
      emergencyDepartmentTraumaBayChildLifeEducation: '',
      emergencyDepartmentTraumaBayQualityImprovementEducation: '',
      emergencyDepartmentTraumaBayResearchEducation: '',
      emergencyDepartmentTraumaBayFamilySupportEducation: '',
      emergencyDepartmentTraumaBayDisasterPreparednessEducation: '',
      emergencyDepartmentTraumaBayInjuryPreventionEducation: '',
      emergencyDepartmentTraumaBayTransportFamily: '',
      emergencyDepartmentTraumaBayRehabilitationFamily: '',
      emergencyDepartmentTraumaBayOutpatientFamily: '',
      emergencyDepartmentTraumaBayInpatientFamily: '',
      emergencyDepartmentTraumaBaySocialWorkFamily: '',
      emergencyDepartmentTraumaBayPastoralCareFamily: '',
      emergencyDepartmentTraumaBayChildLifeFamily: '',
      emergencyDepartmentTraumaBayQualityImprovementFamily: '',
      emergencyDepartmentTraumaBayResearchFamily: '',
      emergencyDepartmentTraumaBayEducationFamily: '',
      emergencyDepartmentTraumaBayFamilySupportFamily: '',
      emergencyDepartmentTraumaBayDisasterPreparednessFamily: '',
      emergencyDepartmentTraumaBayInjuryPreventionFamily: '',
      emergencyDepartmentTraumaBayTransportDisaster: '',
      emergencyDepartmentTraumaBayRehabilitationDisaster: '',
      emergencyDepartmentTraumaBayOutpatientDisaster: '',
      emergencyDepartmentTraumaBayInpatientDisaster: '',
      emergencyDepartmentTraumaBaySocialWorkDisaster: '',
      emergencyDepartmentTraumaBayPastoralCareDisaster: '',
      emergencyDepartmentTraumaBayChildLifeDisaster: '',
      emergencyDepartmentTraumaBayQualityImprovementDisaster: '',
      emergencyDepartmentTraumaBayResearchDisaster: '',
      emergencyDepartmentTraumaBayEducationDisaster: '',
      emergencyDepartmentTraumaBayFamilySupportDisaster: '',
      emergencyDepartmentTraumaBayDisasterPreparednessDisaster: '',
      emergencyDepartmentTraumaBayInjuryPreventionDisaster: '',
      emergencyDepartmentTraumaBayTransportInjury: '',
      emergencyDepartmentTraumaBayRehabilitationInjury: '',
      emergencyDepartmentTraumaBayOutpatientInjury: '',
      emergencyDepartmentTraumaBayInpatientInjury: '',
      emergencyDepartmentTraumaBaySocialWorkInjury: '',
      emergencyDepartmentTraumaBayPastoralCareInjury: '',
      emergencyDepartmentTraumaBayChildLifeInjury: '',
      emergencyDepartmentTraumaBayQualityImprovementInjury: '',
      emergencyDepartmentTraumaBayResearchInjury: '',
      emergencyDepartmentTraumaBayEducationInjury: '',
      emergencyDepartmentTraumaBayFamilySupportInjury: '',
      emergencyDepartmentTraumaBayDisasterPreparednessInjury: '',
      emergencyDepartmentTraumaBayInjuryPreventionInjury: ''
    };
  }
};

export const saveReadinessAssessment = async (assessment: ReadinessAssessment, userEmail: string): Promise<void> => {
  try {
    if (!userEmail) {
      throw new Error('No user email provided');
    }
    
    const key = generateStorageKey(userEmail);
    const storedData = localStorage.getItem(key);
    const existingData = storedData ? JSON.parse(storedData) : {
      activities: [],
      milestones: getDefaultMilestones(),
      readinessAssessment: getDefaultReadinessAssessment()
    };
    
    const newData = {
      ...existingData,
      readinessAssessment: assessment
    };
    
    localStorage.setItem(key, JSON.stringify(newData));
  } catch (error) {
    console.error('Error saving readiness assessment:', error);
    throw error;
  }
}; 