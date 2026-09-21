import { SymptomLogEntry } from '../../domain/models/symptom';
import { ReactiveInterventionRecommendation } from '../../domain/models/events';
import { MenstrualCycleEntry } from '../../domain/models/straw';

export class EvaluateClinicalRulesUseCase {
  execute(
    symptoms: SymptomLogEntry[],
    _cycles: MenstrualCycleEntry[]
  ): ReactiveInterventionRecommendation[] {
    const recommendations: ReactiveInterventionRecommendation[] = [];

    if (!symptoms || symptoms.length === 0) {
      return [
        {
          id: 'welcome_baseline',
          triggerEvent: 'SYMPTOM_LOGGED',
          title: 'Registro Basal Inicial',
          subtitle: 'Comienza registrando tus síntomas diarios para activar el motor de inteligencia clínica.',
          badge: 'Primeros Pasos',
          category: 'CBT',
          actionType: 'open_cbt',
          estimatedDuration: '3 min'
        }
      ];
    }

    // Check last 7 days of logs
    const now = new Date().getTime();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    const recentLogs = symptoms.filter(s => new Date(s.timestamp).getTime() >= sevenDaysAgo);

    // Rule 1: Insomnia & Night Sweats Cluster
    const insomniaOrSweats = recentLogs.filter(
      s => s.symptomId === 'insomnia' || s.symptomId === 'night_sweats'
    );
    if (insomniaOrSweats.length >= 2) {
      recommendations.push({
        id: 'rec_sleep_circadian',
        triggerEvent: 'INSOMNIA_CLUSTER_DETECTED',
        title: 'Patrón de Interrupción Circadiana Detectado',
        subtitle: `Detectados ${insomniaOrSweats.length} episodios de insomnio/sudoración nocturna en los últimos días. La fitoterapia con Night Balance Caps y el anclaje respiratorio pueden restablecer tu sueño profundo.`,
        badge: 'Higiene del Sueño',
        category: 'Suplementación',
        actionType: 'view_supplement',
        estimatedDuration: '4 min'
      });
    }

    // Rule 2: Vasomotor Surge (Hot flashes intensity >= 6)
    const hotFlashEpisodes = recentLogs.filter(
      s => (s.symptomId === 'hot_flashes' || s.symptomId === 'night_sweats') && s.intensity >= 6
    );
    if (hotFlashEpisodes.length >= 2) {
      recommendations.push({
        id: 'rec_hot_flash_cbt',
        triggerEvent: 'VASOMOTOR_SURGE_DETECTED',
        title: 'Intervención Térmica Aguda (TCC 4-7-8)',
        subtitle: 'Episodios vasomotores de intensidad moderada-alta. Utiliza el protocolo de respiración guiada para disminuir la reactividad simpática y aplica Exopeptide Balance Mist.',
        badge: 'Alivio Inmediato',
        category: 'CBT',
        actionType: 'open_cbt',
        estimatedDuration: '4 min'
      });
    }

    // Rule 3: Joint pain or bone density risk
    const jointPain = recentLogs.filter(s => s.symptomId === 'joint_pain' || s.symptomId === 'muscle_tension');
    if (jointPain.length >= 2) {
      recommendations.push({
        id: 'rec_strength_osteo',
        triggerEvent: 'SYMPTOM_LOGGED',
        title: 'Preservación de Densidad Ósea (Anti-Osteopenia)',
        subtitle: 'Registras rigidez articular. La tracción mecánica mediante fuerza adaptativa estimula la osteogénesis y alivia la inflamación sinovial.',
        badge: 'Fuerza Adaptada',
        category: 'Fisio',
        actionType: 'view_workout',
        estimatedDuration: '15 min'
      });
    }

    // Rule 4: High volume of data -> Doctor Report
    if (symptoms.length >= 10) {
      recommendations.push({
        id: 'rec_doctor_report',
        triggerEvent: 'CYCLE_VARIABILITY_DETECTED',
        title: 'Informe Clínico Listo para Ginecología',
        subtitle: `Dispones de ${symptoms.length} registros longitudinales. Puedes exportar el reporte homologado en PDF para optimizar la toma de decisiones sobre THM en tu próxima consulta.`,
        badge: 'Inteligencia Médica',
        category: 'Médica',
        actionType: 'generate_report',
        estimatedDuration: 'Descarga PDF'
      });
    }

    return recommendations;
  }
}
