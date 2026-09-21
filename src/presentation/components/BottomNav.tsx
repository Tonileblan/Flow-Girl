import React from 'react';
import { Home, Edit3, HeartHandshake, FileText, Moon } from 'lucide-react';

export type TabType = 'inicio' | 'registro' | 'alivio' | 'informe' | 'noche';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isNightModeActive?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab
}) => {
  const tabs = [
    {
      id: 'inicio' as TabType,
      label: 'Inicio',
      icon: Home
    },
    {
      id: 'registro' as TabType,
      label: 'Registro',
      icon: Edit3
    },
    {
      id: 'alivio' as TabType,
      label: 'Alivio',
      icon: HeartHandshake
    },
    {
      id: 'informe' as TabType,
      label: 'Mi Informe',
      icon: FileText
    },
    {
      id: 'noche' as TabType,
      label: 'Noche',
      icon: Moon
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-circadian-dark/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-circadian-border transition-colors duration-300 shadow-lg">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          let activeClasses = 'text-teal-700 dark:text-teal-400 font-bold';
          if (tab.id === 'noche') {
            activeClasses = 'text-amber-600 dark:text-circadian-amber font-bold';
          }

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 touch-manipulation relative ${
                isActive
                  ? activeClasses
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {isActive && (
                <span className="absolute top-1.5 w-1.5 h-1.5 rounded-full bg-current"></span>
              )}
              <Icon className={`w-5 h-5 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[11px] leading-tight tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
