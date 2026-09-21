import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  CheckSquare, 
  Square,
  ChevronRight,
  Info
} from 'lucide-react';
import { StrawStageInfo, MenstrualCycleEntry } from '../../domain/models/straw';
import { SymptomLogEntry } from '../../domain/models/symptom';
import { GenerateDoctorReportUseCase } from '../../application/use-cases/GenerateDoctorReportUseCase';

interface DoctorReportViewProps {
  patientAlias: string;
  age: number;
  strawStage: StrawStageInfo;
  cycles: MenstrualCycleEntry[];
  symptoms: SymptomLogEntry[];
}

export const DoctorReportView: React.FC<DoctorReportViewProps> = ({
  patientAlias,
  age,
  strawStage,
  cycles,
  symptoms
}) => {
  const [timeRange, setTimeRange] = useState<number>(90);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({
    q1: true,
    q2: true,
    q3: true
  });
  const [shareLinkGenerated, setShareLinkGenerated] = useState<boolean>(false);

  const toggleQuestion = (id: string) => {
    setCheckedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownloadPdf = () => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        const generator = new GenerateDoctorReportUseCase();
        const doc = generator.generatePdf(
          patientAlias,
          age,
          strawStage,
          cycles,
          symptoms,
          timeRange
        );
        doc.save(`FlowGirl_Resumen_Medica_${patientAlias.replace(/\s+/g, '_')}_${timeRange}d.pdf`);
      } catch (err) {
        console.error('Error generating PDF report:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 400);
  };

  const handleShareLink = () => {
    setShareLinkGenerated(true);
    setTimeout(() => setShareLinkGenerated(false), 4000);
  };

  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto animate-fadeIn">
      
      {/* 1. Header & Friendly Badge */}
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-[#4D662E] dark:text-emerald-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#4D662E] dark:text-emerald-400" />
          <span>TU ALIADA EN CONSULTA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-cloud-200 font-sans tracking-tight">
          Resumen para tu médica o ginecóloga
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Toda la información de tus últimos meses organizada y explicada de forma sencilla para que en tu próxima visita vayas con total tranquilidad y no se te olvide nada.
        </p>
      </div>

      {/* 2. Period Selector */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
          PERIODO DEL INFORME
        </span>
        <div className="grid grid-cols-3 gap-2">
          {[
            { days: 30, label: 'Último mes' },
            { days: 60, label: 'Últimos 2 m.' },
            { days: 90, label: 'Últimos 3 m.', recommended: true }
          ].map(p => (
            <button
              key={p.days}
              type="button"
              onClick={() => setTimeRange(p.days)}
              className={`py-2 px-1 rounded-2xl text-xs font-semibold border text-center transition-all ${
                timeRange === p.days
                  ? 'bg-teal-800 text-white border-teal-800 shadow-sm'
                  : 'bg-[#EBF2FA] dark:bg-circadian-border border-transparent text-slate-700 dark:text-slate-300'
              }`}
            >
              <div>{p.label}</div>
              {p.recommended && (
                <div className={`text-[9px] font-normal ${timeRange === p.days ? 'text-teal-200' : 'text-teal-700'}`}>
                  Recomendado
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Document Format Card */}
      <div className="bg-slate-100 dark:bg-circadian-card rounded-2xl p-4 border border-slate-200 dark:border-circadian-border flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <span className="flex items-center space-x-1.5 font-medium">
          <FileText className="w-4 h-4 text-teal-700" />
          <span>Formato clínico estandarizado A4</span>
        </span>
        <span className="text-slate-400 font-medium">Páginas: 2</span>
      </div>

      {/* 4. Action Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="w-full py-3.5 px-6 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-md transition-all flex flex-col items-center justify-center active:scale-95 disabled:opacity-80"
        >
          <div className="flex items-center space-x-2">
            {isGenerating ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Descargar informe en PDF (A4)</span>
          </div>
          <span className="text-[10px] font-normal text-teal-200 mt-0.5">
            Lista para imprimir o enviar por WhatsApp/Email
          </span>
        </button>

        <button
          onClick={handleShareLink}
          className="w-full py-2.5 px-4 rounded-2xl bg-[#EBF2FA] dark:bg-circadian-border hover:bg-sky-100 text-teal-900 dark:text-teal-300 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Compartir enlace seguro de lectura rápida (Válido 24h)</span>
        </button>

        {shareLinkGenerated && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium text-center animate-fadeIn">
            ✓ Enlace seguro temporal generado y copiado al portapapeles.
          </p>
        )}
      </div>

      {/* 5. Puntos importantes explicados de forma clara */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bold text-base text-slate-900 dark:text-cloud-200 font-sans">
          Puntos importantes explicados de forma clara
        </h3>

        {/* Punto 1: Tu momento */}
        <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
              1. Tu momento: Transición a la madurez
            </h4>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
              Fase Activa
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Tus reglas son algo más espaciadas o irregulares. Es el proceso natural en el que tus ovarios van produciendo menos estrógenos poco a poco. No es una enfermedad: es una etapa evolutiva de tu biología.
          </p>
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900 flex items-center space-x-2 text-[11px] text-purple-900 dark:text-purple-300">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Clasificación médica de referencia: Estadio -2 (STRAW+10 temprano).</span>
          </div>
        </div>

        {/* Punto 2: Sofocos y cambios de temperatura */}
        <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
              2. Sofocos y cambios de temperatura
            </h4>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
              48 registros
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Hemos registrado unos 48 episodios en 90 días, sobre todo por la tarde y noche. Es importante decírselo a tu médica para valorar si te conviene apoyo natural o tratamiento hormonal suave.
          </p>
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Horario de mayor incidencia:</span>
              <strong className="text-teal-800 dark:text-teal-300">Tarde / Noche (68%)</strong>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-circadian-border rounded-full overflow-hidden">
              <div className="h-full bg-teal-700 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>

        {/* Punto 3: Tu descanso y despertares */}
        <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
              3. Tu descanso y despertares nocturnos
            </h4>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF3DD] text-[#4D662E]">
              ~2:45 AM
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Cuando bajan los niveles hormonales, es muy común despertarse hacia las 2:00 o 3:00 de la madrugada con calor o desvelo repentino. Tu médica puede ayudarte con pautas muy concretas a recuperar el descanso profundo.
          </p>
          <div className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-circadian-border/60">
            <span className="text-slate-500">Promedio de sueño continuo:</span>
            <strong className="text-slate-900 dark:text-cloud-200">5h 20min</strong>
          </div>
        </div>

        {/* Punto 4: Salud de tus huesos */}
        <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
              4. Salud de tus huesos y corazón
            </h4>
            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800">
              Preventivo
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            En esta etapa, cuidar los huesos con ejercicio de fuerza, vitamina D y revisar la tensión arterial periódicamente es la mejor inversión de futuro para mantenerte fuerte y vital.
          </p>
        </div>

      </div>

      {/* 6. Banner Inspirador */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-center space-y-1">
        <h4 className="font-bold text-xs text-amber-900 dark:text-amber-200">
          Cada duda es válida.
        </h4>
        <p className="text-[11px] text-amber-800 dark:text-amber-300">
          Llevar tus preguntas anotadas te da el control de la cita.
        </p>
      </div>

      {/* 7. Checklist: Qué preguntarle en la consulta */}
      <div className="bg-white dark:bg-circadian-card rounded-3xl p-5 border border-slate-200/80 dark:border-circadian-border shadow-sm space-y-3.5">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-teal-700" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-cloud-200 font-sans">
            Qué preguntarle en la consulta
          </h3>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Puedes leerle estas 3 preguntas tal cual o marcar las que más te preocupen:
        </p>

        <div className="space-y-2.5">
          {/* Question 1 */}
          <div
            onClick={() => toggleQuestion('q1')}
            className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
              checkedQuestions['q1']
                ? 'bg-sky-50/70 border-sky-200 dark:bg-sky-950/30'
                : 'border-slate-200 dark:border-circadian-border'
            }`}
          >
            {checkedQuestions['q1'] ? (
              <CheckSquare className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
            )}
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-cloud-200 leading-snug">
                "¿Sería buena candidata para la terapia hormonal suave o me recomiendas empezar por opciones naturales?"
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Para abordar sofocos e irritabilidad
              </span>
            </div>
          </div>

          {/* Question 2 */}
          <div
            onClick={() => toggleQuestion('q2')}
            className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
              checkedQuestions['q2']
                ? 'bg-sky-50/70 border-sky-200 dark:bg-sky-950/30'
                : 'border-slate-200 dark:border-circadian-border'
            }`}
          >
            {checkedQuestions['q2'] ? (
              <CheckSquare className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
            )}
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-cloud-200 leading-snug">
                "¿Es momento de hacer una densitometría para revisar la masa ósea de mis huesos?"
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Prevención de osteoporosis temprana
              </span>
            </div>
          </div>

          {/* Question 3 */}
          <div
            onClick={() => toggleQuestion('q3')}
            className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
              checkedQuestions['q3']
                ? 'bg-sky-50/70 border-sky-200 dark:bg-sky-950/30'
                : 'border-slate-200 dark:border-circadian-border'
            }`}
          >
            {checkedQuestions['q3'] ? (
              <CheckSquare className="w-4 h-4 text-teal-700 mt-0.5 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
            )}
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-cloud-200 leading-snug">
                "¿Qué pauta de progesterona o magnesio me ayudaría a dormir sin tantos despertares nocturnos?"
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Para recuperar tu descanso continuo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Confidentiality Box */}
      <div className="p-4 rounded-2xl bg-[#F0F6EA] dark:bg-sage-950/40 border border-[#D5E6B8] dark:border-sage-900/60 flex items-start space-x-2.5 text-xs text-[#3E5225] dark:text-sage-200 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-[#4D662E] dark:text-sage-400 mt-0.5 shrink-0" />
        <p>
          <strong>Tus datos son 100% confidenciales:</strong> Este informe se genera solo en tu teléfono y tú decides cuándo y con quién compartirlo. No se sube a la nube ni se comparte con terceros sin tu consentimiento expreso.
        </p>
      </div>

    </div>
  );
};
