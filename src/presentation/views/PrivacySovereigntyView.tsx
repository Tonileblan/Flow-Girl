import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Download, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Key, 
  HardDrive 
} from 'lucide-react';
import { LocalEncryptedStorage } from '../../infrastructure/storage/EncryptedLocalStorage';

interface PrivacySovereigntyViewProps {
  storage: LocalEncryptedStorage;
  onDataModified: () => void;
}

export const PrivacySovereigntyView: React.FC<PrivacySovereigntyViewProps> = ({
  storage,
  onDataModified
}) => {
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExport = async () => {
    const jsonStr = await storage.exportEncryptedVault();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FlowGirl_Local_Vault_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 3000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const success = await storage.importVault(content);
      if (success) {
        setImportStatus('Bóveda restaurada correctamente con éxito.');
        onDataModified();
      } else {
        setImportStatus('Error: Archivo JSON no compatible o corrupto.');
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleWipeAll = async () => {
    if (window.confirm('¿Seguro que deseas eliminar todos los datos de salud de este dispositivo? Esta acción es irreversible.')) {
      await storage.clearAll();
      onDataModified();
      alert('Bóveda local eliminada por completo.');
    }
  };

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      
      {/* Sovereignty Header */}
      <div className="bg-white dark:bg-circadian-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-circadian-border shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Soberanía de Datos & Criptografía
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-cloud-200 font-sans">
              Arquitectura Local-First Zero-Knowledge
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          En Flow-Girl tu información hormonal jamás se comercializa ni se almacena en nubes centralizadas sin cifrar. Todos los biomarcadores se custodian localmente en tu dispositivo bajo estándares de privacidad <strong>RGPD y HIPAA</strong>.
        </p>
      </div>

      {/* Security Architecture Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div className="bg-white dark:bg-circadian-card rounded-2xl p-5 border border-slate-200 dark:border-circadian-border shadow-sm space-y-2">
          <div className="flex items-center space-x-2 text-teal-700 dark:text-teal-400 font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>Cifrado en Cliente (WebCrypto)</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Las claves criptográficas nunca salen de tu navegador. Si el dispositivo se apaga, tus datos permanecen seguros.
          </p>
        </div>

        <div className="bg-white dark:bg-circadian-card rounded-2xl p-5 border border-slate-200 dark:border-circadian-border shadow-sm space-y-2">
          <div className="flex items-center space-x-2 text-teal-700 dark:text-teal-400 font-bold text-sm">
            <HardDrive className="w-4 h-4" />
            <span>Sin Rastreadores / Anti Pink-Washing</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Cero telemetría invasiva con anunciantes. Tu transición hormonal es un asunto clínico estrictamente privado.
          </p>
        </div>

      </div>

      {/* Backup & Data Sovereignty Actions */}
      <div className="bg-white dark:bg-circadian-card rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-circadian-border shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-cloud-200 font-sans">
          Gestión de tu Bóveda de Salud
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Export JSON Vault */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-circadian-border/60 border border-slate-200/60 dark:border-circadian-border space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
                Exportar Copia de Seguridad Cifrada
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Descarga un archivo JSON con todo tu historial de síntomas, ciclos y estadísticas.
              </p>
            </div>
            <button
              onClick={handleExport}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Bóveda JSON</span>
            </button>
          </div>

          {/* Import JSON Vault */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-circadian-border/60 border border-slate-200/60 dark:border-circadian-border space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-cloud-200">
                Restaurar desde Archivo Local
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Carga una copia de seguridad previa para sincronizar tu nuevo dispositivo.
              </p>
            </div>
            <label className="w-full py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-circadian-border hover:bg-slate-300 dark:hover:bg-circadian-border/80 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer text-center">
              <Upload className="w-4 h-4" />
              <span>Seleccionar Archivo JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

        </div>

        {copiedStatus && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Copia de seguridad generada y descargada.</span>
          </p>
        )}

        {importStatus && (
          <p className="text-xs text-teal-600 dark:text-teal-400 font-medium flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>{importStatus}</span>
          </p>
        )}

        {/* Destruction / GDPR Right to be Forgotten */}
        <div className="pt-4 border-t border-slate-100 dark:border-circadian-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
              Derecho al Olvido (RGPD Art. 17)
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Elimina de forma irreversible todos los registros del almacenamiento de este equipo.
            </p>
          </div>

          <button
            onClick={handleWipeAll}
            className="px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center justify-center space-x-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Borrar Bóveda Local</span>
          </button>
        </div>

      </div>

    </div>
  );
};
