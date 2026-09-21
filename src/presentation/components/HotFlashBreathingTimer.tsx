import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, X, CheckCircle2 } from 'lucide-react';

interface HotFlashBreathingTimerProps {
  onClose?: () => void;
  onComplete?: () => void;
}

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'finished';

export const HotFlashBreathingTimer: React.FC<HotFlashBreathingTimerProps> = ({
  onClose,
  onComplete
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [secondsLeftInPhase, setSecondsLeftInPhase] = useState(0);

  // 4-7-8 Technique timings
  const INHALE_TIME = 4;
  const HOLD_TIME = 7;
  const EXHALE_TIME = 8;
  const TOTAL_CYCLES = 4;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      if (phase === 'idle') {
        setPhase('inhale');
        setSecondsLeftInPhase(INHALE_TIME);
      } else {
        timer = setInterval(() => {
          setSecondsLeftInPhase(prev => {
            if (prev <= 1) {
              // Switch phases
              if (phase === 'inhale') {
                setPhase('hold');
                return HOLD_TIME;
              } else if (phase === 'hold') {
                setPhase('exhale');
                return EXHALE_TIME;
              } else if (phase === 'exhale') {
                const nextCycle = cycleCount + 1;
                setCycleCount(nextCycle);
                if (nextCycle >= TOTAL_CYCLES) {
                  setPhase('finished');
                  setIsRunning(false);
                  if (onComplete) onComplete();
                  return 0;
                } else {
                  setPhase('inhale');
                  return INHALE_TIME;
                }
              }
            }
            return prev - 1;
          });
        }, 1000);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, phase, cycleCount, onComplete]);

  const handleToggle = () => {
    if (phase === 'finished') {
      setCycleCount(0);
      setPhase('inhale');
      setSecondsLeftInPhase(INHALE_TIME);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCycleCount(0);
    setPhase('idle');
    setSecondsLeftInPhase(0);
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-teal-500 to-teal-400 text-teal-600 scale-110';
      case 'hold':
        return 'from-orchid-500 to-orchid-400 text-orchid-600 scale-125';
      case 'exhale':
        return 'from-sage-500 to-sage-400 text-sage-600 scale-90';
      case 'finished':
        return 'from-emerald-500 to-teal-500 text-emerald-600 scale-100';
      default:
        return 'from-slate-400 to-slate-500 text-slate-600 scale-100';
    }
  };

  const getPhaseTitle = () => {
    switch (phase) {
      case 'inhale':
        return 'Inhala suavemente por la nariz';
      case 'hold':
        return 'Mantén el aire con calma';
      case 'exhale':
        return 'Exhala lento y continuo por la boca';
      case 'finished':
        return '¡Ciclo de desensibilización completado!';
      default:
        return 'Preparada para regular el tono simpático';
    }
  };

  return (
    <div className="bg-white dark:bg-circadian-card rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-circadian-border relative overflow-hidden transition-all">
      {/* Close button if in modal */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-circadian-border transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TCC: Desensibilización Vasomotora</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-cloud-200 font-sans">
          Protocolo Respiratorio 4-7-8
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
          Modula el sistema nervioso autónomo para disipar la sensación de calor súbito y reducir el pulso acelerado.
        </p>
      </div>

      {/* Pacer Visual Circle */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto my-6 flex items-center justify-center">
        {/* Outer Glow Wave */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${getPhaseColor()} opacity-20 blur-xl transition-all duration-1000`}
        />

        {/* Dynamic Scale Ring */}
        <div
          className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-dashed border-teal-300 dark:border-teal-700 flex items-center justify-center transition-all duration-1000 ${
            phase === 'inhale' ? 'scale-110 rotate-45' : phase === 'hold' ? 'scale-125' : phase === 'exhale' ? 'scale-90 rotate-90' : ''
          }`}
        >
          {/* Inner Interactive Sphere */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-cloud-50 to-teal-50 dark:from-circadian-card dark:to-teal-950/80 shadow-inner flex flex-col items-center justify-center p-4 text-center border border-teal-100 dark:border-teal-900">
            {phase === 'finished' ? (
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-1 animate-bounce" />
            ) : (
              <>
                <span className="text-3xl sm:text-4xl font-extrabold text-teal-700 dark:text-teal-300 font-sans">
                  {secondsLeftInPhase > 0 ? secondsLeftInPhase : '--'}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                  {phase === 'idle' ? 'Pulsa Iniciar' : phase.toUpperCase()}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Guidance Message */}
      <div className="text-center mb-6 min-h-[44px]">
        <p className="text-sm font-medium text-slate-800 dark:text-cloud-200 transition-opacity">
          {getPhaseTitle()}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Ciclo {Math.min(cycleCount + 1, TOTAL_CYCLES)} de {TOTAL_CYCLES}
        </p>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handleReset}
          className="p-3 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-circadian-border transition-colors"
          title="Reiniciar"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={handleToggle}
          className="flex items-center space-x-2 px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-soft-teal hover:shadow-lg transition-all active:scale-95"
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>{phase === 'finished' ? 'Repetir Sesión' : 'Iniciar Protocolo'}</span>
            </>
          )}
        </button>

        <button
          className="p-3 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-circadian-border transition-colors opacity-60 hover:opacity-100"
          title="Sonido guía activado"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
