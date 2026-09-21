import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Utensils, 
  Pill, 
  Dumbbell, 
  Heart, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  Flame, 
  Wind,
  Droplets,
  BookOpen
} from 'lucide-react';
import { HotFlashBreathingTimer } from '../components/HotFlashBreathingTimer';

export type AlivioCategory = 'todos' | 'nutricion' | 'suplementos' | 'pausas' | 'ejercicio';

export const InterventionsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<AlivioCategory>('todos');
  const [takenSupplements, setTakenSupplements] = useState<Record<string, boolean>>({});
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>('quinoa');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const toggleSupplement = (id: string) => {
    setTakenSupplements(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 pb-28 max-w-md mx-auto animate-fadeIn">
      
      {/* 1. Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-[#4D662E] dark:text-sage-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#4D662E] dark:text-sage-400" />
          <span>BIENESTAR INTEGRAL & ALIVIO</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-cloud-200 font-sans tracking-tight">
          Cuidados para tu día a día
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Pautas sencillas de alimentación, suplementación, movimiento y pausas de alivio pensadas para equilibrar tus hormonas con serenidad.
        </p>
      </div>

      {/* 2. Top Filter Pills: Nutrición, Suplementos, Pausas SOS, Ejercicio */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'todos', label: 'Todos', icon: '✨' },
          { id: 'nutricion', label: '🍲 Alimentación', icon: '🍲' },
          { id: 'suplementos', label: '💊 Suplementación', icon: '💊' },
          { id: 'pausas', label: '💨 Pausas SOS', icon: '💨' },
          { id: 'ejercicio', label: '💪 Ejercicio', icon: '💪' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as AlivioCategory)}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeCategory === cat.id
                ? 'bg-teal-800 text-white shadow-sm scale-105'
                : 'bg-white dark:bg-circadian-card text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-circadian-border hover:bg-slate-50'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* ================= SECCIÓN: PLATOS QUE NUTREN Y CALMAN (ALIMENTACIÓN) ================= */}
      {(activeCategory === 'todos' || activeCategory === 'nutricion') && (
        <div className="space-y-4 pt-1 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-cloud-200 flex items-center space-x-2">
              <Utensils className="w-4 h-4 text-teal-700" />
              <span>Platos que Nutren y Calman</span>
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Antiinflamatorio
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong>Comer para estar bien:</strong> No es una dieta rígida, priorizamos fitoestrógenos suaves (lino, legumbres) y grasas saludables que cuidan tu piel, microbiota y evitan picos de glucosa que desencadenan sofocos.
          </div>

          {/* Plato 1: Bowl de Quinoa y Salmón */}
          <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block mb-0.5">
                  ⏱️ 15 min • Almuerzo
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
                  Bowl templado de quinoa, salmón y semillas de lino
                </h4>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800">
                Fitoestrógenos
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Por qué te ayuda:</strong> El lino recién molido aporta lignanos (fitoestrógenos suaves que amortiguan la fluctuación estrogénica y sofocos) y el salmón brinda omega-3 puro antiinflamatorio.
            </p>

            <button
              onClick={() => setExpandedRecipe(expandedRecipe === 'quinoa' ? null : 'quinoa')}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-circadian-border text-xs font-semibold text-teal-800 dark:text-teal-400 flex items-center justify-between transition-colors"
            >
              <span>{expandedRecipe === 'quinoa' ? 'Ocultar ingredientes y preparación' : 'Ver ingredientes y preparación'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedRecipe === 'quinoa' ? 'rotate-180' : ''}`} />
            </button>

            {expandedRecipe === 'quinoa' && (
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-circadian-border/80 text-xs text-slate-700 dark:text-slate-300 space-y-2 border border-slate-100 dark:border-circadian-border animate-fadeIn">
                <strong className="block text-[11px] font-bold text-teal-900 dark:text-teal-300 uppercase">Ingredientes:</strong>
                <p>• 1 taza de quinoa cocida con una pizca de sal marina</p>
                <p>• 1 lomo de salmón fresco a la plancha con eneldo y limón</p>
                <p>• 1 cucharada sopera de semillas de lino dorado recién molidas</p>
                <p>• Medio aguacate en láminas, hojas de rúcula y aceite de oliva virgen extra</p>
                <strong className="block text-[11px] font-bold text-teal-900 dark:text-teal-300 uppercase pt-1">Preparación:</strong>
                <p>Sirve la base de quinoa templada, añade el salmón desmenuzado, el aguacate y espolvorea el lino al final para conservar intactos sus ácidos grasos.</p>
              </div>
            )}
          </div>

          {/* Plato 2: Crema de calabaza, jengibre y cúrcuma */}
          <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block mb-0.5">
                  ⏱️ 20 min • Cena ligera
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
                  Crema reconfortante de calabaza, jengibre y cúrcuma
                </h4>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800">
                Digestión Ligera
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Por qué te ayuda:</strong> Digestión ultra-ligera para evitar sobrecalentamiento nocturno. Las semillas de calabaza aportan zinc para tus defensas y triptófano para inducir el descanso.
            </p>

            <button
              onClick={() => setExpandedRecipe(expandedRecipe === 'calabaza' ? null : 'calabaza')}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-circadian-border text-xs font-semibold text-teal-800 dark:text-teal-400 flex items-center justify-between transition-colors"
            >
              <span>{expandedRecipe === 'calabaza' ? 'Ocultar ingredientes y preparación' : 'Ver ingredientes y preparación'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedRecipe === 'calabaza' ? 'rotate-180' : ''}`} />
            </button>

            {expandedRecipe === 'calabaza' && (
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-circadian-border/80 text-xs text-slate-700 dark:text-slate-300 space-y-2 border border-slate-100 dark:border-circadian-border animate-fadeIn">
                <strong className="block text-[11px] font-bold text-teal-900 dark:text-teal-300 uppercase">Ingredientes:</strong>
                <p>• 300g de calabaza cocida al vapor o asada</p>
                <p>• 1 trocito de jengibre fresco rallado (termorregulador)</p>
                <p>• 1/2 cucharadita de cúrcuma con pizca de pimienta negra</p>
                <p>• 1 chorrito de leche de coco suave y semillas de calabaza tostadas</p>
              </div>
            )}
          </div>

          {/* Plato 3: Pudin de Chía */}
          <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block mb-0.5">
                  ⏱️ 5 min víspera • Desayuno fresco
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
                  Pudin de chía con bebida vegetal, canela y frutos rojos
                </h4>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-800">
                Microbiota & Saciedad
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Por qué te ayuda:</strong> Sus mucílagos cuidan la mucosa digestiva, refrescan el organismo y aportan fibra soluble que estabiliza el azúcar en sangre.
            </p>

            <button
              onClick={() => setExpandedRecipe(expandedRecipe === 'chia' ? null : 'chia')}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-circadian-border text-xs font-semibold text-teal-800 dark:text-teal-400 flex items-center justify-between transition-colors"
            >
              <span>{expandedRecipe === 'chia' ? 'Ocultar ingredientes y preparación' : 'Ver ingredientes y preparación'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedRecipe === 'chia' ? 'rotate-180' : ''}`} />
            </button>

            {expandedRecipe === 'chia' && (
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-circadian-border/80 text-xs text-slate-700 dark:text-slate-300 space-y-2 border border-slate-100 dark:border-circadian-border animate-fadeIn">
                <strong className="block text-[11px] font-bold text-teal-900 dark:text-teal-300 uppercase">Ingredientes:</strong>
                <p>• 3 cucharadas soperas de semillas de chía</p>
                <p>• 200 ml de bebida de almendra o avena sin azúcares añadidos</p>
                <p>• Pizca de canela de Ceilán (regula la glucemia)</p>
                <p>• Arándanos y frambuesas frescas con un puñado de nueces</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= SECCIÓN: APOYO Y SUPLEMENTOS ================= */}
      {(activeCategory === 'todos' || activeCategory === 'suplementos') && (
        <div className="space-y-4 pt-1 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-cloud-200 flex items-center space-x-2">
              <Pill className="w-4 h-4 text-teal-700" />
              <span>Apoyo y Suplementación</span>
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
              Botiquín Natural
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 text-xs text-teal-900 dark:text-teal-200 leading-relaxed">
            Nutrientes clave que calman el sistema nervioso y cuidan tu densidad ósea. Consulta siempre con tu profesional de confianza.
          </div>

          {/* Magnesio */}
          <div className="bg-white dark:bg-circadian-card rounded-2xl p-4 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">
                🌙 Noche
              </span>
              <button
                onClick={() => toggleSupplement('magnesio')}
                className={`text-[11px] px-2.5 py-0.5 rounded-full border flex items-center space-x-1 font-medium ${
                  takenSupplements['magnesio']
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                {takenSupplements['magnesio'] ? '✓ Tomado hoy' : '🔘 Marcar tomado'}
              </button>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
              Magnesio Bisglicinato · 300 mg
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ayuda a relajar la musculatura, apacigua la mente acelerada y reduce los despertares espontáneos de las 3:00 am.
            </p>
            <span className="inline-block text-[10px] text-slate-400 bg-slate-50 dark:bg-circadian-border px-2 py-0.5 rounded-md">
              ⏰ 45 min antes de acostarte
            </span>
          </div>

          {/* Vitamina D3 + K2 */}
          <div className="bg-white dark:bg-circadian-card rounded-2xl p-4 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase">
                ☀️ Mañana
              </span>
              <button
                onClick={() => toggleSupplement('vitaminaD')}
                className={`text-[11px] px-2.5 py-0.5 rounded-full border flex items-center space-x-1 font-medium ${
                  takenSupplements['vitaminaD']
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                {takenSupplements['vitaminaD'] ? '✓ Tomado hoy' : '🔘 Marcar tomado'}
              </button>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
              Vitamina D3 + K2 (Gotas o perla)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Facilita que el calcio vaya directo a tus huesos y no a los vasos sanguíneos, impulsando además tu vitalidad y defensas.
            </p>
            <span className="inline-block text-[10px] text-slate-400 bg-slate-50 dark:bg-circadian-border px-2 py-0.5 rounded-md">
              🍳 Desayuno con grasas buenas
            </span>
          </div>

          {/* Omega 3 */}
          <div className="bg-white dark:bg-circadian-card rounded-2xl p-4 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300 uppercase">
                🥗 Mediodía
              </span>
              <button
                onClick={() => toggleSupplement('omega3')}
                className={`text-[11px] px-2.5 py-0.5 rounded-full border flex items-center space-x-1 font-medium ${
                  takenSupplements['omega3']
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                {takenSupplements['omega3'] ? '✓ Tomado hoy' : '🔘 Marcar tomado'}
              </button>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
              Omega-3 puro (EPA / DHA)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Buena para la sequedad de la piel y mucosas, alivia la rigidez articular matutina y despeja la sensación de niebla mental.
            </p>
            <span className="inline-block text-[10px] text-slate-400 bg-slate-50 dark:bg-circadian-border px-2 py-0.5 rounded-md">
              🥗 Junto a la comida del mediodía
            </span>
          </div>
        </div>
      )}

      {/* ================= SECCIÓN: PAUSAS DE ALIVIO SOS ================= */}
      {(activeCategory === 'todos' || activeCategory === 'pausas') && (
        <div className="space-y-4 pt-1 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-cloud-200 flex items-center space-x-2">
              <Wind className="w-4 h-4 text-teal-700" />
              <span>Pausas de Alivio Inmediato</span>
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800">
              SOS 2 Minutos
            </span>
          </div>

          {/* Pacer Visual */}
          <div className="bg-[#EBF2FA] dark:bg-circadian-card rounded-3xl p-5 border border-sky-100 dark:border-circadian-border space-y-3">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
                Respiración para enfriar y calmar (4-7-8)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Una respiración pausada ayuda a que tu cuerpo regule la temperatura y baje las pulsaciones.
              </p>
            </div>
            <HotFlashBreathingTimer />
          </div>

          {/* Bruma facial & Infusión */}
          <div className="bg-white dark:bg-circadian-card rounded-2xl p-4 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-2">
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800">
              ❄️ Alivio rápido en segundos
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
              Bruma refrescante facial y de cuello
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Efecto frío instantáneo con bisabolol de camomila y ácido hialurónico.
            </p>
            <button
              onClick={() => setActiveModal('bruma')}
              className="text-xs font-bold text-teal-800 dark:text-teal-400 hover:underline flex items-center space-x-1"
            >
              <span>Ver cómo aplicarla</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= SECCIÓN: MOVERTE SIN AGOTARTE ================= */}
      {(activeCategory === 'todos' || activeCategory === 'ejercicio') && (
        <div className="space-y-4 pt-1 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-cloud-200 flex items-center space-x-2">
              <Dumbbell className="w-4 h-4 text-teal-700" />
              <span>Moverte sin Agotarte</span>
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sage-100 text-sage-800">
              Adaptado
            </span>
          </div>

          <div className="bg-white dark:bg-circadian-card rounded-2xl p-4 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-2">
            <span className="text-[10px] text-slate-400 font-medium">⏱️ 15-20 min • 3x semana</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
              Fuerza básica para proteger postura y huesos
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              4 ejercicios amables: Sentadilla a silla, puente de glúteo, remo unilateral con botella y press suave de hombros.
            </p>
            <button
              onClick={() => setActiveModal('fuerza')}
              className="w-full py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold flex items-center justify-center space-x-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Ver rutina guiada (Paso a paso)</span>
            </button>
          </div>
        </div>
      )}

      {/* Cita Inspiradora */}
      <div className="text-center py-6 space-y-1">
        <div className="w-7 h-7 rounded-full bg-sage-100 dark:bg-sage-950/60 mx-auto flex items-center justify-center text-sage-600 dark:text-sage-400">
          <Heart className="w-4 h-4" />
        </div>
        <p className="text-xs italic text-slate-600 dark:text-slate-400 font-serif max-w-xs mx-auto">
          “Cuidarse no es exigirse perfección ni cumplir metas rígidas; es aprender a escuchar con ternura qué necesita hoy tu cuerpo.”
        </p>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-circadian-card w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-circadian-border space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-circadian-border">
              <h3 className="font-bold text-base text-slate-900 dark:text-cloud-200">
                {activeModal === 'bruma' ? 'Bruma Refrescante Facial y de Cuello' : 'Ejercicio de Fuerza para Huesos'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModal === 'bruma' && 'Aplica 2 o 3 pulsaciones a 20 cm del rostro y cuello ante la primera sensación de acaloramiento. Sus fitoactivos botánicos refrescan la epidermis y calman la microcirculación dérmica.'}
              {activeModal === 'fuerza' && 'Realiza 3 series de 10 repeticiones de cada movimiento con descansos de 1 minuto. La tracción muscular sobre los huesos es la señal biológica indispensable para preservar la densidad ósea.'}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-teal-800 text-white text-xs font-bold"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
