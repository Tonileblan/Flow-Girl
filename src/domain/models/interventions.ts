export interface InterventionGuide {
  id: string;
  title: string;
  category: 'TCC / Mente' | 'Cosmecéutica & Alivio Inmediato' | 'Nutrición & Cronobiología' | 'Fuerza & Suelo Pélvico';
  badge: string;
  shortDesc: string;
  fullContent: string;
  evidenceSource: string;
  durationMinutes: number;
  productValidation?: {
    name: string;
    keyActives: string[];
    clinicalBenefit: string;
  };
}

export const EVIDENCE_BASED_LIBRARY: InterventionGuide[] = [
  {
    id: 'cbt_hot_flashes',
    title: 'Protocolo TCC: Regulación Térmica y Manejo del Sofoco',
    category: 'TCC / Mente',
    badge: 'Evidencia Grado A',
    shortDesc: 'Técnica de respiración diafragmática 4-7-8 combinada con desensibilización del sistema simpático.',
    fullContent: 'La Terapia Cognitivo-Conductual (TCC) reduce la molestia autopercibida de los sofocos hasta en un 50% según la North American Menopause Society (NAMS). Disminuye el tono simpático y previene la hiperventilación anticipatoria.',
    evidenceSource: 'NAMS 2023 Position Statement / British Menopause Society',
    durationMinutes: 4
  },
  {
    id: 'exopeptide_mist',
    title: 'Alivio Cutáneo Inmediato: Exopeptide Balance Mist',
    category: 'Cosmecéutica & Alivio Inmediato',
    badge: 'Cosmecéutica Clínica',
    shortDesc: 'Bruma tópica termorreguladora enriquecida con Bisabolol y Ácido Hialurónico de bajo peso molecular.',
    fullContent: 'Aplicación en cuello, escote y muñecas al primer signo de vasodilatación periférica para modular la temperatura dérmica y restaurar la barrera hidrolipídica.',
    evidenceSource: 'Dermatological Assessment in Menopausal Skin 2024',
    durationMinutes: 1,
    productValidation: {
      name: 'Exopeptide Balance Mist',
      keyActives: ['Bisabolol natural', 'Ácido Hialurónico micro-fragmentado', 'Péptidos descongestionantes'],
      clinicalBenefit: 'Reducción de 1.8°C en temperatura cutánea percibida y calmante de eritema vasomotor.'
    }
  },
  {
    id: 'night_balance_caps',
    title: 'Regulación del Eje Circadiano: Night Balance Caps',
    category: 'Nutrición & Cronobiología',
    badge: 'Fitoterapia Validada',
    shortDesc: 'Sinergia de Ashwagandha KSM-66, Melatonina microencapsulada y L-Triptófano para despertares nocturnos.',
    fullContent: 'Modula la actividad del receptor GABA y amortigua los picos nocturnos de cortisol que causan la fase de insomnio de mantenimiento entre 2:00 y 4:00 AM.',
    evidenceSource: 'Journal of Clinical Sleep Medicine & Phytotherapy Research',
    durationMinutes: 1,
    productValidation: {
      name: 'Night Balance Caps',
      keyActives: ['Ashwagandha KSM-66 (300mg)', 'Melatonina cronoliberada (1.9mg)', 'L-Triptófano', 'Bisglicinato de Magnesio'],
      clinicalBenefit: 'Disminución de latencia de sueño y 62% menos microdespertares con sudoración.'
    }
  },
  {
    id: 'osteopenia_strength',
    title: 'Entrenamiento de Carga Osteogénica (Anti-Osteopenia)',
    category: 'Fuerza & Suelo Pélvico',
    badge: 'Preservación Ósea',
    shortDesc: 'Rutina de 3 movimientos compuestos con autocarga y mancuernas para estimular osteoblastos.',
    fullContent: 'La caída de estrógenos acelera la resorción ósea hasta un 3-5% anual en los primeros 5 años de perimenopausia. El estímulo mecánico de tracción muscular es el inductor principal de densidad mineral ósea.',
    evidenceSource: 'International Osteoporosis Foundation (IOF)',
    durationMinutes: 15
  },
  {
    id: 'pelvic_floor_rehab',
    title: 'Fisioterapia Pélvica: Relajación y Tono Miofascial',
    category: 'Fuerza & Suelo Pélvico',
    badge: 'Salud Urogenital',
    shortDesc: 'Ejercicios de Kegel sincronizados con descompresión diafragmática para evitar dispareunia e incontinencia leve.',
    fullContent: 'Combina contracción isométrica controlada con relajación profunda para evitar la hipertonía reactiva del suelo pélvico provocada por el estrés y la sequedad urogenital.',
    evidenceSource: 'Pelvic Floor Rehabilitation Consensus 2025',
    durationMinutes: 8
  }
];
