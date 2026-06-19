'use client';

import { useAutomation } from '@/hooks/useAutomation';
import { JobSearchFilters } from './_components/JobSearchFilters';
import { AdvancedSearchFilters } from './_components/AdvancedSearchFilters';
import { AutomationEngineSettings } from './_components/AutomationEngineSettings';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export default function SettingsPage() {
  const { 
    config, 
    updateJobFilters, 
    updateAdvancedFilters, 
    updateLimits, 
    updateStatus, 
    saveConfiguration 
  } = useAutomation();

  return (
    // Ajustado o fundo e texto para responderem perfeitamente ao dark mode
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 w-full py-12 px-4 sm:px-8 space-y-8 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Título & Subtítulo dinâmicos para ambos os temas */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-200 sm:text-3xl">
          Automation Configuration
        </h1>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
          Configure Your Application Automation
        </h2>
        <p className="text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
          Set your preferences for the ApplyFlow AI auto-apply engine.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Grid de Blocos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <JobSearchFilters 
            filters={config.jobFilters} 
            onChange={updateJobFilters} 
          />
          <AdvancedSearchFilters 
            filters={config.advancedFilters} 
            onChange={updateAdvancedFilters} 
          />
        </div>

        {/* Bloco 3 */}
        <AutomationEngineSettings 
          limits={config.limits}
          status={config.status}
          onLimitsChange={updateLimits}
          onStatusChange={updateStatus}
        />

        {/* Barra de Ações dinâmica */}
        <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm transition-colors">
          <span className="font-bold text-sm text-slate-800 dark:text-slate-300 ml-2">Actions</span>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={saveConfiguration}
              className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent h-11 px-6 rounded-lg text-sm shadow-sm transition-all"
            >
              Save Configuration
            </Button>
            
            <Button 
              onClick={() => updateStatus(config.status === 'active' ? 'inactive' : 'active')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold shadow-sm flex items-center gap-2 h-11 px-6 rounded-lg text-sm transition-all"
            >
              <Rocket className="w-4 h-4 fill-white/10" />
              {config.status === 'active' ? 'Deactivate Automation' : 'Activate Automation'}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}