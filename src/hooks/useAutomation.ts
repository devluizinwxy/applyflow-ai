import { useState, useCallback } from 'react';
import { AutomationConfig, AutomationStatus, JobFilters, AdvancedFilters, AutomationLimits } from '@/types/automation';

const initialConfig: AutomationConfig = {
  jobFilters: { 
    role: '', 
    city: '', 
    minSalary: 80,
    maxSalary: 120,
    jobLevel: 'entry-mid-senior',
    contractTypes: {
      fullTime: true,
      partTime: false,
      contract: false
    },
    company: '',
    modality: ''
  },
  advancedFilters: { 
    easyApply: true,
    lessThan10Applicants: true,
    jobsFromNetwork: true,
    keywords: '' 
  },
  limits: { dailyLimit: 20 },
  status: 'inactive',
};

export function useAutomation() {
  const [config, setConfig] = useState<AutomationConfig>(initialConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateJobFilters = useCallback((filters: Partial<JobFilters>) => {
    setConfig((prev: AutomationConfig) => ({
      ...prev,
      jobFilters: { ...prev.jobFilters, ...filters }
    }));
  }, []);

  const updateAdvancedFilters = useCallback((filters: Partial<AdvancedFilters>) => {
    setConfig((prev: AutomationConfig) => ({
      ...prev,
      advancedFilters: { ...prev.advancedFilters, ...filters }
    }));
  }, []);

  const updateLimits = useCallback((limits: Partial<AutomationLimits>) => {
    setConfig((prev: AutomationConfig) => ({
      ...prev,
      limits: { ...prev.limits, ...limits }
    }));
  }, []);

  const updateStatus = useCallback((status: AutomationStatus) => {
    setConfig((prev: AutomationConfig) => ({ ...prev, status }));
  }, []);

  const saveConfiguration = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      alert('Configurações salvas com sucesso!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    config,
    isLoading,
    error,
    updateJobFilters,
    updateAdvancedFilters,
    updateLimits,
    updateStatus,
    saveConfiguration,
  };
}