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

  // Estado local para capturar o texto do input atual
  const [inputValue, setInputValue] = React.useState('');

  // Inicializa a lista com os dados mockados fixos. 
  // Se o estado global já tiver algo (após um save), ele usa o global; caso contrário, usa o padrão.
  const [keywordsList, setKeywordsList] = React.useState<string[]>(() => {
    if (filters?.keywords) {
      return filters.keywords.split(',').map((k) => k.trim()).filter(Boolean);
    }
    return ['Python', 'AI', 'Cloud'];
  });

  // Função para adicionar uma nova tag ao apertar Enter
  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = inputValue.trim();

      // Só adiciona se o campo não estiver vazio e se a tag já não existir na lista
      if (newTag && !keywordsList.includes(newTag)) {
        const updatedList = [...keywordsList, newTag];
        setKeywordsList(updatedList);
        onChange({ keywords: updatedList.join(',') });
        setInputValue(''); // Limpa o campo de texto
      }
    }
  };

  // Função que remove QUALQUER tag individualmente (tanto as pré-definidas quanto as novas)
  const handleRemoveKeyword = (tagToRemove: string) => {
    const updatedList = keywordsList.filter((tag) => tag !== tagToRemove);
    setKeywordsList(updatedList);
    onChange({ keywords: updatedList.join(',') });
  };

  return (
    <div className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm space-y-5 text-slate-900 dark:text-slate-100 transition-colors">
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">2. Advanced Search Filters</h3>
      
      <div className="space-y-1">
        {/* Easy Apply */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
          <Label htmlFor="easy-apply" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            Easy Apply
          </Label>
          <Switch 
            id="easy-apply"
            checked={easyApply} 
            onCheckedChange={(checked) => onChange({ easyApply: checked })} 
          />
        </div>

        {/* Less than 10 applicants */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
          <Label htmlFor="less-than-10" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
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
          <Label htmlFor="jobs-network" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
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
        <Label className="font-semibold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-0.5">
          Keywords to Include <span className="text-red-500">*</span>
        </Label>
        
        {/* Container das Tags com suporte Dark Mode */}
        <div className="flex flex-wrap items-center gap-2 p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 min-h-[42px] focus-within:ring-1 focus-within:ring-slate-400 dark:focus-within:ring-slate-500 transition-shadow">
          
          {/* Mapeamento e renderização das Tags */}
          {keywordsList.map((tag) => (
            <div 
              key={tag} 
              className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700"
            >
              {tag}
              <X 
                className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" 
                onClick={() => handleRemoveKeyword(tag)}
              />
            </div>
          ))}
          
          {/* Input para novas adições */}
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddKeyword}
            placeholder={keywordsList.length === 0 ? "Add key skills and press Enter..." : ""} 
            className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder-slate-400 dark:placeholder-slate-500 border-none p-0 focus:ring-0 text-slate-900 dark:text-slate-100"
          />
        </div>
        
        {/* Helper text informativo */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          Press <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-500 dark:text-slate-400">Enter</kbd> to add key skills for matching.
        </p>
      </div>
    </div>
  );
}