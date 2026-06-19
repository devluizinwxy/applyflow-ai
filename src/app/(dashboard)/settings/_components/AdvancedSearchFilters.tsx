'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { AdvancedFilters } from '@/types/automation';

interface AdvancedSearchFiltersProps {
  filters: AdvancedFilters;
  onChange: (filters: Partial<AdvancedFilters>) => void;
}

export function AdvancedSearchFilters({ filters, onChange }: AdvancedSearchFiltersProps) {
  const easyApply = filters?.easyApply ?? true;
  const lessThan10Applicants = filters?.lessThan10Applicants ?? true;
  const jobsFromNetwork = filters?.jobsFromNetwork ?? true;

  const keywordsList = ['Python', 'AI', 'Cloud'];

  return (
  <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm space-y-5 text-slate-900 dark:text-slate-100 transition-colors">
    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">2. Advanced Search Filters</h3>
    {/* ... resto do seu código ... */}
      
      <div className="space-y-1">
        {/* Easy Apply */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <Label htmlFor="easy-apply" className="text-sm font-medium text-slate-700 cursor-pointer">
            Easy Apply
          </Label>
          <Switch 
            id="easy-apply"
            checked={easyApply} 
            onCheckedChange={(checked) => onChange({ easyApply: checked })} 
          />
        </div>

        {/* Less than 10 applicants */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <Label htmlFor="less-than-10" className="text-sm font-medium text-slate-700 cursor-pointer">
            Less than 10 applicants
          </Label>
          <Switch 
            id="less-than-10"
            checked={lessThan10Applicants} 
            onCheckedChange={(checked) => onChange({ lessThan10Applicants: checked })} 
          />
        </div>

        {/* Jobs from network */}
        <div className="flex items-center justify-between py-3">
          <Label htmlFor="jobs-network" className="text-sm font-medium text-slate-700 cursor-pointer">
            Jobs from network
          </Label>
          <Switch 
            id="jobs-network"
            checked={jobsFromNetwork} 
            onCheckedChange={(checked) => onChange({ jobsFromNetwork: checked })} 
          />
        </div>
      </div>

      {/* Keywords Area */}
      <div className="space-y-2 pt-2">
        <Label className="font-semibold text-xs text-slate-700 flex items-center gap-0.5">
          Keywords to Include <span className="text-red-500">*</span>
        </Label>
        <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-200 rounded-lg bg-white min-h-[42px]">
          {keywordsList.map((tag) => (
            <div key={tag} className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200/60">
              {tag}
              <X className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-pointer" />
            </div>
          ))}
          <input type="text" className="flex-1 min-w-[60px] bg-transparent text-sm outline-none border-none p-0 focus:ring-0" />
        </div>
        <p className="text-[11px] text-slate-400">Add key skills for matching.</p>
      </div>
    </div>
  );
}