export type SymptomDomain = 
  | 'vasomotor' 
  | 'neurological' 
  | 'physical' 
  | 'pelvic_intimate' 
  | 'metabolic';

export type SymptomFrequency = 'isolated' | 'intermittent' | 'continuous';

export type SymptomDuration = '<5min' | '15min' | '1h' | 'several_hours' | 'all_day';

export interface SymptomDefinition {
  id: string;
  name: string;
  domain: SymptomDomain;
  description: string;
  iconName: string;
  commonTriggers: string[];
}

export interface SymptomLogEntry {
  id: string;
  timestamp: string; // ISO string
  symptomId: string;
  domain: SymptomDomain;
  intensity: number; // 1 to 10
  frequency: SymptomFrequency;
  duration: SymptomDuration;
  triggers: string[];
  notes?: string;
  associatedCycleDay?: number;
}

// 34 Sintomas base categorizados por los 5 Dominios de Dexeus Midlife
export const BASE_SYMPTOMS_CATALOG: SymptomDefinition[] = [
  // 1. Vasomotores
  {
    id: 'hot_flashes',
    name: 'Sofocos diurnos',
    domain: 'vasomotor',
    description: 'Sensación súbita de calor intenso en tórax, cuello y rostro.',
    iconName: 'Flame',
    commonTriggers: ['Estrés', 'Café', 'Comida picante', 'Ambiente caluroso', 'Alcohol']
  },
  {
    id: 'night_sweats',
    name: 'Sudoración nocturna',
    domain: 'vasomotor',
    description: 'Episodios de transpiración profusa que interrumpen el descanso.',
    iconName: 'Moon',
    commonTriggers: ['Cena copiosa', 'Habitación cálida', 'Ropa sintética', 'Estrés']
  },
  {
    id: 'palpitations',
    name: 'Palpitaciones / Arritmias leves',
    domain: 'vasomotor',
    description: 'Percepción acelerada o irregular de los latidos sin causa cardíaca.',
    iconName: 'Activity',
    commonTriggers: ['Cafeína', 'Ansiedad', 'Fatiga']
  },
  {
    id: 'body_odor_changes',
    name: 'Cambios en el olor corporal',
    domain: 'vasomotor',
    description: 'Modificación sutil del sudor debido a la alteración bacteriana cutánea.',
    iconName: 'Wind',
    commonTriggers: ['Fluctuación hormonal', 'Transpiración']
  },
  {
    id: 'chills',
    name: 'Escalofríos post-sofoco',
    domain: 'vasomotor',
    description: 'Sensación de frío repentino tras la vasodilatación del sofoco.',
    iconName: 'ThermometerSnowflake',
    commonTriggers: ['Sofoco previo', 'Hipotermia reactiva']
  },

  // 2. Neurológicos / Cognitivos
  {
    id: 'brain_fog',
    name: 'Niebla mental',
    domain: 'neurological',
    description: 'Dificultad de concentración, lentitud en el procesamiento y lapsos leves de memoria.',
    iconName: 'Brain',
    commonTriggers: ['Falta de sueño', 'Sobrecarga laboral', 'Caída de estrógenos']
  },
  {
    id: 'insomnia',
    name: 'Insomnio de mantenimiento',
    domain: 'neurological',
    description: 'Despertares frecuentes entre las 2:00 y 4:00 AM con dificultad para reanudar el sueño.',
    iconName: 'EyeOff',
    commonTriggers: ['Sofoco nocturno', 'Pico de cortisol', 'Luz azul']
  },
  {
    id: 'anxiety',
    name: 'Ansiedad reactiva',
    domain: 'neurological',
    description: 'Sensación de inquietud o aprensión sin desencadenante externo evidente.',
    iconName: 'AlertCircle',
    commonTriggers: ['Fluctuación de progesterona', 'Estrés laboral']
  },
  {
    id: 'irritability',
    name: 'Irritabilidad / Labilidad emocional',
    domain: 'neurological',
    description: 'Baja tolerancia a la frustración y cambios anímicos rápidos.',
    iconName: 'SmilePlus',
    commonTriggers: ['Privación de sueño', 'Sobrecarga sensorial']
  },
  {
    id: 'apathy',
    name: 'Apatía y desmotivación',
    domain: 'neurological',
    description: 'Pérdida temporal de entusiasmo y energía para tareas habituales.',
    iconName: 'CloudRain',
    commonTriggers: ['Agotamiento', 'Fase premenstrual irregular']
  },
  {
    id: 'dizziness',
    name: 'Mareos o inestabilidad',
    domain: 'neurological',
    description: 'Sensación de flotabilidad o vértigo leve por alteración vestibular.',
    iconName: 'Compass',
    commonTriggers: ['Deshidratación', 'Cambio postural', 'Baja glucemia']
  },
  {
    id: 'headaches_migraine',
    name: 'Cefalea catamenial',
    domain: 'neurological',
    description: 'Dolor de cabeza pulsátil vinculado a la caída brusca de estrógenos.',
    iconName: 'Zap',
    commonTriggers: ['Variación de ciclo', 'Falta de descanso', 'Tensión cervical']
  },

  // 3. Físicos / Sistémicos
  {
    id: 'joint_pain',
    name: 'Dolor / Rigidez articular',
    domain: 'physical',
    description: 'Molestias articulares matutinas en dedos, rodillas u hombros.',
    iconName: 'Bone',
    commonTriggers: ['Inactividad', 'Frío', 'Inflamación sistémica']
  },
  {
    id: 'muscle_tension',
    name: 'Mialgia y tensión muscular',
    domain: 'physical',
    description: 'Contracturas en trapecios, espalda baja o gemelos.',
    iconName: 'Minimize2',
    commonTriggers: ['Mala postura', 'Carga de cortisol', 'Falta de magnesio']
  },
  {
    id: 'persistent_fatigue',
    name: 'Fatiga persistente',
    domain: 'physical',
    description: 'Cansancio profundo no reparado por el sueño.',
    iconName: 'BatteryLow',
    commonTriggers: ['Insomnio repetido', 'Bajo hierro', 'Déficit tiroideo']
  },
  {
    id: 'digestive_bloat',
    name: 'Alteración digestiva / Hinchazón',
    domain: 'physical',
    description: 'Digestiones lentas, gases y meteorismo abdominal.',
    iconName: 'Layers',
    commonTriggers: ['Lácteos', 'Harinas refinadas', 'Estrés al comer']
  },
  {
    id: 'brittle_nails',
    name: 'Uñas frágiles / Piel seca',
    domain: 'physical',
    description: 'Pérdida de elasticidad cutánea y fragilidad ungueal.',
    iconName: 'Sparkles',
    commonTriggers: ['Deshidratación', 'Caída de colágeno']
  },
  {
    id: 'paresthesia',
    name: 'Hormigueo / Parestesia en extremidades',
    domain: 'physical',
    description: 'Sensación de adormecimiento en manos o pies.',
    iconName: 'Waves',
    commonTriggers: ['Circulación lenta', 'Déficit B12']
  },

  // 4. Suelo Pélvico e Íntimo
  {
    id: 'vaginal_dryness',
    name: 'Sequedad e irritación vaginal',
    domain: 'pelvic_intimate',
    description: 'Atrofia urogenital por descenso de estrógenos en mucosa.',
    iconName: 'Droplet',
    commonTriggers: ['Ropa ajustada', 'Jabones agresivos']
  },
  {
    id: 'dyspareunia',
    name: 'Dispareunia (Molestias en relaciones)',
    domain: 'pelvic_intimate',
    description: 'Sensibilidad o dolor durante el contacto íntimo.',
    iconName: 'HeartCrack',
    commonTriggers: ['Falta de lubricación natural']
  },
  {
    id: 'mild_incontinence',
    name: 'Incontinencia de esfuerzo leve',
    domain: 'pelvic_intimate',
    description: 'Pequeñas pérdidas al toser, reír o levantar peso.',
    iconName: 'ShieldAlert',
    commonTriggers: ['Tos', 'Impacto físico', 'Debilidad pélvica']
  },
  {
    id: 'libido_shifts',
    name: 'Fluctuación del deseo íntimo',
    domain: 'pelvic_intimate',
    description: 'Cambios en la respuesta y apetencia sexual.',
    iconName: 'Heart',
    commonTriggers: ['Fatiga acumulada', 'Sequedad']
  },
  {
    id: 'urinary_urgency',
    name: 'Urgencia miccional frecuente',
    domain: 'pelvic_intimate',
    description: 'Sensación continua de vejiga llena.',
    iconName: 'Filter',
    commonTriggers: ['Cafeína', 'Frío en zona pélvica']
  },

  // 5. Metabólicos y Otros
  {
    id: 'fluid_retention',
    name: 'Retención de líquidos periférica',
    domain: 'metabolic',
    description: 'Sensación de pesadez en tobillos y manos al final del día.',
    iconName: 'PieChart',
    commonTriggers: ['Exceso de sal', 'Sedentarismo']
  },
  {
    id: 'weight_repartition',
    name: 'Redistribución de grasa abdominal',
    domain: 'metabolic',
    description: 'Cambio en la composición corporal mediado por resistencia a la insulina.',
    iconName: 'TrendingUp',
    commonTriggers: ['Carbohidratos rápidos', 'Falta de masa muscular']
  },
  {
    id: 'hair_thinning',
    name: 'Afinamiento capilar',
    domain: 'metabolic',
    description: 'Menor densidad en raíz y caída difusa estacional.',
    iconName: 'Scissors',
    commonTriggers: ['Déficit de ferritina', 'Estrés']
  },
  {
    id: 'sensory_changes',
    name: 'Alteración del gusto u olfato',
    domain: 'metabolic',
    description: 'Hipersensibilidad a olores o sabor metálico transitorio.',
    iconName: 'Eye',
    commonTriggers: ['Cambio en mucosa oral']
  },
  {
    id: 'tinnitus',
    name: 'Acúfenos / Pitidos en el oído',
    domain: 'metabolic',
    description: 'Zumbido sutil sin pérdida auditiva.',
    iconName: 'Volume2',
    commonTriggers: ['Tensión arterial variable', 'Bruxismo']
  }
];

export const DOMAIN_METADATA: Record<SymptomDomain, { label: string; color: string; bgLight: string; icon: string }> = {
  vasomotor: {
    label: 'Vasomotores',
    color: '#008080', // Teal
    bgLight: 'bg-teal-50 text-teal-700 border-teal-200',
    icon: 'Flame'
  },
  neurological: {
    label: 'Neurológicos y Cognitivos',
    color: '#9966CC', // Orchid
    bgLight: 'bg-orchid-50 text-orchid-700 border-orchid-200',
    icon: 'Brain'
  },
  physical: {
    label: 'Físicos y Sistémicos',
    color: '#8A9A5B', // Sage
    bgLight: 'bg-sage-50 text-sage-700 border-sage-200',
    icon: 'Activity'
  },
  pelvic_intimate: {
    label: 'Suelo Pélvico e Íntimo',
    color: '#0284c7', // Sky Blue
    bgLight: 'bg-sky-50 text-sky-700 border-sky-200',
    icon: 'Droplet'
  },
  metabolic: {
    label: 'Metabólicos y Otros',
    color: '#d97706', // Amber
    bgLight: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: 'TrendingUp'
  }
};
