import React, { useState } from 'react';
import { 
  Flame, 
  Brain, 
  Activity, 
  ShieldCheck, 
  Heart, 
  Mic, 
  CheckCircle2, 
  Wind, 
  Sparkles,
  Lock
} from 'lucide-react';
import { SymptomLogEntry } from '../../domain/models/symptom';

interface BiomarkerMatrixViewProps {
  onOpenCbtTimer: () => void;
  onSaveSymptomEntry: (entry: SymptomLogEntry) => void;
}

export const BiomarkerMatrixView: React.FC<BiomarkerMatrixViewProps> = ({
  onOpenCbtTimer,
  onSaveSymptomEntry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'calor' | 'animo' | 'cuerpo' | 'intimo'>('calor');
  const [intensity, setIntensity] = useState<number>(7);
  const [frequency, setFrequency] = useState<'solo_una_vez' | 'a_ratos' | 'casi_todo_dia'>('a_ratos');
  const [duration, setDuration] = useState<'<5min' | '5-15min' | '>30min'>('5-15min');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([
    'Un café o té caliente',
    'Habitación con calor (>21°C)'
  ]);
  const [personalNote, setPersonalNote] = useState<string>('Me dio en mitad de una reunión después del café.');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const triggersList = [
    { id: 'estres', label: 'Un momento de estrés', icon: '🧠' },
    { id: 'cafe', label: 'Un café o té caliente', icon: '☕' },
    { id: 'calor', label: 'Habitación con calor (>21°C)', icon: '🌡️' },
    { id: 'alcohol', label: 'Una copa o alcohol', icon: '🍷' },
    { id: 'comida', label: 'Comida pesada', icon: '🍲' }
  ];

  const toggleTrigger = (label: string) => {
    if (selectedTriggers.includes(label)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== label));
    } else {
      setSelectedTriggers([...selectedTriggers, label]);
    }
  };

  const getIntensityLabel = (val: number) => {
    if (val <= 3) return 'Nivel ' + val + ' · Suave';
    if (val <= 6) return 'Nivel ' + val + ' · Molesto';
    if (val <= 8) return 'Nivel ' + val + ' · Fuerte';
    return 'Nivel ' + val + ' · Muy intenso';
  };

  const handleSave = () => {
    const entry: SymptomLogEntry = {
      id: `sym_reg_${Date.now()}`,
      timestamp: new Date().toISOString(),
      symptomId: 'hot_flashes',
      domain: 'vasomotor',
      intensity,
      frequency: frequency === 'solo_una_vez' ? 'isolated' : frequency === 'a_ratos' ? 'intermittent' : 'continuous',
      duration: duration === '<5min' ? '<5min' : duration === '5-15min' ? '15min' : 'several_hours',
      triggers: selectedTriggers,
      notes: personalNote
    };

    setIsSaved(true);
    setTimeout(() => {
      onSaveSymptomEntry(entry);
      setIsSaved(false);
      alert('Registro guardado con éxito en tu bóveda privada.');
    }, 400);
  };

  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto animate-fadeIn">
      
      {/* 1. Header & Privacy Badge */}
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-[#4D662E] dark:text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4D662E] dark:text-emerald-400" />
          <span>ESPACIO ÍNTIMO Y CIFRADO</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-cloud-200 font-sans tracking-tight">
          Anotar cómo te sientes
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tus datos están guardados solo en tu móvil de forma 100% privada y segura.
        </p>
      </div>

      {/* 2. Categorías Amigables */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('calor')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'calor'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'bg-white dark:bg-circadian-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-circadian-border'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Calor y Sofocos</span>
        </button>

        <button
          onClick={() => setSelectedCategory('animo')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'animo'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'bg-white dark:bg-circadian-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-circadian-border'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Ánimo y Memoria</span>
        </button>

        <button
          onClick={() => setSelectedCategory('cuerpo')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'cuerpo'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'bg-white dark:bg-circadian-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-circadian-border'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Cuerpo y Descanso</span>
        </button>
      </div>

      {/* 3. Card Principal de Registro: Sofoco o Sudor */}
      <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-6">
        
        {/* Subheader */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-cloud-200">
                Sofoco o Sudor
              </h3>
              <p className="text-xs text-slate-400">
                Ocurrido hace unos 15 minutos
              </p>
            </div>
          </div>
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#EBF3DD] text-[#4D662E] dark:bg-emerald-950/60 dark:text-emerald-300">
            Hoy, 16:42
          </span>
        </div>

        {/* 3.1 ¿Qué intensidad tuvo? */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              ¿Qué intensidad tuvo?
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-800 text-white">
              {getIntensityLabel(intensity)}
            </span>
          </div>
          
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={e => setIntensity(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 dark:bg-circadian-border rounded-lg appearance-none cursor-pointer accent-teal-800"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-medium pt-1">
            <span>1 Suave</span>
            <span>4 Molesto</span>
            <span className="font-bold text-teal-800 dark:text-teal-300">7 Fuerte</span>
            <span>10 Muy intenso</span>
          </div>
        </div>

        {/* 3.2 ¿Con qué frecuencia lo notas? */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            ¿Con qué frecuencia lo notas?
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'solo_una_vez', label: 'Solo una vez' },
              { id: 'a_ratos', label: 'A ratos' },
              { id: 'casi_todo_dia', label: 'Casi todo el día' }
            ].map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFrequency(f.id as any)}
                className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                  frequency === f.id
                    ? 'bg-teal-800 text-white border-teal-800 font-bold shadow-sm'
                    : 'bg-[#EBF2FA] dark:bg-circadian-border border-transparent text-slate-700 dark:text-slate-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3.3 ¿Qué pudo haberlo provocado? */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              ¿Qué pudo haberlo provocado?
            </span>
            <span className="text-slate-400 text-[10px]">Elige lo que reconozcas</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {triggersList.map(trig => {
              const isSelected = selectedTriggers.includes(trig.label);
              return (
                <button
                  key={trig.id}
                  type="button"
                  onClick={() => toggleTrigger(trig.label)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-teal-800 text-white border-teal-800 font-semibold shadow-sm'
                      : 'bg-[#EBF2FA] dark:bg-circadian-border border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <span>{trig.icon}</span>
                  <span>{trig.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3.4 ¿Cuánto duró aproximadamente? */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
            ¿Cuánto duró aproximadamente?
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: '<5min', label: 'Menos de 5 min' },
              { id: '5-15min', label: 'Entre 5 y 15 min' },
              { id: '>30min', label: 'Más de media hora' }
            ].map(d => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDuration(d.id as any)}
                className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                  duration === d.id
                    ? 'bg-teal-800 text-white border-teal-800 font-bold shadow-sm'
                    : 'bg-[#EBF2FA] dark:bg-circadian-border border-transparent text-slate-700 dark:text-slate-300'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Sincronización Inteligente: Tu pulso en ese momento */}
      <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 dark:text-cloud-200">
            <Heart className="w-4 h-4 text-teal-600" />
            <span>Tu pulso en ese momento</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">⌚ Sincronizado</span>
        </div>

        {/* Pulse ECG Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-circadian-border/60 border border-slate-100 dark:border-circadian-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-12 h-6 text-rose-500" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 10 H15 L20 2 L25 18 L30 6 L35 14 L40 10 H60" />
            </svg>
            <div>
              <span className="text-base font-bold text-slate-900 dark:text-cloud-200">
                88 ppm
              </span>
              <span className="text-xs text-rose-500 font-semibold ml-1.5">
                +18 pulsaciones
              </span>
              <p className="text-[10px] text-slate-400">
                Subió ligeramente mientras se disipaba el calor.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Es la reacción natural de tu cuerpo para abrir los vasos sanguíneos y disipar temperatura. No te asustes, volvió a su ritmo base en solo 5 minutos.
        </p>
      </div>

      {/* 5. Nota personal o audio */}
      <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-cloud-200">
            Nota personal o audio
          </span>
          <button className="flex items-center space-x-1 text-xs text-teal-700 dark:text-teal-400 font-semibold hover:underline">
            <Mic className="w-3.5 h-3.5" />
            <span>Grabar voz</span>
          </button>
        </div>

        <textarea
          rows={2}
          value={personalNote}
          onChange={e => setPersonalNote(e.target.value)}
          placeholder="Escribe cómo te sentiste o qué hacías..."
          className="w-full text-xs p-3.5 rounded-2xl bg-slate-50 dark:bg-circadian-border border border-slate-200 dark:border-circadian-border text-slate-800 dark:text-cloud-200 focus:outline-none focus:ring-2 focus:ring-teal-700"
        />

        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>Solo visible para ti</span>
          </span>
          <span>{personalNote.length} caracteres</span>
        </div>
      </div>

      {/* 6. ¿Necesitas refrescarte ahora? */}
      <div className="bg-[#EBF3DD] dark:bg-sage-950/40 rounded-3xl p-4 sm:p-5 border border-[#D5E6B8] dark:border-sage-900/60 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#D5E6B8] dark:bg-sage-900 flex items-center justify-center text-[#4D662E] dark:text-sage-300 shrink-0">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#3E5225] dark:text-sage-200">
              ¿Necesitas refrescarte ahora?
            </h4>
            <p className="text-[11px] text-[#4D662E] dark:text-sage-300 mt-0.5">
              Prueba una respiración guiada de 2 minutos para bajar tu temperatura.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCbtTimer}
          className="px-4 py-2 rounded-xl bg-[#4D662E] hover:bg-[#3E5225] text-white text-xs font-bold transition-colors shrink-0"
        >
          Empezar
        </button>
      </div>

      {/* 7. Botón Principal: Guardar en mi diario privado */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handleSave}
          disabled={isSaved}
          className="w-full py-3.5 px-6 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-80"
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-4 h-4 animate-spin" />
              <span>Guardando en bóveda...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Guardar en mi diario privado</span>
            </>
          )}
        </button>

        <p className="text-[10px] text-slate-400 text-center flex items-center justify-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Nunca sale de tu teléfono sin tu permiso explícito</span>
        </p>
      </div>

    </div>
  );
};
