export type ClinicalEventType = 
  | 'SYMPTOM_LOGGED' 
  | 'INSOMNIA_CLUSTER_DETECTED' 
  | 'VASOMOTOR_SURGE_DETECTED' 
  | 'CYCLE_VARIABILITY_DETECTED' 
  | 'CBT_SESSION_COMPLETED' 
  | 'DOCTOR_REPORT_EXPORTED';

export interface BaseEvent<T = unknown> {
  id: string;
  type: ClinicalEventType;
  timestamp: string; // ISO string
  payload: T;
}

export interface ReactiveInterventionRecommendation {
  id: string;
  triggerEvent: ClinicalEventType;
  title: string;
  subtitle: string;
  badge: string;
  category: 'CBT' | 'Suplementación' | 'Fisio' | 'Médica';
  actionType: 'open_cbt' | 'view_supplement' | 'view_workout' | 'generate_report';
  estimatedDuration: string;
  actionPayload?: unknown;
}
