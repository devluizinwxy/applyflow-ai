'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider'; // Importando o slider funcional
import { JobFilters } from '@/types/automation';

interface JobSearchFiltersProps {
  filters: JobFilters;
  onChange: (filters: Partial<JobFilters>) => void;
}

export function JobSearchFilters({ filters, onChange }: JobSearchFiltersProps) {
  // Fallbacks seguros para o estado inicial
  const minSalary = filters.minSalary ?? 80;
  const maxSalary = filters.maxSalary ?? 120;
  const contractTypes = filters.contractTypes || { fullTime: true, partTime: false, contract: false };

  const handleContractTypeChange = (key: keyof typeof contractTypes, checked: boolean) => {
    onChange({
      contractTypes: {
        ...contractTypes,
        [key]: checked,
      },
    });
  };

  // Handler que escuta o arrastar do Slider duplo
  const handleSalaryChange = (value: number[]) => {
    onChange({
      minSalary: value[0],
      maxSalary: value[1],
    });
  };

  return (
  <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm space-y-4 text-slate-900 dark:text-slate-100 transition-colors">
    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">1. Job Search Filters</h3>
    {/* ... resto do seu código ... */}
      
      <div className="space-y-4">
        {/* Job Title */}
        <div className="space-y-1.5">
          <Label htmlFor="role" className="font-semibold text-xs text-slate-700">Job Title</Label>
          <Input 
            id="role" 
            placeholder="e.g. Software Engineer" 
            value={filters.role || ''}
            onChange={(e) => onChange({ role: e.target.value })}
            className="bg-slate-50/50 border-slate-200"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <Label htmlFor="city" className="font-semibold text-xs text-slate-700">Location</Label>
          <Input 
            id="city" 
            placeholder="e.g. San Francisco, CA" 
            value={filters.city || ''}
            onChange={(e) => onChange({ city: e.target.value })}
            className="bg-slate-50/50 border-slate-200"
          />
        </div>

        {/* Salary Range (Ajustável e Funcional) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-semibold text-xs text-slate-700">Salary Range</Label>
            <div className="flex items-center gap-2">
              <Input 
                value={`$${minSalary}k`}
                className="w-20 h-8 bg-slate-50/50 text-center text-xs font-medium border-slate-200"
                readOnly
              />
              <span className="text-slate-400 text-xs">-</span>
              <Input 
                value={`$${maxSalary}k`}
                className="w-20 h-8 bg-slate-50/50 text-center text-xs font-medium border-slate-200"
                readOnly
              />
            </div>
          </div>
          
          {/* Slider duplo do Radix UI estilizado exatamente como o protótipo */}
          <div className="px-1 pt-1">
            <Slider
              defaultValue={[minSalary, maxSalary]}
              value={[minSalary, maxSalary]}
              min={10}
              max={250}
              step={5}
              onValueChange={handleSalaryChange}
              className="w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Job Level */}
        <div className="space-y-1.5">
          <Label className="font-semibold text-xs text-slate-700">Job Level</Label>
          <Select 
            value={filters.jobLevel || 'entry-mid-senior'} 
            onValueChange={(val) => onChange({ jobLevel: val })}
          >
            <SelectTrigger className="bg-slate-50/50 border-slate-200 text-slate-700 text-sm">
              <SelectValue placeholder="Entry, Mid, Senior" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry-mid-senior">Entry, Mid, Senior</SelectItem>
              <SelectItem value="Entry">Entry Level</SelectItem>
              <SelectItem value="Mid">Mid Level</SelectItem>
              <SelectItem value="Senior">Senior Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contract Type */}
        <div className="space-y-2 pt-1">
          <Label className="font-semibold text-xs text-slate-700 block">Contract Type</Label>
          <div className="flex items-center gap-5 text-xs font-medium text-slate-600">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={contractTypes.fullTime} 
                onChange={(e) => handleContractTypeChange('fullTime', e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 accent-blue-500 focus:ring-blue-500" 
              />
              Full-time
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={contractTypes.partTime} 
                onChange={(e) => handleContractTypeChange('partTime', e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 accent-blue-500 focus:ring-blue-500" 
              />
              Part-time
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={contractTypes.contract} 
                onChange={(e) => handleContractTypeChange('contract', e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 accent-blue-500 focus:ring-blue-500" 
              />
              Contract
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}