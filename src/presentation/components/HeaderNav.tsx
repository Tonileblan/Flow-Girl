import React from 'react';
import { Lock, Moon, Sun, User, Droplets } from 'lucide-react';

interface HeaderNavProps {
  currentTabName: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenPrivacyModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTabName,
  isDarkMode,
  onToggleDarkMode,
  onOpenPrivacyModal
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cloud-200/95 dark:bg-circadian-dark/95 border-b border-slate-200/60 dark:border-circadian-border transition-colors duration-300">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand & Section Name */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full border border-teal-500/30 flex items-center justify-center bg-teal-50 dark:bg-teal-950/50">
            <Droplets className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="leading-tight">
            <span className="font-bold text-base text-slate-900 dark:text-cloud-200 tracking-tight font-sans block">
              Flow-Girl
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {currentTabName}
            </span>
          </div>
        </div>

        {/* Right Badges & Toggles */}
        <div className="flex items-center space-x-2">
          
          {/* Local Vault E2EE Badge */}
          <button
            onClick={onOpenPrivacyModal}
            title="Bóveda Local con Cifrado de Extremo a Extremo"
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#EBF3DD] text-[#4D662E] dark:bg-emerald-950/60 dark:text-emerald-300 border border-[#D5E6B8] dark:border-emerald-800 hover:opacity-90 transition-opacity"
          >
            <Lock className="w-3 h-3 text-[#4D662E] dark:text-emerald-400" />
            <span>Bóveda Local · E2EE</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Alternar modo noche"
            className="p-1.5 rounded-full text-slate-600 dark:text-circadian-amber hover:bg-slate-200/60 dark:hover:bg-circadian-card transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Profile Avatar */}
          <div 
            onClick={onOpenPrivacyModal}
            className="w-8 h-8 rounded-full bg-teal-700 dark:bg-teal-600 text-white flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <User className="w-4 h-4" />
          </div>

        </div>

      </div>
    </header>
  );
};
