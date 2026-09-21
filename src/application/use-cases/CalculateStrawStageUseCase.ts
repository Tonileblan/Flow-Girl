import { MenstrualCycleEntry, StrawStageCode, STRAW_STAGES_DICT, StrawStageInfo, ProbabilityWindow } from '../../domain/models/straw';

export class CalculateStrawStageUseCase {
  execute(cycles: MenstrualCycleEntry[]): {
    stage: StrawStageInfo;
    probabilityWindow: ProbabilityWindow;
    variabilityStats: {
      averageLength: number;
      maxDifferenceConsecutive: number;
      cycleCount: number;
    };
  } {
    if (!cycles || cycles.length === 0) {
      return {
        stage: STRAW_STAGES_DICT['-3b'],
        probabilityWindow: {
          estimatedStartRange: [this.formatDateOffset(28), this.formatDateOffset(32)],
          probabilityScore: 70,
          statusMessage: 'Ventana de probabilidad en observación basal',
          uncertaintyDescription: 'Aún no disponemos de suficientes ciclos registrados para calcular variabilidad longitudinal.',
          isStrawEarlyTransition: false,
          consecutiveVariabilityDays: 0
        },
        variabilityStats: {
          averageLength: 28,
          maxDifferenceConsecutive: 0,
          cycleCount: 0
        }
      };
    }

    // Sort cycles by date ascending
    const sorted = [...cycles].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    const lengths = sorted.map(c => c.lengthDays).filter(l => l > 0);
    const avgLength = lengths.length > 0 ? Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length) : 28;

    let maxConsecutiveDiff = 0;
    let hasPersistent7DaysVariance = false;
    let consecutiveCount = 0;

    for (let i = 1; i < lengths.length; i++) {
      const diff = Math.abs(lengths[i] - lengths[i - 1]);
      if (diff > maxConsecutiveDiff) {
        maxConsecutiveDiff = diff;
      }
      if (diff >= 7) {
        consecutiveCount++;
        if (consecutiveCount >= 1) { // STRAW+10 hallmark
          hasPersistent7DaysVariance = true;
        }
      }
    }

    const lastCycle = sorted[sorted.length - 1];
    const today = new Date();
    const lastStartDate = new Date(lastCycle.startDate);
    const daysSinceLastStart = Math.floor((today.getTime() - lastStartDate.getTime()) / (1000 * 60 * 60 * 24));

    let detectedStageCode: StrawStageCode = '-3b';

    if (daysSinceLastStart >= 365) {
      detectedStageCode = '+1a'; // Postmenopausia
    } else if (daysSinceLastStart >= 60 || lengths.some(l => l >= 60)) {
      detectedStageCode = '-1'; // Perimenopausia Tardía
    } else if (hasPersistent7DaysVariance || maxConsecutiveDiff >= 7) {
      detectedStageCode = '-2'; // Perimenopausia Temprana (Criterio STRAW+10)
    } else if (lengths.length >= 3 && avgLength <= 25) {
      detectedStageCode = '-3a'; // Reproductiva Tardía
    } else {
      detectedStageCode = '-3b'; // Reproductiva
    }

    // Calculate non-punitive probability window
    const stage = STRAW_STAGES_DICT[detectedStageCode];
    const lowerEstimate = Math.max(15, avgLength - Math.max(4, Math.floor(maxConsecutiveDiff / 2)));
    const upperEstimate = Math.min(60, avgLength + Math.max(6, maxConsecutiveDiff));

    const rangeStart = this.addDays(lastStartDate, lowerEstimate);
    const rangeEnd = this.addDays(lastStartDate, upperEstimate);

    let statusMessage = 'Ventana de probabilidad activa';
    let uncertaintyDesc = 'Tus biomarcadores indican fluctuación estrogénica típica de la fase.';

    if (detectedStageCode === '-2') {
      statusMessage = 'Ventana fluida (Transición Temprana STRAW+10)';
      uncertaintyDesc = `Variabilidad interciclos de ±${maxConsecutiveDiff} días detectada. No es un retraso punitivo, sino la respuesta fisiológica normal a la maduración folicular variable.`;
    } else if (detectedStageCode === '-1') {
      statusMessage = 'Fase de espaciamiento ovulatorio';
      uncertaintyDesc = 'Intervalos prolongados previstos dentro de la transición tardía.';
    }

    return {
      stage,
      probabilityWindow: {
        estimatedStartRange: [this.formatDate(rangeStart), this.formatDate(rangeEnd)],
        probabilityScore: detectedStageCode === '-2' ? 65 : 85,
        statusMessage,
        uncertaintyDescription: uncertaintyDesc,
        isStrawEarlyTransition: detectedStageCode === '-2',
        consecutiveVariabilityDays: maxConsecutiveDiff
      },
      variabilityStats: {
        averageLength: avgLength,
        maxDifferenceConsecutive: maxConsecutiveDiff,
        cycleCount: cycles.length
      }
    };
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private formatDateOffset(offsetDays: number): string {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return this.formatDate(d);
  }
}
