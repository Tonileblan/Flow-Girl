import React, { useState } from 'react';
import { 
  Moon, 
  Flame, 
  Wind, 
  Play, 
  Pause, 
  Volume2, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  BedDouble,
  Sparkles
} from 'lucide-react';
import { HotFlashBreathingTimer } from '../components/HotFlashBreathingTimer';

interface CircadianNightViewProps {
  onRecordQuickNightFlash: () => void;
}

export const CircadianNightView: React.FC<CircadianNightViewProps> = ({
  onRecordQuickNightFlash
}) => {
  const [showSosBreathing, setShowSosBreathing] = useState(false);
  const [isPlayingDelta, setIsPlayingDelta] = useState(false);
  const [audioMode, setAudioMode] = useState<'lluvia' | 'hogar' | 'cosmos'>('lluvia');
  const [volume, setVolume] = useState(65);
  const [sheetsChanged, setSheetsChanged] = useState(false);
  const [autoLoggedNightFlash, setAutoLoggedNightFlash] = useState(true);

  const handleTriggerSos = () => {
    onRecordQuickNightFlash();
    setAutoLoggedNightFlash(true);
    setShowSosBreathing(true);
  };

  const handleSheetsChange = () => {
    setSheetsChanged(true);
    setTimeout(() => setSheetsChanged(false), 3000);
  };

  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto animate-fadeIn text-slate-800 dark:text-cloud-200">
      
      {/* 1. Escudo Libre de Luz Azul Activo · 590nm */}
      <div className="text-center">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EBF3DD] dark:bg-emerald-950/60 text-[#4D662E] dark:text-emerald-300 border border-[#D5E6B8] dark:border-emerald-800 text-[11px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Escudo Libre de Luz Azul Activo · 590nm</span>
        </span>
      </div>

      {/* 2. Hero Time & Melatonin Status */}
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight font-sans text-slate-900 dark:text-cloud-200">
          03:14 AM <span className="text-xs font-normal text-slate-500 dark:text-slate-400">• Mantenimiento de Melatonina</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
          Atenuación apta para OLED activada. Tu síntesis de melatonina está protegida.
        </p>
      </div>

      {/* 3. Central SOS Hot Flash Button */}
      <div className="flex flex-col items-center justify-center pt-2 pb-2 text-center space-y-3">
        <div className="relative">
          {/* Outer gentle ambient pulse ring */}
          <div className="absolute -inset-3 rounded-full bg-teal-500/15 dark:bg-teal-400/10 blur-md animate-pulse"></div>
          
          <button
            onClick={handleTriggerSos}
            className="relative w-44 h-44 rounded-full bg-gradient-to-b from-sky-50 via-teal-50 to-teal-100 dark:from-circadian-card dark:via-circadian-card dark:to-teal-950 border-4 border-sky-100 dark:border-teal-800 shadow-xl flex flex-col items-center justify-center p-4 text-center transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-full bg-teal-700 dark:bg-teal-600 text-white flex items-center justify-center mb-1 shadow-sm group-hover:rotate-12 transition-transform">
              <Wind className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-sm text-teal-950 dark:text-cloud-200 leading-tight">
              SOS Sofoco / Bochorno
            </span>
            <span className="text-[10px] text-teal-700 dark:text-teal-400 mt-1">
              Toca para registrar y enfriar
            </span>
          </button>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-teal-800 dark:text-teal-400 uppercase tracking-wider block">
            ACTIVACIÓN DE ENFRIAMIENTO INMEDIATO
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs">
            1 toque registra el pico biométrico y activa el ritmo parasimpático vagal.
          </p>
        </div>
      </div>

      {/* 4. Active Breathing Modal if SOS clicked */}
      {showSosBreathing && (
        <div className="animate-fadeIn">
          <HotFlashBreathingTimer onClose={() => setShowSosBreathing(false)} />
        </div>
      )}

      {/* 5. Card: Regulación Vagal: Ritmo 4-7-8 */}
      <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-teal-700" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-cloud-200 font-sans">
              Regulación Vagal: Ritmo 4-7-8
            </h3>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-circadian-border text-slate-600 dark:text-slate-300">
            Mantener · 7s
          </span>
        </div>

        {/* Campana Suave info box */}
        <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 flex items-center justify-between text-xs text-sky-900 dark:text-sky-200">
          <span className="flex items-center space-x-2">
            <span>🎧</span>
            <span>Respuesta por Campana Suave</span>
          </span>
          <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold">
            Sincronización 0.1 Hz
          </span>
        </div>

        {/* 3 Phases Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setShowSosBreathing(true)}
            className="py-2.5 px-2 rounded-xl bg-slate-50 dark:bg-circadian-border text-center border border-slate-100 dark:border-circadian-border hover:bg-teal-50"
          >
            <div className="text-[9px] text-slate-400">Fase 1</div>
            <div className="text-xs font-bold text-slate-800 dark:text-cloud-200">Inhalar 4s</div>
          </button>
          <button
            onClick={() => setShowSosBreathing(true)}
            className="py-2.5 px-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-center border border-teal-200 dark:border-teal-800"
          >
            <div className="text-[9px] text-teal-600">Fase 2</div>
            <div className="text-xs font-bold text-teal-900 dark:text-teal-200">Mantener 7s</div>
          </button>
          <button
            onClick={() => setShowSosBreathing(true)}
            className="py-2.5 px-2 rounded-xl bg-slate-50 dark:bg-circadian-border text-center border border-slate-100 dark:border-circadian-border hover:bg-teal-50"
          >
            <div className="text-[9px] text-slate-400">Fase 3</div>
            <div className="text-xs font-bold text-slate-800 dark:text-cloud-200">Exhalar 8s</div>
          </button>
        </div>
      </div>

      {/* 6. Card: Sincronía Delta 1.5Hz (Audio Player) */}
      <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF3DD] dark:bg-sage-950/60 flex items-center justify-center text-[#4D662E] dark:text-sage-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
                Sincronía Delta 1.5Hz
              </h3>
              <p className="text-[11px] text-slate-400">
                Lluvia Profunda y Ruido Marrón...
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPlayingDelta(!isPlayingDelta)}
            className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-900 text-white flex items-center justify-center shadow-md transition-transform active:scale-95"
          >
            {isPlayingDelta ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
        </div>

        {/* Audio Modes & Timer */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[10px] text-slate-400 flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Apagado automático en 28 min</span>
          </span>

          <div className="flex space-x-1">
            {(['lluvia', 'hogar', 'cosmos'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setAudioMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize transition-colors ${
                  audioMode === mode
                    ? 'bg-[#EBF3DD] text-[#4D662E] dark:bg-emerald-950/80 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-circadian-border text-slate-500'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center space-x-3 pt-1">
          <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-circadian-border rounded-lg appearance-none cursor-pointer accent-teal-800"
          />
        </div>
      </div>

      {/* 7. Card: REGISTRO AUTOMÁTICO EN LA CAMA */}
      {autoLoggedNightFlash && (
        <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-cloud-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>REGISTRO AUTOMÁTICO EN LA CAMA</span>
            </div>
            <span className="text-[10px] text-slate-400">03:14 AM</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Sudor nocturno registrado automáticamente. Severidad registrada: <strong>8/10</strong>. La oleada vasomotora está desacelerando.
          </p>

          <div className="pt-1 flex items-center justify-between text-xs border-t border-slate-100 dark:border-circadian-border">
            <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>FC descendió -9 lpm a 62 lpm</span>
            </span>
            <span className="text-slate-400 text-[11px] italic">
              Vuelve a descansar, Elena
            </span>
          </div>
        </div>
      )}

      {/* 8. Quick Action: Sábanas Cambiadas */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-circadian-border/60 border border-slate-200/60 dark:border-circadian-border text-xs">
        <span className="text-slate-600 dark:text-slate-300 font-medium">
          ¿Necesitas marcar cambio de sábanas?
        </span>

        <button
          onClick={handleSheetsChange}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 dark:bg-sky-950 dark:hover:bg-sky-900 text-teal-900 dark:text-teal-200 font-semibold transition-colors"
        >
          <BedDouble className="w-3.5 h-3.5" />
          <span>{sheetsChanged ? '✓ Registrado' : 'Sábanas Cambiadas (+1 Registro)'}</span>
        </button>
      </div>

    </div>
  );
};
