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
    has24HourED: boolean;
    hospitalType: string;
    otherHospitalType?: string;
    edConfiguration: string;
    otherEDConfig?: string;
  };
  traumaDesignation: {
    isTraumaCenter: boolean;
    verificationBodies: {
      acs: boolean;
      stateRegional: boolean;
    };
    adultLevel: string;
    pediatricLevel: string;
  };
  inpatientServices: {
    newbornNursery: boolean;
    nicu: boolean;
    picu: boolean;
    pediatricStepDown: boolean;
    pediatricWard: boolean;
    adultICU: boolean;
    adultStepDown: boolean;
    adultWard: boolean;
    childrenInAdultICU?: boolean;
    childrenInAdultStepDown?: boolean;
    childrenInAdultWard?: boolean;
  };
  administration: {
    physicianCoordinator: {
      hasCoordinator: boolean;
      type: string;
      hasDedicatedTime: boolean;
      scope: string;
    };
    nurseCoordinator: {
      hasCoordinator: boolean;
      type: string;
      hasDedicatedTime: boolean;
      scope: string;
    };
    hasPediatricED: boolean;
    hasPediatricInpatient: boolean;
    hasPediatricICU: boolean;
    hasPediatricSurgery: boolean;
  };
  personnel: {
    has24HourPhysician: boolean;
    hasPediatrician: boolean;
    hasPediatricEM: boolean;
    hasPediatricNurse: boolean;
    hasPediatricRT: boolean;
    hasPALS: boolean;
    hasENPC: boolean;
    hasTNCC: boolean;
    hasATLS: boolean;
  };
  qualityImprovement: {
    hasQIPlan: boolean;
    components: {
      trauma: boolean;
      emergency: boolean;
      inpatient: boolean;
      outpatient: boolean;
      transport: boolean;
      rehabilitation: boolean;
      childLife: boolean;
      socialWork: boolean;
      pastoralCare: boolean;
      familySupport: boolean;
      quality: boolean;
      research: boolean;
      education: boolean;
      disaster: boolean;
      injury: boolean;
    };
  };
  patientSafety: {
    weightInKg: boolean;
    weightRecordedInKg: boolean;
    vitalsRecorded: boolean;
    bloodPressureMonitoring: boolean;
    pulseOximetry: boolean;
    endTidalCO2: boolean;
    abnormalVitalsNotification: boolean;
    preCalculatedDosing: boolean;
    interpreterServices: boolean;
    consciousnessAssessment: boolean;
    painAssessment: boolean;
    hasPediatricSafety: boolean;
    hasPediatricMedication: boolean;
    hasPediatricEquipment: boolean;
    hasPediatricEnvironment: boolean;
    hasPediatricHandoff: boolean;
    hasPediatricTransfer: boolean;
    hasPediatricDischarge: boolean;
    hasPediatricFollowup: boolean;
  };
  policies: {
    triagePolicy: boolean;
    assessmentReassessment: boolean;
    immunizationAssessment: boolean;
    childMaltreatment: boolean;
    deathInED: boolean;
    radiationReduction: boolean;
    behavioralHealth: boolean;
    transferGuidelines: boolean;
    hasPediatricAdmission: boolean;
    hasPediatricTransfer: boolean;
    hasPediatricConsent: boolean;
    hasPediatricRestraint: boolean;
    hasPediatricTriage: boolean;
    hasPediatricPain: boolean;
    hasPediatricSedation: boolean;
    hasPediatricImaging: boolean;
  };
  familyCenteredCare: {
    hasPolicy: boolean;
    components: {
      decisionMaking: boolean;
      medicationSafety: boolean;
      familyPresence: boolean;
      education: boolean;
      bereavement: boolean;
    };
    hasFamilyPresence: boolean;
    hasFamilySupport: boolean;
    hasFamilyEducation: boolean;
    hasFamilyFeedback: boolean;
    hasCulturalCompetency: boolean;
    hasLanguageServices: boolean;
    hasInterpreter: boolean;
    hasTranslation: boolean;
  };
  disasterPlanning: {
    addressesChildren: boolean;
    components: {
      medicationsSupplies: boolean;
      decontamination: boolean;
      familyReunification: boolean;
      pediatricDrills: boolean;
      surgeCapacity: boolean;
      behavioralHealth: boolean;
      socialServices: boolean;
      specialNeeds: boolean;
    };
    hasPediatricDisaster: boolean;
    hasPediatricMassCasualty: boolean;
    hasPediatricEvacuation: boolean;
    hasPediatricShelter: boolean;
    hasPediatricSupplies: boolean;
    hasPediatricEquipment: boolean;
    hasPediatricMedications: boolean;
    hasPediatricStaff: boolean;
  };
  equipmentManagement: {
    hasPediatricInventory: boolean;
    hasPediatricMaintenance: boolean;
    hasPediatricCalibration: boolean;
    hasPediatricReplacement: boolean;
    hasPediatricTraining: boolean;
    hasPediatricCompetency: boolean;
    hasPediatricDocumentation: boolean;
    hasPediatricQuality: boolean;
  };
  monitoringEquipment: {
    hasPediatricStethoscope: boolean;
    hasPediatricBP: boolean;
    hasPediatricThermometer: boolean;
    hasPediatricScale: boolean;
    hasPediatricECG: boolean;
    hasPediatricPulse: boolean;
    hasPediatricETCO2: boolean;
    hasPediatricGlucose: boolean;
  };
  resuscitationEquipment: {
    gauge22: boolean;
    gauge24: boolean;
    ioNeedles: boolean;
    ivAdministration: boolean;
    hasPediatricBag: boolean;
    hasPediatricSuction: boolean;
    hasPediatricOxygen: boolean;
    hasPediatricDefibrillator: boolean;
    hasPediatricETT: boolean;
    hasPediatricLMA: boolean;
    hasPediatricIO: boolean;
    hasPediatricChest: boolean;
  };
  respiratoryEquipment: {
    hasPediatricNebulizer: boolean;
    hasPediatricSpacer: boolean;
    hasPediatricMetered: boolean;
    hasPediatricCPAP: boolean;
    hasPediatricVentilator: boolean;
    hasPediatricHighFlow: boolean;
    hasPediatricSuction: boolean;
    hasPediatricChest: boolean;
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

const defaultEmptyAssessment = (): ReadinessAssessment => ({
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
    has24HourED: false,
    hospitalType: '',
    edConfiguration: ''
  },
  traumaDesignation: {
    isTraumaCenter: false,
    verificationBodies: {
      acs: false,
      stateRegional: false
    },
    adultLevel: '',
    pediatricLevel: ''
  },
  inpatientServices: {
    newbornNursery: false,
    nicu: false,
    picu: false,
    pediatricStepDown: false,
    pediatricWard: false,
    adultICU: false,
    adultStepDown: false,
    adultWard: false
  },
  administration: {
    physicianCoordinator: {
      hasCoordinator: false,
      type: '',
      hasDedicatedTime: false,
      scope: ''
    },
    nurseCoordinator: {
      hasCoordinator: false,
      type: '',
      hasDedicatedTime: false,
      scope: ''
    },
    hasPediatricED: false,
    hasPediatricInpatient: false,
    hasPediatricICU: false,
    hasPediatricSurgery: false
  },
  personnel: {
    has24HourPhysician: false,
    hasPediatrician: false,
    hasPediatricEM: false,
    hasPediatricNurse: false,
    hasPediatricRT: false,
    hasPALS: false,
    hasENPC: false,
    hasTNCC: false,
    hasATLS: false
  },
  qualityImprovement: {
    hasQIPlan: false,
    components: {
      trauma: false,
      emergency: false,
      inpatient: false,
      outpatient: false,
      transport: false,
      rehabilitation: false,
      childLife: false,
      socialWork: false,
      pastoralCare: false,
      familySupport: false,
      quality: false,
      research: false,
      education: false,
      disaster: false,
      injury: false
    }
  },
  patientSafety: {
    weightInKg: false,
    weightRecordedInKg: false,
    vitalsRecorded: false,
    bloodPressureMonitoring: false,
    pulseOximetry: false,
    endTidalCO2: false,
    abnormalVitalsNotification: false,
    preCalculatedDosing: false,
    interpreterServices: false,
    consciousnessAssessment: false,
    painAssessment: false,
    hasPediatricSafety: false,
    hasPediatricMedication: false,
    hasPediatricEquipment: false,
    hasPediatricEnvironment: false,
    hasPediatricHandoff: false,
    hasPediatricTransfer: false,
    hasPediatricDischarge: false,
    hasPediatricFollowup: false
  },
  policies: {
    triagePolicy: false,
    assessmentReassessment: false,
    immunizationAssessment: false,
    childMaltreatment: false,
    deathInED: false,
    radiationReduction: false,
    behavioralHealth: false,
    transferGuidelines: false,
    hasPediatricAdmission: false,
    hasPediatricTransfer: false,
    hasPediatricConsent: false,
    hasPediatricRestraint: false,
    hasPediatricTriage: false,
    hasPediatricPain: false,
    hasPediatricSedation: false,
    hasPediatricImaging: false
  },
  familyCenteredCare: {
    hasPolicy: false,
    components: {
      decisionMaking: false,
      medicationSafety: false,
      familyPresence: false,
      education: false,
      bereavement: false
    },
    hasFamilyPresence: false,
    hasFamilySupport: false,
    hasFamilyEducation: false,
    hasFamilyFeedback: false,
    hasCulturalCompetency: false,
    hasLanguageServices: false,
    hasInterpreter: false,
    hasTranslation: false
  },
  disasterPlanning: {
    addressesChildren: false,
    components: {
      medicationsSupplies: false,
      decontamination: false,
      familyReunification: false,
      pediatricDrills: false,
      surgeCapacity: false,
      behavioralHealth: false,
      socialServices: false,
      specialNeeds: false
    },
    hasPediatricDisaster: false,
    hasPediatricMassCasualty: false,
    hasPediatricEvacuation: false,
    hasPediatricShelter: false,
    hasPediatricSupplies: false,
    hasPediatricEquipment: false,
    hasPediatricMedications: false,
    hasPediatricStaff: false
  },
  equipmentManagement: {
    hasPediatricInventory: false,
    hasPediatricMaintenance: false,
    hasPediatricCalibration: false,
    hasPediatricReplacement: false,
    hasPediatricTraining: false,
    hasPediatricCompetency: false,
    hasPediatricDocumentation: false,
    hasPediatricQuality: false
  },
  monitoringEquipment: {
    hasPediatricStethoscope: false,
    hasPediatricBP: false,
    hasPediatricThermometer: false,
    hasPediatricScale: false,
    hasPediatricECG: false,
    hasPediatricPulse: false,
    hasPediatricETCO2: false,
    hasPediatricGlucose: false
  },
  resuscitationEquipment: {
    gauge22: false,
    gauge24: false,
    ioNeedles: false,
    ivAdministration: false,
    hasPediatricBag: false,
    hasPediatricSuction: false,
    hasPediatricOxygen: false,
    hasPediatricDefibrillator: false,
    hasPediatricETT: false,
    hasPediatricLMA: false,
    hasPediatricIO: false,
    hasPediatricChest: false
  },
  respiratoryEquipment: {
    hasPediatricNebulizer: false,
    hasPediatricSpacer: false,
    hasPediatricMetered: false,
    hasPediatricCPAP: false,
    hasPediatricVentilator: false,
    hasPediatricHighFlow: false,
    hasPediatricSuction: false,
    hasPediatricChest: false
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

  const getData = useCallback((): StorageData => {
    if (!user?.email) {
      return {
        activities: [],
        milestones: [],
        readinessAssessment: defaultEmptyAssessment()
      };
    }

    const key = generateStorageKey(user.email);
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      return {
        activities: [],
        milestones: [],
        readinessAssessment: defaultEmptyAssessment()
      };
    }

    try {
      const parsedData = JSON.parse(storedData);
      return {
        activities: parsedData.activities || [],
        milestones: parsedData.milestones || [],
        readinessAssessment: parsedData.readinessAssessment || defaultEmptyAssessment()
      };
    } catch (e) {
      console.error('Error parsing stored data:', e);
      return {
        activities: [],
        milestones: [],
        readinessAssessment: defaultEmptyAssessment()
      };
    }
  }, [user?.email]);

  const saveData = useCallback((data: Partial<StorageData>) => {
    if (!user?.email) return;
    const key = generateStorageKey(user.email);
    const currentData = getData();
    const newData = {
      ...currentData,
      ...data
    };
    localStorage.setItem(key, JSON.stringify(newData));
  }, [user?.email, getData]);

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
    return defaultEmptyAssessment();
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
      milestones: [],
      readinessAssessment: defaultEmptyAssessment()
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