import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HeaderNav } from './presentation/components/HeaderNav';
import { BottomNav, TabType } from './presentation/components/BottomNav';
import { DashboardView } from './presentation/views/DashboardView';
import { BiomarkerMatrixView } from './presentation/views/BiomarkerMatrixView';
import { InterventionsView } from './presentation/views/InterventionsView';
import { DoctorReportView } from './presentation/views/DoctorReportView';
import { CircadianNightView } from './presentation/views/CircadianNightView';
import { PrivacySovereigntyView } from './presentation/views/PrivacySovereigntyView';
import { SymptomQuickLogModal } from './presentation/components/SymptomQuickLogModal';
import { HotFlashBreathingTimer } from './presentation/components/HotFlashBreathingTimer';

import { SymptomLogEntry, SymptomDefinition } from './domain/models/symptom';
import { MenstrualCycleEntry } from './domain/models/straw';
import { CalculateStrawStageUseCase } from './application/use-cases/CalculateStrawStageUseCase';
import { LocalEncryptedStorage } from './infrastructure/storage/EncryptedLocalStorage';
import { InMemoryEventBus } from './infrastructure/event-bus/InMemoryEventBus';
import { INITIAL_CYCLES_SEED, INITIAL_SYMPTOMS_SEED } from './infrastructure/mock/seedData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [symptoms, setSymptoms] = useState<SymptomLogEntry[]>([]);
  const [cycles, setCycles] = useState<MenstrualCycleEntry[]>([]);
  const [selectedSymptomForModal, setSelectedSymptomForModal] = useState<SymptomDefinition | null>(null);
  const [showCbtTimerModal, setShowCbtTimerModal] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  const storage = useMemo(() => new LocalEncryptedStorage(), []);
  const eventBus = useMemo(() => InMemoryEventBus.getInstance(), []);

  // Use cases
  const calculateStrawUseCase = useMemo(() => new CalculateStrawStageUseCase(), []);

  // Load initial data
  const loadData = useCallback(async () => {
    let loadedSymptoms = await storage.getAllLogs();
    let loadedCycles = await storage.getAllCycles();

    // If empty on first boot, seed with realistic perimenopause data
    if (loadedSymptoms.length === 0 && loadedCycles.length === 0) {
      for (const c of INITIAL_CYCLES_SEED) {
        await storage.saveCycle(c);
      }
      for (const s of INITIAL_SYMPTOMS_SEED) {
        await storage.saveLog(s);
      }
      loadedSymptoms = await storage.getAllLogs();
      loadedCycles = await storage.getAllCycles();
    }

    setSymptoms(loadedSymptoms);
    setCycles(loadedCycles);
  }, [storage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Dark mode class sync on body
  useEffect(() => {
    if (isDarkMode || activeTab === 'noche') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, activeTab]);

  // STRAW+10 calculation
  const { stage: strawStage } = useMemo(() => {
    return calculateStrawUseCase.execute(cycles);
  }, [calculateStrawUseCase, cycles]);

  // Handle saving new symptom entry
  const handleSaveSymptom = async (entry: SymptomLogEntry) => {
    await storage.saveLog(entry);
    eventBus.publish('SYMPTOM_LOGGED', entry);
    await loadData();
  };

  // Handle quick SOS nocturnal hot flash log
  const handleRecordQuickNightFlash = async () => {
    const entry: SymptomLogEntry = {
      id: `sym_sos_${Date.now()}`,
      timestamp: new Date().toISOString(),
      symptomId: 'night_sweats',
      domain: 'vasomotor',
      intensity: 8,
      frequency: 'isolated',
      duration: '15min',
      triggers: ['Despertar nocturno'],
      notes: 'Registrado con 1-Toque desde Modo SOS Noche.'
    };
    await handleSaveSymptom(entry);
  };

  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case 'inicio': return 'Inicio';
      case 'registro': return 'Registro';
      case 'alivio': return 'Alivio';
      case 'informe': return 'Mi Informe';
      case 'noche': return 'Noche SOS';
      default: return 'Inicio';
    }
  };

  return (
    <div className="min-h-screen bg-cloud-200 dark:bg-circadian-dark text-slate-800 dark:text-cloud-200 transition-colors duration-300 font-sans flex flex-col justify-between">
      
      {/* Top Header Navigation */}
      <HeaderNav
        currentTabName={getTabLabel(activeTab)}
        isDarkMode={isDarkMode || activeTab === 'noche'}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenPrivacyModal={() => setShowPrivacyModal(true)}
      />

      {/* Main Screen Content View */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-4">
        {activeTab === 'inicio' && (
          <DashboardView
            onOpenSymptomModal={sym => setSelectedSymptomForModal(sym)}
            onNavigateToTab={tab => setActiveTab(tab)}
            onOpenCbtTimer={() => setShowCbtTimerModal(true)}
          />
        )}

        {activeTab === 'registro' && (
          <BiomarkerMatrixView
            onOpenCbtTimer={() => setShowCbtTimerModal(true)}
            onSaveSymptomEntry={handleSaveSymptom}
          />
        )}

        {activeTab === 'alivio' && (
          <InterventionsView />
        )}

        {activeTab === 'informe' && (
          <DoctorReportView
            patientAlias="Elena M."
            age={48}
            strawStage={strawStage}
            cycles={cycles}
            symptoms={symptoms}
          />
        )}

        {activeTab === 'noche' && (
          <CircadianNightView
            onRecordQuickNightFlash={handleRecordQuickNightFlash}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={tab => setActiveTab(tab)}
        isNightModeActive={isDarkMode || activeTab === 'noche'}
      />

      {/* Symptom Quick Log Modal */}
      {selectedSymptomForModal && (
        <SymptomQuickLogModal
          symptom={selectedSymptomForModal}
          onClose={() => setSelectedSymptomForModal(null)}
          onSave={handleSaveSymptom}
        />
      )}

      {/* CBT 4-7-8 Breathing Modal */}
      {showCbtTimerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md">
            <HotFlashBreathingTimer onClose={() => setShowCbtTimerModal(false)} />
          </div>
        </div>
      )}

      {/* Privacy Sovereignty Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-circadian-card w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-circadian-border relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-cloud-200">
                Soberanía y Cifrado
              </h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <PrivacySovereigntyView
              storage={storage}
              onDataModified={loadData}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
