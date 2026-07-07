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
    // pl-14 casa perfeitamente com a sidebar mobile. overflow-x-hidden impede que a página crie scroll horizontal se os filhos quebrarem.
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pl-14 md:pl-24 py-6 sm:py-12 px-4 sm:px-6 md:px-8 space-y-6 sm:space-y-8 text-slate-900 dark:text-slate-100 font-sans transition-all duration-200 overflow-x-hidden box-border">
      
      {/* Cabeçalho */}
      <div className="text-center space-y-1.5 sm:space-y-3 max-w-2xl mx-auto">
        <h1 className="text-xs font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 sm:text-sm">
          Automation Configuration
        </h1>
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
          Configure Your Application Automation
        </h2>
        <p className="text-[11px] sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
          Set your preferences for the ApplyFlow AI auto-apply engine.
        </p>
      </div>

      {/* Grid de Filtros com min-w-0 estrutural para evitar que subcomponentes empurrem as paredes do layout */}
      <div className="max-w-5xl mx-auto space-y-5 sm:space-y-6 w-full min-w-0 overflow-x-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start w-full min-w-0">
          <div className="w-full min-w-0 overflow-hidden box-border">
            <JobSearchFilters filters={config.jobFilters} onChange={updateJobFilters} />
          </div>
          <div className="w-full min-w-0 overflow-hidden box-border">
            <AdvancedSearchFilters filters={config.advancedFilters} onChange={updateAdvancedFilters} />
          </div>
        </div>

        <div className="w-full min-w-0 overflow-hidden box-border">
          <AutomationEngineSettings 
            limits={config.limits}
            status={config.status}
            onLimitsChange={updateLimits}
            onStatusChange={updateStatus}
          />
        </div>

        {/* Barra de Ações */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-3 sm:p-4 gap-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm w-full min-w-0 box-border">
          <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-300 md:ml-2 text-center md:text-left block">
            Actions
          </span>
          
          <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3 shrink-0">
            <Button 
              variant="outline" 
              onClick={saveConfiguration}
              className="w-full sm:w-auto border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent h-10 sm:h-11 px-4 text-xs sm:text-sm rounded-lg shadow-sm"
            >
              Save Configuration
            </Button>
            
            <Button 
              onClick={() => updateStatus(config.status === 'active' ? 'inactive' : 'active')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold shadow-sm flex items-center justify-center gap-2 h-10 sm:h-11 px-4 text-xs sm:text-sm rounded-lg"
            >
              <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/10 shrink-0" />
              <span className="truncate">
                {config.status === 'active' ? 'Deactivate Automation' : 'Activate Automation'}
              </span>
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}