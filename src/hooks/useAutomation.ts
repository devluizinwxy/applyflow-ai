import { useState, useCallback } from 'react';
// Garantindo a importação exata dos tipos estruturados
import { 
  AutomationConfig, 
  AutomationStatus, 
  JobFilters, 
  AdvancedFilters, 
  AutomationLimits 
} from '@/types/automation';

// Configuração inicial com os dados mockados pré-definidos alinhados com o componente
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
    // Definido direto no mock inicial para o componente ler nativamente
    keywords: 'Python,AI,Cloud' 
  },
  limits: { dailyLimit: 20 },
  status: 'inactive',
};

export function useAutomation() {
  const [config, setConfig] = useState<AutomationConfig>(initialConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Atualiza os filtros de busca de vagas
  const updateJobFilters = useCallback((filters: Partial<JobFilters>) => {
    setConfig((prev: AutomationConfig) => ({
      ...prev,
      jobFilters: { ...prev.jobFilters, ...filters }
    }));
  }, []);

  // Atualiza os filtros avançados (incluindo a string de keywords)
  const updateAdvancedFilters = useCallback((filters: Partial<AdvancedFilters>) => {
    setConfig((prev: AutomationConfig) => ({
      ...prev,
      advancedFilters: { ...prev.advancedFilters, ...filters }
    }));
  }, []);

  // Atualiza os limites diários da automação
  const updateLimits = useCallback((limits: Partial<AutomationLimits>) => {
    setConfig((prev: AutomationConfig) => ({
      ...prev,
      limits: { ...prev.limits, ...limits }
    }));
  }, []);

  // Liga / Desliga o status da automação
  const updateStatus = useCallback((status: AutomationStatus) => {
    setConfig((prev: AutomationConfig) => ({ ...prev, status }));
  }, []);

  // Função simulada para salvar as configurações
  const saveConfiguration = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulação de uma requisição de salvamento
      await new Promise((resolve) => setTimeout(resolve, 600));
      alert('Configuration saved successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving.');
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