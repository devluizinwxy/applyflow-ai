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
    // Ajustado padding vertical (py-6 no mobile, py-12 no desktop) para aproveitar melhor a tela do celular
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 w-full py-6 sm:py-12 px-4 sm:px-8 space-y-6 sm:space-y-8 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Título & Subtítulo dinâmicos e com tamanhos de fonte responsivos */}
      <div className="text-center space-y-2 sm:space-y-3 max-w-2xl mx-auto">
        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-200 sm:text-2xl">
          Automation Configuration
        </h1>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl leading-tight">
          Configure Your Application Automation
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
          Set your preferences for the ApplyFlow AI auto-apply engine.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Grid de Blocos (Já quebra nativamente para 1 coluna graças ao grid-cols-1) */}
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

        {/* Barra de Ações 100% Responsiva */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 gap-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm transition-colors">
          <span className="font-bold text-sm text-slate-800 dark:text-slate-300 sm:ml-2 text-center sm:text-left">
            Actions
          </span>
          
          {/* Botões ficam em coluna ocupando largura total no mobile e voltam ao normal no desktop */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3">
            <Button 
              variant="outline" 
              onClick={saveConfiguration}
              className="w-full sm:w-auto border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent h-11 px-6 rounded-lg text-sm shadow-sm transition-all"
            >
              Save Configuration
            </Button>
            
            <Button 
              onClick={() => updateStatus(config.status === 'active' ? 'inactive' : 'active')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold shadow-sm flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-sm transition-all"
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