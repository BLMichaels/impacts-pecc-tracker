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
  contactInfo: {
    name: string;
    title: string;
    phone: string;
    email: string;
    facilityName: string;
    facilityAddress: string;
    facilityCity: string;
    facilityZip: string;
  };
  facilityInfo: {
    has24HourED: boolean | undefined;
    hospitalType: string;
    otherHospitalType?: string;
    edConfiguration: string;
    otherEDConfig?: string;
  };
  traumaDesignation: {
    isTraumaCenter: boolean | undefined;
    verificationBodies: {
      acs: boolean | undefined;
      stateRegional: boolean | undefined;
    };
    adultLevel: string;
    pediatricLevel: string;
  };
  inpatientServices: {
    newbornNursery: boolean | undefined;
    nicu: boolean | undefined;
    picu: boolean | undefined;
    pediatricStepDown: boolean | undefined;
    pediatricWard: boolean | undefined;
    adultICU: boolean | undefined;
    adultStepDown: boolean | undefined;
    adultWard: boolean | undefined;
    childrenInAdultICU?: boolean | undefined;
    childrenInAdultStepDown?: boolean | undefined;
    childrenInAdultWard?: boolean | undefined;
  };
  administration: {
    physicianCoordinator: {
      hasCoordinator: boolean | undefined;
      type: string;
      hasDedicatedTime: boolean | undefined;
      scope: string;
    };
    nurseCoordinator: {
      hasCoordinator: boolean | undefined;
      type: string;
      hasDedicatedTime: boolean | undefined;
      scope: string;
    };
    hasPediatricED: boolean | undefined;
    hasPediatricInpatient: boolean | undefined;
    hasPediatricICU: boolean | undefined;
    hasPediatricSurgery: boolean | undefined;
  };
  personnel: {
    has24HourPhysician: boolean | undefined;
    hasPediatrician: boolean | undefined;
    hasPediatricEM: boolean | undefined;
    hasPediatricNurse: boolean | undefined;
    hasPediatricRT: boolean | undefined;
    hasPALS: boolean | undefined;
    hasENPC: boolean | undefined;
    hasTNCC: boolean | undefined;
    hasATLS: boolean | undefined;
  };
  qualityImprovement: {
    hasQIPlan: boolean | undefined;
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
  };
  patientSafety: {
    weightInKg: boolean | undefined;
    weightRecordedInKg: boolean | undefined;
    vitalsRecorded: boolean | undefined;
    bloodPressureMonitoring: boolean | undefined;
    pulseOximetry: boolean | undefined;
    endTidalCO2: boolean | undefined;
    abnormalVitalsNotification: boolean | undefined;
    preCalculatedDosing: boolean | undefined;
    interpreterServices: boolean | undefined;
    consciousnessAssessment: boolean | undefined;
    painAssessment: boolean | undefined;
    hasPediatricSafety: boolean | undefined;
    hasPediatricMedication: boolean | undefined;
    hasPediatricEquipment: boolean | undefined;
    hasPediatricEnvironment: boolean | undefined;
    hasPediatricHandoff: boolean | undefined;
    hasPediatricTransfer: boolean | undefined;
    hasPediatricDischarge: boolean | undefined;
    hasPediatricFollowup: boolean | undefined;
  };
  policies: {
    triagePolicy: boolean | undefined;
    assessmentReassessment: boolean | undefined;
    immunizationAssessment: boolean | undefined;
    childMaltreatment: boolean | undefined;
    deathInED: boolean | undefined;
    radiationReduction: boolean | undefined;
    behavioralHealth: boolean | undefined;
    transferGuidelines: boolean | undefined;
    hasPediatricAdmission: boolean | undefined;
    hasPediatricTransfer: boolean | undefined;
    hasPediatricConsent: boolean | undefined;
    hasPediatricRestraint: boolean | undefined;
    hasPediatricTriage: boolean | undefined;
    hasPediatricPain: boolean | undefined;
    hasPediatricSedation: boolean | undefined;
    hasPediatricImaging: boolean | undefined;
  };
  familyCenteredCare: {
    hasPolicy: boolean | undefined;
    components: {
      decisionMaking: boolean | undefined;
      medicationSafety: boolean | undefined;
      familyPresence: boolean | undefined;
      education: boolean | undefined;
      bereavement: boolean | undefined;
    };
    hasFamilyPresence: boolean | undefined;
    hasFamilySupport: boolean | undefined;
    hasFamilyEducation: boolean | undefined;
    hasFamilyFeedback: boolean | undefined;
    hasCulturalCompetency: boolean | undefined;
    hasLanguageServices: boolean | undefined;
    hasInterpreter: boolean | undefined;
    hasTranslation: boolean | undefined;
  };
  disasterPlanning: {
    addressesChildren: boolean | undefined;
    components: {
      medicationsSupplies: boolean | undefined;
      decontamination: boolean | undefined;
      familyReunification: boolean | undefined;
      pediatricDrills: boolean | undefined;
      surgeCapacity: boolean | undefined;
      behavioralHealth: boolean | undefined;
      socialServices: boolean | undefined;
      specialNeeds: boolean | undefined;
    };
    hasPediatricDisaster: boolean | undefined;
    hasPediatricMassCasualty: boolean | undefined;
    hasPediatricEvacuation: boolean | undefined;
    hasPediatricShelter: boolean | undefined;
    hasPediatricSupplies: boolean | undefined;
    hasPediatricEquipment: boolean | undefined;
    hasPediatricMedications: boolean | undefined;
    hasPediatricStaff: boolean | undefined;
  };
  equipmentManagement: {
    hasPediatricInventory: boolean | undefined;
    hasPediatricMaintenance: boolean | undefined;
    hasPediatricCalibration: boolean | undefined;
    hasPediatricReplacement: boolean | undefined;
    hasPediatricTraining: boolean | undefined;
    hasPediatricCompetency: boolean | undefined;
    hasPediatricDocumentation: boolean | undefined;
    hasPediatricQuality: boolean | undefined;
  };
  monitoringEquipment: {
    hasPediatricStethoscope: boolean | undefined;
    hasPediatricBP: boolean | undefined;
    hasPediatricThermometer: boolean | undefined;
    hasPediatricScale: boolean | undefined;
    hasPediatricECG: boolean | undefined;
    hasPediatricPulse: boolean | undefined;
    hasPediatricETCO2: boolean | undefined;
    hasPediatricGlucose: boolean | undefined;
  };
  resuscitationEquipment: {
    gauge22: boolean | undefined;
    gauge24: boolean | undefined;
    ioNeedles: boolean | undefined;
    ivAdministration: boolean | undefined;
    hasPediatricBag: boolean | undefined;
    hasPediatricSuction: boolean | undefined;
    hasPediatricOxygen: boolean | undefined;
    hasPediatricDefibrillator: boolean | undefined;
    hasPediatricETT: boolean | undefined;
    hasPediatricLMA: boolean | undefined;
    hasPediatricIO: boolean | undefined;
    hasPediatricChest: boolean | undefined;
  };
  respiratoryEquipment: {
    hasPediatricNebulizer: boolean | undefined;
    hasPediatricSpacer: boolean | undefined;
    hasPediatricMetered: boolean | undefined;
    hasPediatricCPAP: boolean | undefined;
    hasPediatricVentilator: boolean | undefined;
    hasPediatricHighFlow: boolean | undefined;
    hasPediatricSuction: boolean | undefined;
    hasPediatricChest: boolean | undefined;
  };
  patientVolume: {
    totalPatients: string;
    pediatricVolume: 'low' | 'medium' | 'medium-high' | 'high';
    totalEDVisits: string;
    pediatricEDVisits: string;
    pediatricICUAdmissions: string;
    pediatricTraumaAdmissions: string;
  };
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
  contactInfo: {
    name: '',
    title: '',
    phone: '',
    email: '',
    facilityName: '',
    facilityAddress: '',
    facilityCity: '',
    facilityZip: ''
  },
  facilityInfo: {
    has24HourED: undefined,
    hospitalType: '',
    otherHospitalType: '',
    edConfiguration: '',
    otherEDConfig: ''
  },
  traumaDesignation: {
    isTraumaCenter: undefined,
    verificationBodies: {
      acs: undefined,
      stateRegional: undefined
    },
    adultLevel: '',
    pediatricLevel: ''
  },
  inpatientServices: {
    newbornNursery: undefined,
    nicu: undefined,
    picu: undefined,
    pediatricStepDown: undefined,
    pediatricWard: undefined,
    adultICU: undefined,
    adultStepDown: undefined,
    adultWard: undefined,
    childrenInAdultICU: undefined,
    childrenInAdultStepDown: undefined,
    childrenInAdultWard: undefined
  },
  administration: {
    physicianCoordinator: {
      hasCoordinator: undefined,
      type: '',
      hasDedicatedTime: undefined,
      scope: ''
    },
    nurseCoordinator: {
      hasCoordinator: undefined,
      type: '',
      hasDedicatedTime: undefined,
      scope: ''
    },
    hasPediatricED: undefined,
    hasPediatricInpatient: undefined,
    hasPediatricICU: undefined,
    hasPediatricSurgery: undefined
  },
  personnel: {
    has24HourPhysician: undefined,
    hasPediatrician: undefined,
    hasPediatricEM: undefined,
    hasPediatricNurse: undefined,
    hasPediatricRT: undefined,
    hasPALS: undefined,
    hasENPC: undefined,
    hasTNCC: undefined,
    hasATLS: undefined
  },
  qualityImprovement: {
    hasQIPlan: undefined,
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
    }
  },
  patientSafety: {
    weightInKg: undefined,
    weightRecordedInKg: undefined,
    vitalsRecorded: undefined,
    bloodPressureMonitoring: undefined,
    pulseOximetry: undefined,
    endTidalCO2: undefined,
    abnormalVitalsNotification: undefined,
    preCalculatedDosing: undefined,
    interpreterServices: undefined,
    consciousnessAssessment: undefined,
    painAssessment: undefined,
    hasPediatricSafety: undefined,
    hasPediatricMedication: undefined,
    hasPediatricEquipment: undefined,
    hasPediatricEnvironment: undefined,
    hasPediatricHandoff: undefined,
    hasPediatricTransfer: undefined,
    hasPediatricDischarge: undefined,
    hasPediatricFollowup: undefined
  },
  policies: {
    triagePolicy: undefined,
    assessmentReassessment: undefined,
    immunizationAssessment: undefined,
    childMaltreatment: undefined,
    deathInED: undefined,
    radiationReduction: undefined,
    behavioralHealth: undefined,
    transferGuidelines: undefined,
    hasPediatricAdmission: undefined,
    hasPediatricTransfer: undefined,
    hasPediatricConsent: undefined,
    hasPediatricRestraint: undefined,
    hasPediatricTriage: undefined,
    hasPediatricPain: undefined,
    hasPediatricSedation: undefined,
    hasPediatricImaging: undefined
  },
  familyCenteredCare: {
    hasPolicy: undefined,
    components: {
      decisionMaking: undefined,
      medicationSafety: undefined,
      familyPresence: undefined,
      education: undefined,
      bereavement: undefined
    },
    hasFamilyPresence: undefined,
    hasFamilySupport: undefined,
    hasFamilyEducation: undefined,
    hasFamilyFeedback: undefined,
    hasCulturalCompetency: undefined,
    hasLanguageServices: undefined,
    hasInterpreter: undefined,
    hasTranslation: undefined
  },
  disasterPlanning: {
    addressesChildren: undefined,
    components: {
      medicationsSupplies: undefined,
      decontamination: undefined,
      familyReunification: undefined,
      pediatricDrills: undefined,
      surgeCapacity: undefined,
      behavioralHealth: undefined,
      socialServices: undefined,
      specialNeeds: undefined
    },
    hasPediatricDisaster: undefined,
    hasPediatricMassCasualty: undefined,
    hasPediatricEvacuation: undefined,
    hasPediatricShelter: undefined,
    hasPediatricSupplies: undefined,
    hasPediatricEquipment: undefined,
    hasPediatricMedications: undefined,
    hasPediatricStaff: undefined
  },
  equipmentManagement: {
    hasPediatricInventory: undefined,
    hasPediatricMaintenance: undefined,
    hasPediatricCalibration: undefined,
    hasPediatricReplacement: undefined,
    hasPediatricTraining: undefined,
    hasPediatricCompetency: undefined,
    hasPediatricDocumentation: undefined,
    hasPediatricQuality: undefined
  },
  monitoringEquipment: {
    hasPediatricStethoscope: undefined,
    hasPediatricBP: undefined,
    hasPediatricThermometer: undefined,
    hasPediatricScale: undefined,
    hasPediatricECG: undefined,
    hasPediatricPulse: undefined,
    hasPediatricETCO2: undefined,
    hasPediatricGlucose: undefined
  },
  resuscitationEquipment: {
    gauge22: undefined,
    gauge24: undefined,
    ioNeedles: undefined,
    ivAdministration: undefined,
    hasPediatricBag: undefined,
    hasPediatricSuction: undefined,
    hasPediatricOxygen: undefined,
    hasPediatricDefibrillator: undefined,
    hasPediatricETT: undefined,
    hasPediatricLMA: undefined,
    hasPediatricIO: undefined,
    hasPediatricChest: undefined
  },
  respiratoryEquipment: {
    hasPediatricNebulizer: undefined,
    hasPediatricSpacer: undefined,
    hasPediatricMetered: undefined,
    hasPediatricCPAP: undefined,
    hasPediatricVentilator: undefined,
    hasPediatricHighFlow: undefined,
    hasPediatricSuction: undefined,
    hasPediatricChest: undefined
  },
  patientVolume: {
    totalPatients: '',
    pediatricVolume: 'low',
    totalEDVisits: '',
    pediatricEDVisits: '',
    pediatricICUAdmissions: '',
    pediatricTraumaAdmissions: ''
  }
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
      contactInfo: {
        name: '',
        title: '',
        phone: '',
        email: '',
        facilityName: '',
        facilityAddress: '',
        facilityCity: '',
        facilityZip: ''
      },
      facilityInfo: {
        has24HourED: undefined,
        hospitalType: '',
        otherHospitalType: '',
        edConfiguration: '',
        otherEDConfig: ''
      },
      traumaDesignation: {
        isTraumaCenter: undefined,
        verificationBodies: {
          acs: undefined,
          stateRegional: undefined
        },
        adultLevel: '',
        pediatricLevel: ''
      },
      inpatientServices: {
        newbornNursery: undefined,
        nicu: undefined,
        picu: undefined,
        pediatricStepDown: undefined,
        pediatricWard: undefined,
        adultICU: undefined,
        adultStepDown: undefined,
        adultWard: undefined,
        childrenInAdultICU: undefined,
        childrenInAdultStepDown: undefined,
        childrenInAdultWard: undefined
      },
      administration: {
        physicianCoordinator: {
          hasCoordinator: undefined,
          type: '',
          hasDedicatedTime: undefined,
          scope: ''
        },
        nurseCoordinator: {
          hasCoordinator: undefined,
          type: '',
          hasDedicatedTime: undefined,
          scope: ''
        },
        hasPediatricED: undefined,
        hasPediatricInpatient: undefined,
        hasPediatricICU: undefined,
        hasPediatricSurgery: undefined
      },
      personnel: {
        has24HourPhysician: undefined,
        hasPediatrician: undefined,
        hasPediatricEM: undefined,
        hasPediatricNurse: undefined,
        hasPediatricRT: undefined,
        hasPALS: undefined,
        hasENPC: undefined,
        hasTNCC: undefined,
        hasATLS: undefined
      },
      qualityImprovement: {
        hasQIPlan: undefined,
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
        }
      },
      patientSafety: {
        weightInKg: undefined,
        weightRecordedInKg: undefined,
        vitalsRecorded: undefined,
        bloodPressureMonitoring: undefined,
        pulseOximetry: undefined,
        endTidalCO2: undefined,
        abnormalVitalsNotification: undefined,
        preCalculatedDosing: undefined,
        interpreterServices: undefined,
        consciousnessAssessment: undefined,
        painAssessment: undefined,
        hasPediatricSafety: undefined,
        hasPediatricMedication: undefined,
        hasPediatricEquipment: undefined,
        hasPediatricEnvironment: undefined,
        hasPediatricHandoff: undefined,
        hasPediatricTransfer: undefined,
        hasPediatricDischarge: undefined,
        hasPediatricFollowup: undefined
      },
      policies: {
        triagePolicy: undefined,
        assessmentReassessment: undefined,
        immunizationAssessment: undefined,
        childMaltreatment: undefined,
        deathInED: undefined,
        radiationReduction: undefined,
        behavioralHealth: undefined,
        transferGuidelines: undefined,
        hasPediatricAdmission: undefined,
        hasPediatricTransfer: undefined,
        hasPediatricConsent: undefined,
        hasPediatricRestraint: undefined,
        hasPediatricTriage: undefined,
        hasPediatricPain: undefined,
        hasPediatricSedation: undefined,
        hasPediatricImaging: undefined
      },
      familyCenteredCare: {
        hasPolicy: undefined,
        components: {
          decisionMaking: undefined,
          medicationSafety: undefined,
          familyPresence: undefined,
          education: undefined,
          bereavement: undefined
        },
        hasFamilyPresence: undefined,
        hasFamilySupport: undefined,
        hasFamilyEducation: undefined,
        hasFamilyFeedback: undefined,
        hasCulturalCompetency: undefined,
        hasLanguageServices: undefined,
        hasInterpreter: undefined,
        hasTranslation: undefined
      },
      disasterPlanning: {
        addressesChildren: undefined,
        components: {
          medicationsSupplies: undefined,
          decontamination: undefined,
          familyReunification: undefined,
          pediatricDrills: undefined,
          surgeCapacity: undefined,
          behavioralHealth: undefined,
          socialServices: undefined,
          specialNeeds: undefined
        },
        hasPediatricDisaster: undefined,
        hasPediatricMassCasualty: undefined,
        hasPediatricEvacuation: undefined,
        hasPediatricShelter: undefined,
        hasPediatricSupplies: undefined,
        hasPediatricEquipment: undefined,
        hasPediatricMedications: undefined,
        hasPediatricStaff: undefined
      },
      equipmentManagement: {
        hasPediatricInventory: undefined,
        hasPediatricMaintenance: undefined,
        hasPediatricCalibration: undefined,
        hasPediatricReplacement: undefined,
        hasPediatricTraining: undefined,
        hasPediatricCompetency: undefined,
        hasPediatricDocumentation: undefined,
        hasPediatricQuality: undefined
      },
      monitoringEquipment: {
        hasPediatricStethoscope: undefined,
        hasPediatricBP: undefined,
        hasPediatricThermometer: undefined,
        hasPediatricScale: undefined,
        hasPediatricECG: undefined,
        hasPediatricPulse: undefined,
        hasPediatricETCO2: undefined,
        hasPediatricGlucose: undefined
      },
      resuscitationEquipment: {
        gauge22: undefined,
        gauge24: undefined,
        ioNeedles: undefined,
        ivAdministration: undefined,
        hasPediatricBag: undefined,
        hasPediatricSuction: undefined,
        hasPediatricOxygen: undefined,
        hasPediatricDefibrillator: undefined,
        hasPediatricETT: undefined,
        hasPediatricLMA: undefined,
        hasPediatricIO: undefined,
        hasPediatricChest: undefined
      },
      respiratoryEquipment: {
        hasPediatricNebulizer: undefined,
        hasPediatricSpacer: undefined,
        hasPediatricMetered: undefined,
        hasPediatricCPAP: undefined,
        hasPediatricVentilator: undefined,
        hasPediatricHighFlow: undefined,
        hasPediatricSuction: undefined,
        hasPediatricChest: undefined
      },
      patientVolume: {
        totalPatients: '',
        pediatricVolume: 'low',
        totalEDVisits: '',
        pediatricEDVisits: '',
        pediatricICUAdmissions: '',
        pediatricTraumaAdmissions: ''
      }
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