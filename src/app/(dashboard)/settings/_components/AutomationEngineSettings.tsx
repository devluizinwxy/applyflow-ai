'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AutomationLimits, AutomationStatus } from '@/types/automation';

interface AutomationEngineSettingsProps {
  limits: AutomationLimits;
  status: AutomationStatus;
  onLimitsChange: (limits: Partial<AutomationLimits>) => void;
  onStatusChange: (status: AutomationStatus) => void;
}

export function AutomationEngineSettings({ limits, status, onLimitsChange, onStatusChange }: AutomationEngineSettingsProps) {
  const isEnabled = status === 'active';

  return (
    // Container principal adaptado para dark mode
    <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm space-y-4 text-slate-900 dark:text-slate-100 transition-colors">
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">3. Automation Engine Settings</h3>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Input de Limite Diário */}
        <div className="space-y-1.5 max-w-sm w-full">
          <Label htmlFor="dailyLimit" className="font-semibold text-xs text-slate-700 dark:text-slate-300">
            Daily Application Limit
          </Label>
          <Input 
            id="dailyLimit" 
            type="number" 
            value={limits.dailyLimit}
            onChange={(e) => onLimitsChange({ dailyLimit: parseInt(e.target.value) || 0 })}
            className="bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-slate-400"
          />
        </div>

        {/* Box de Status (Enable Automation) adaptado para dark mode */}
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-xl w-full md:w-auto md:min-w-[280px] justify-between transition-colors">
          <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Enable Automation</span>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-2 py-0.5 rounded transition-colors ${
              isEnabled 
                ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}>
              {isEnabled ? 'On' : 'Off'}
            </span>
            <Switch 
              checked={isEnabled}
              onCheckedChange={(checked) => onStatusChange(checked ? 'active' : 'inactive')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}