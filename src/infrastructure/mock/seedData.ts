import { SymptomLogEntry } from '../../domain/models/symptom';
import { MenstrualCycleEntry } from '../../domain/models/straw';

export const INITIAL_CYCLES_SEED: MenstrualCycleEntry[] = [
  {
    id: 'cycle_1',
    startDate: '2026-04-10',
    endDate: '2026-04-15',
    lengthDays: 28,
    flowIntensity: 'moderate',
    notes: 'Ciclo regular histórico.'
  },
  {
    id: 'cycle_2',
    startDate: '2026-05-08',
    endDate: '2026-05-12',
    lengthDays: 22, // Acortamiento (-6d)
    flowIntensity: 'light',
    notes: 'Fase folicular acortada.'
  },
  {
    id: 'cycle_3',
    startDate: '2026-05-30',
    endDate: '2026-06-05',
    lengthDays: 37, // Alargamiento (+15d) -> Criterio STRAW+10 de variabilidad >= 7d
    flowIntensity: 'heavy',
    notes: 'Retraso perceptible con flujo abundante inicial.'
  },
  {
    id: 'cycle_4',
    startDate: '2026-07-06',
    endDate: '2026-07-10',
    lengthDays: 25,
    flowIntensity: 'moderate',
    notes: 'Ciclo más corto.'
  },
  {
    id: 'cycle_5',
    startDate: '2026-07-31',
    endDate: '2026-08-04',
    lengthDays: 35, // Variabilidad +10d
    flowIntensity: 'light',
    notes: 'Variabilidad persistente en perimenopausia temprana.'
  }
];

export const INITIAL_SYMPTOMS_SEED: SymptomLogEntry[] = [
  {
    id: 'sym_1',
    timestamp: '2026-09-18T15:30:00Z',
    symptomId: 'hot_flashes',
    domain: 'vasomotor',
    intensity: 7,
    frequency: 'intermittent',
    duration: '<5min',
    triggers: ['Estrés', 'Café'],
    notes: 'Sofoco súbito durante reunión laboral de la tarde.'
  },
  {
    id: 'sym_2',
    timestamp: '2026-09-19T03:15:00Z',
    symptomId: 'night_sweats',
    domain: 'vasomotor',
    intensity: 8,
    frequency: 'isolated',
    duration: '15min',
    triggers: ['Habitación cálida'],
    notes: 'Despertar con transpiración en tórax y cuello.'
  },
  {
    id: 'sym_3',
    timestamp: '2026-09-19T03:30:00Z',
    symptomId: 'insomnia',
    domain: 'neurological',
    intensity: 7,
    frequency: 'intermittent',
    duration: '1h',
    triggers: ['Sofoco nocturno'],
    notes: 'Dificultad para conciliar el sueño tras el sofoco nocturno.'
  },
  {
    id: 'sym_4',
    timestamp: '2026-09-19T10:00:00Z',
    symptomId: 'brain_fog',
    domain: 'neurological',
    intensity: 6,
    frequency: 'intermittent',
    duration: 'several_hours',
    triggers: ['Falta de sueño'],
    notes: 'Lentitud de procesamiento en redacción de correos.'
  },
  {
    id: 'sym_5',
    timestamp: '2026-09-20T08:00:00Z',
    symptomId: 'joint_pain',
    domain: 'physical',
    intensity: 5,
    frequency: 'isolated',
    duration: '15min',
    triggers: ['Inactividad'],
    notes: 'Rigidez matutina en nudillos y dedos.'
  },
  {
    id: 'sym_6',
    timestamp: '2026-09-20T19:00:00Z',
    symptomId: 'digestive_bloat',
    domain: 'physical',
    intensity: 6,
    frequency: 'intermittent',
    duration: 'several_hours',
    triggers: ['Harinas refinadas'],
    notes: 'Sensación de meteorismo y digestión pesada.'
  },
  {
    id: 'sym_7',
    timestamp: '2026-09-21T02:45:00Z',
    symptomId: 'insomnia',
    domain: 'neurological',
    intensity: 8,
    frequency: 'continuous',
    duration: 'several_hours',
    triggers: ['Pico de cortisol'],
    notes: 'Segundo despertar nocturno consecutivo a las 2:45 AM.'
  },
  {
    id: 'sym_8',
    timestamp: '2026-09-21T09:00:00Z',
    symptomId: 'hot_flashes',
    domain: 'vasomotor',
    intensity: 6,
    frequency: 'intermittent',
    duration: '<5min',
    triggers: ['Ambiente caluroso']
  },
  {
    id: 'sym_9',
    timestamp: '2026-09-21T09:30:00Z',
    symptomId: 'vaginal_dryness',
    domain: 'pelvic_intimate',
    intensity: 5,
    frequency: 'continuous',
    duration: 'all_day',
    triggers: ['Fluctuación hormonal']
  }
];
