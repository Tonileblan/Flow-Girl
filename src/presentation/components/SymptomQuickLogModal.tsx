import React, { useState } from 'react';
import { X, Lock, CheckCircle2, Flame, Moon, Activity, Brain, Droplet, TrendingUp, Sparkles } from 'lucide-react';
import { SymptomDefinition, SymptomFrequency, SymptomDuration, SymptomLogEntry } from '../../domain/models/symptom';

interface SymptomQuickLogModalProps {
  symptom: SymptomDefinition;
  onClose: () => void;
  onSave: (entry: SymptomLogEntry) => void;
}

export const SymptomQuickLogModal: React.FC<SymptomQuickLogModalProps> = ({
  symptom,
  onClose,
  onSave
}) => {
  const [intensity, setIntensity] = useState<number>(5);
  const [frequency, setFrequency] = useState<SymptomFrequency>('intermittent');
  const [duration, setDuration] = useState<SymptomDuration>('15min');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const toggleTrigger = (trigger: string) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
    }
  };

  const handleSave = () => {
    const entry: SymptomLogEntry = {
      id: `sym_${Date.now()}`,
      timestamp: new Date().toISOString(),
      symptomId: symptom.id,
      domain: symptom.domain,
      intensity,
      frequency,
      duration,
      triggers: selectedTriggers,
      notes: notes.trim() ? notes.trim() : undefined
    };

    setIsSaved(true);
    setTimeout(() => {
      onSave(entry);
      onClose();
    }, 450);
  };

  const getDomainIcon = () => {
    switch (symptom.domain) {
      case 'vasomotor':
        return <Flame className="w-5 h-5 text-teal-600" />;
      case 'neurological':
        return <Brain className="w-5 h-5 text-orchid-600" />;
      case 'physical':
        return <Activity className="w-5 h-5 text-sage-600" />;
      case 'pelvic_intimate':
        return <Droplet className="w-5 h-5 text-sky-600" />;
      case 'metabolic':
        return <TrendingUp className="w-5 h-5 text-amber-600" />;
      default:
        return <Moon className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-circadian-card w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-circadian-border relative max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-circadian-border">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-900">
              {getDomainIcon()}
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-teal-700 dark:text-teal-400 uppercase">
                {symptom.domain}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-cloud-200 font-sans">
                {symptom.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-circadian-border transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-6">

          {/* Intensity Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Intensidad Percibida (1 al 10)
              </label>
              <span className="text-base font-bold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
                {intensity} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={e => setIntensity(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-circadian-border rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>1: Apenas perceptible</span>
              <span>5: Moderado</span>
              <span>10: Incapacitante</span>
            </div>
          </div>

          {/* Frequency Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Frecuencia del Episodio
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['isolated', 'intermittent', 'continuous'] as SymptomFrequency[]).map(freq => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all text-center ${
                    frequency === freq
                      ? 'bg-teal-50 dark:bg-teal-950/70 border-teal-500 text-teal-800 dark:text-teal-300 font-semibold shadow-sm'
                      : 'border-slate-200 dark:border-circadian-border text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-circadian-border'
                  }`}
                >
                  {freq === 'isolated' ? 'Aislado' : freq === 'intermittent' ? 'Intermitente' : 'Continuo'}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Duración Estimada
            </label>
            <div className="flex flex-wrap gap-2">
              {(['<5min', '15min', '1h', 'several_hours', 'all_day'] as SymptomDuration[]).map(dur => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setDuration(dur)}
                  className={`py-1.5 px-3 rounded-full text-xs font-medium border transition-all ${
                    duration === dur
                      ? 'bg-sage-100 dark:bg-sage-950/70 border-sage-500 text-sage-800 dark:text-sage-300 font-semibold'
                      : 'border-slate-200 dark:border-circadian-border text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-circadian-border'
                  }`}
                >
                  {dur === '<5min' ? '< 5 min' : dur === '15min' ? '15 min' : dur === '1h' ? '1 hora' : dur === 'several_hours' ? 'Varias horas' : 'Todo el día'}
                </button>
              ))}
            </div>
          </div>

          {/* Common Triggers */}
          {symptom.commonTriggers.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Desencadenantes Identificados (Triggers)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {symptom.commonTriggers.map(trig => {
                  const isSelected = selectedTriggers.includes(trig);
                  return (
                    <button
                      key={trig}
                      type="button"
                      onClick={() => toggleTrigger(trig)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-orchid-100 dark:bg-orchid-950/70 border-orchid-500 text-orchid-800 dark:text-orchid-300 font-medium'
                          : 'border-slate-200 dark:border-circadian-border text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}{trig}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Notas Adicionales (Opcional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Sensaciones, contexto o reflexiones..."
              className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-circadian-border bg-slate-50 dark:bg-circadian-border text-slate-800 dark:text-cloud-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-circadian-border flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Cifrado Local-First</span>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaved}
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-soft-teal hover:shadow-lg transition-all active:scale-95 disabled:opacity-80"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-spin" />
                <span>Guardado Cifrado...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Guardar Registro</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
