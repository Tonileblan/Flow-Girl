import React, { useState } from 'react';
import { 
  Sun, 
  CheckCircle2, 
  Flame, 
  Brain, 
  Moon, 
  Activity, 
  Play, 
  Sparkles, 
  Heart,
  Droplet
} from 'lucide-react';
import { SymptomDefinition, BASE_SYMPTOMS_CATALOG } from '../../domain/models/symptom';

interface DashboardViewProps {
  onOpenSymptomModal: (symptom: SymptomDefinition) => void;
  onNavigateToTab: (tab: any) => void;
  onOpenCbtTimer: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenSymptomModal,
  onNavigateToTab,
  onOpenCbtTimer
}) => {
  const [magnesiumChecked, setMagnesiumChecked] = useState(false);

  const hotFlashDef = BASE_SYMPTOMS_CATALOG.find(s => s.id === 'hot_flashes')!;
  const brainFogDef = BASE_SYMPTOMS_CATALOG.find(s => s.id === 'brain_fog')!;
  const insomniaDef = BASE_SYMPTOMS_CATALOG.find(s => s.id === 'insomnia')!;
  const jointPainDef = BASE_SYMPTOMS_CATALOG.find(s => s.id === 'joint_pain')!;

  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto animate-fadeIn">
      
      {/* 1. Header Greeting & Cycle Status */}
      <div className="flex items-start justify-between pt-1">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-cloud-200 font-sans tracking-tight">
            Buenos días, Elena
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
            Momento de tu ciclo: <strong className="text-teal-800 dark:text-teal-300 font-semibold">Días previos a tu regla</strong> (Día 23)
          </p>
        </div>
        <div className="p-2.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
          <Sun className="w-5 h-5" />
        </div>
      </div>

      {/* 2. Tu cuerpo hoy: Transición natural */}
      <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sage-500"></span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-cloud-200 font-sans">
              Tu cuerpo hoy: Transición natural
            </h2>
          </div>
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-circadian-border text-slate-600 dark:text-slate-300">
            Semana del 12 al 18 oct
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Tus niveles hormonales varían normalmente estos días. Es natural notar cambios de ritmo en tu energía, temperatura y estado de ánimo.
        </p>

        {/* Biorhythm Wave Visual Graphic */}
        <div className="bg-slate-50 dark:bg-circadian-border/50 rounded-2xl p-4 border border-slate-100 dark:border-circadian-border space-y-2">
          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            <span>Fase de escucha: <strong className="text-teal-700 dark:text-teal-400">Fluctuación suave hoy</strong></span>
            <span>Próxima regla</span>
          </div>

          <div className="relative h-12 w-full flex items-center">
            {/* Smooth SVG Wave */}
            <svg className="w-full h-full" viewBox="0 0 300 40" fill="none" preserveAspectRatio="none">
              <path
                d="M0 25 C50 10, 100 35, 150 20 C200 10, 250 30, 300 18"
                stroke="#008080"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Active point on curve */}
              <circle cx="170" cy="18" r="5" fill="#008080" className="animate-ping opacity-75" />
              <circle cx="170" cy="18" r="4" fill="#008080" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Non-punitive Reassurance Box */}
        <div className="bg-[#F0F6EA] dark:bg-sage-950/40 rounded-2xl p-3.5 border border-[#D5E6B8] dark:border-sage-900/60 flex items-start space-x-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#4D662E] dark:text-sage-400 mt-0.5 shrink-0" />
          <p className="text-xs text-[#3E5225] dark:text-sage-200 leading-snug">
            Tus ciclos muestran variaciones normales de esta etapa, sin motivos de alarma. Todo está bien atendido.
          </p>
        </div>
      </div>

      {/* 3. ¿Cómo te sientes hoy? (Toca para anotar en 1 segundo) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-cloud-200 font-sans">
            ¿Cómo te sientes hoy?
          </h3>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Toca para anotar en 1 segundo
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          
          {/* Card 1: Sofoco / Calor */}
          <div className="bg-white dark:bg-circadian-card rounded-2xl p-4 border border-slate-200/80 dark:border-circadian-border shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Intensidad</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200 mt-2">
                Sofoco / Calor
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Calor repentino
              </p>
            </div>
            <button
              onClick={() => onOpenSymptomModal(hotFlashDef)}
              className="w-full py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              + Registrar
            </button>
          </div>

          {/* Card 2: Claridad mental */}
          <div className="bg-white dark:bg-circadian-card rounded-2xl p-4 border border-slate-200/80 dark:border-circadian-border shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center text-sky-600">
                  <Brain className="w-4 h-4" />
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200 mt-2">
                Claridad mental
              </h4>
              <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium">
                Despejada y tranquila
              </p>
            </div>
            <button
              onClick={() => onOpenSymptomModal(brainFogDef)}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-circadian-border hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              Actualizar
            </button>
          </div>

          {/* Card 3: Calidad de sueño */}
          <div className="bg-white dark:bg-circadian-card rounded-2xl p-4 border border-slate-200/80 dark:border-circadian-border shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600">
                  <Moon className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Anoche</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200 mt-2">
                Calidad de sueño
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Despertar a las 2:00 am
              </p>
            </div>
            <button
              onClick={() => onOpenSymptomModal(insomniaDef)}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-circadian-border hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              Ajustar notas
            </button>
          </div>

          {/* Card 4: Articulaciones */}
          <div className="bg-white dark:bg-circadian-card rounded-2xl p-4 border border-slate-200/80 dark:border-circadian-border shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-sage-50 dark:bg-sage-950/50 flex items-center justify-center text-sage-600">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Leve</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200 mt-2">
                Articulaciones
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Revisión mañanera
              </p>
            </div>
            <button
              onClick={() => onOpenSymptomModal(jointPainDef)}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-circadian-border hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              + Anotar sensación
            </button>
          </div>

        </div>
      </div>

      {/* 4. Consejo Para Esta Tarde */}
      <div className="bg-[#EBF2FA] dark:bg-circadian-card rounded-3xl p-5 border border-sky-100 dark:border-circadian-border space-y-3">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CONSEJO PARA ESTA TARDE</span>
        </div>

        <h4 className="text-base font-bold text-slate-900 dark:text-cloud-200 font-sans leading-snug">
          Hemos notado que te ha costado descansar estas noches. Es muy habitual cuando bajan las hormonas de la calma.
        </h4>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Tomarte una pausa de respiración guiada te ayudará a relajar el sistema nervioso antes de que acabe el día.
        </p>

        <button
          onClick={onOpenCbtTimer}
          className="w-full py-3 px-4 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Hacer pausa guiada de calma (4 min)</span>
        </button>

        <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center block pt-0.5">
          Ideal antes de las 18:30 para descansar mejor esta noche
        </span>
      </div>

      {/* 5. Pequeños hábitos para hoy */}
      <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3.5">
        <h3 className="font-bold text-base text-slate-900 dark:text-cloud-200 font-sans">
          Pequeños hábitos para hoy
        </h3>

        {/* Item 1: Luz del sol */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="flex items-center space-x-2 text-slate-800 dark:text-cloud-200">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Luz del sol por la mañana</span>
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">15 de 20 min</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-circadian-border rounded-full overflow-hidden">
            <div className="h-full bg-sage-600 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Item 2: Agua y electrolitos */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-medium">
            <span className="flex items-center space-x-2 text-slate-800 dark:text-cloud-200">
              <Droplet className="w-4 h-4 text-teal-600" />
              <span>Agua y electrolitos</span>
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">1.4 L de 2.0 L</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-circadian-border rounded-full overflow-hidden">
            <div className="h-full bg-teal-600 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>

        {/* Item 3: Tu magnesio de noche */}
        <div className="pt-2 border-t border-slate-100 dark:border-circadian-border flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600">
              <Moon className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-cloud-200 block">
                Tu magnesio de noche
              </span>
              <span className="text-[10px] text-slate-400">
                Recordatorio para las 21:00
              </span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={magnesiumChecked}
            onChange={() => setMagnesiumChecked(!magnesiumChecked)}
            className="w-5 h-5 rounded-lg border-slate-300 dark:border-circadian-border text-teal-600 focus:ring-teal-500 cursor-pointer"
          />
        </div>
      </div>

      {/* 6. Cita Inspiradora */}
      <div className="text-center py-4 space-y-1">
        <div className="w-6 h-6 rounded-full bg-sage-100 dark:bg-sage-950/60 mx-auto flex items-center justify-center text-sage-600 dark:text-sage-400">
          <Heart className="w-3.5 h-3.5" />
        </div>
        <p className="text-xs italic text-slate-600 dark:text-slate-400 font-serif max-w-xs mx-auto">
          “Cada cuerpo tiene su propio ritmo. Escucharte es cuidarte.”
        </p>
      </div>

    </div>
  );
};
