export type StrawStageCode = 
  | '-3b' // Reproductive: Peak
  | '-3a' // Reproductive: Late
  | '-2'  // Menopausal Transition: Early (Variability >= 7 days in consecutive cycles)
  | '-1'  // Menopausal Transition: Late (Amenorrhea >= 60 days)
  | '+1a' // Early Postmenopause
  | '+1b' // Early Postmenopause
  | '+2'; // Late Postmenopause

export interface StrawStageInfo {
  code: StrawStageCode;
  title: string;
  category: 'Reproductiva' | 'Transición Perimenopáusica' | 'Postmenopausia';
  clinicalDescription: string;
  cycleHallmark: string;
  hormonalProfile: string;
  recommendedAction: string;
}

export interface MenstrualCycleEntry {
  id: string;
  startDate: string; // ISO date YYYY-MM-DD
  endDate?: string;
  lengthDays: number;
  flowIntensity: 'light' | 'moderate' | 'heavy' | 'spotting';
  notes?: string;
}

export interface ProbabilityWindow {
  estimatedStartRange: [string, string]; // [minDate, maxDate]
  probabilityScore: number; // 0 to 100%
  statusMessage: string;
  uncertaintyDescription: string;
  isStrawEarlyTransition: boolean;
  consecutiveVariabilityDays: number;
}

export const STRAW_STAGES_DICT: Record<StrawStageCode, StrawStageInfo> = {
  '-3b': {
    code: '-3b',
    title: 'Reproductiva Plena',
    category: 'Reproductiva',
    clinicalDescription: 'Ciclos regulares con ovulaciones consistentes y perfiles hormonales estables.',
    cycleHallmark: 'Ciclos constantes entre 25-35 días.',
    hormonalProfile: 'FSH y Estradiol en rangos normativos.',
    recommendedAction: 'Mantenimiento de hábitos saludables y monitorización basal.'
  },
  '-3a': {
    code: '-3a',
    title: 'Reproductiva Tardía',
    category: 'Reproductiva',
    clinicalDescription: 'Comienzo de disminución sutil en reserva ovárica (descenso de AMH).',
    cycleHallmark: 'Leve acortamiento de ciclos (2-3 días respecto al patrón histórico).',
    hormonalProfile: 'AMH e Inhibina B decrecientes; FSH normal en fase folicular temprana.',
    recommendedAction: 'Observación de síntomas iniciales y registro longitudinal.'
  },
  '-2': {
    code: '-2',
    title: 'Transición Menopáusica Temprana (Perimenopausia Temprana)',
    category: 'Transición Perimenopáusica',
    clinicalDescription: 'Variabilidad persistente en la longitud del ciclo menstrual. Primer marcador formal del marco STRAW+10.',
    cycleHallmark: 'Diferencia persistente de ≥ 7 días entre ciclos consecutivos.',
    hormonalProfile: 'FSH variable (ocasionalmente elevada >25 UI/L) y fluctuaciones bruscas de estradiol.',
    recommendedAction: 'Registro multidominio de síntomas, higiene circadiana y optimización metabólica.'
  },
  '-1': {
    code: '-1',
    title: 'Transición Menopáusica Tardía (Perimenopausia Tardía)',
    category: 'Transición Perimenopáusica',
    clinicalDescription: 'Intervalo prolongado de amenorrea con marcado declive estrogénico.',
    cycleHallmark: 'Intervalo de amenorrea de ≥ 60 días.',
    hormonalProfile: 'FSH persistentemente elevada (>30 UI/L), estradiol en niveles bajos.',
    recommendedAction: 'Consulta ginecológica para valorar Terapia Hormonal de la Menopausia (THM) y protección ósea.'
  },
  '+1a': {
    code: '+1a',
    title: 'Postmenopausia Muy Temprana',
    category: 'Postmenopausia',
    clinicalDescription: 'Primer año posterior a la Fecha de la Última Menstruación (FUM).',
    cycleHallmark: '12 meses consecutivos de amenorrea alcanzados.',
    hormonalProfile: 'FSH permanentemente alta, estradiol basal bajo.',
    recommendedAction: 'Densitometría ósea y seguimiento de salud cardiovascular.'
  },
  '+1b': {
    code: '+1b',
    title: 'Postmenopausia Temprana (Años 2 a 5)',
    category: 'Postmenopausia',
    clinicalDescription: 'Estabilización del eje hormonal tras la fase sintomática aguda.',
    cycleHallmark: 'Cese ovárico definitivo.',
    hormonalProfile: 'Estradiol <20 pg/mL, FSH elevada.',
    recommendedAction: 'Prevención de síndrome genitourinario y ejercicios de fuerza.'
  },
  '+2': {
    code: '+2',
    title: 'Postmenopausia Tardía',
    category: 'Postmenopausia',
    clinicalDescription: 'Fase de madurez hormonal a largo plazo (>5 años post-menopausia).',
    cycleHallmark: 'Estabilidad endocrina sin fluctuaciones cíclicas.',
    hormonalProfile: 'Perfil postmenopáusico crónico.',
    recommendedAction: 'Salud osteomuscular, suelo pélvico y bienestar metabólico.'
  }
};
