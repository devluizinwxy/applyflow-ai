export type AutomationStatus = 'active' | 'inactive';

export interface JobFilters {
  role: string;
  city: string;
  minSalary: number;
  maxSalary: number;
  jobLevel: string;
  contractTypes: {
    fullTime: boolean;
    partTime: boolean;
    contract: boolean;
  };
  company: string;
  modality?: string; // Evita quebras caso seu código antigo faça referência a esta propriedade
}

export interface AdvancedFilters {
  easyApply: boolean;
  lessThan10Applicants: boolean;
  jobsFromNetwork: boolean;
  keywords: string;
}

export interface AutomationLimits {
  dailyLimit: number;
}

export interface AutomationConfig {
  jobFilters: JobFilters;
  advancedFilters: AdvancedFilters;
  limits: AutomationLimits;
  status: AutomationStatus;
}