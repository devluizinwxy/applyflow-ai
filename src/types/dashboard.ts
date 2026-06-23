export type ApplicationStatus = 'Em análise' | 'Entrevista' | 'Testes' | 'Recusado' | 'Aprovado';

export interface DashboardMetrics {
  totalApplied: number;
  successRate: number;
  appliedToday: number;
  appliedTodayTrend: number;
}

export interface ApplicationHistoryItem {
  id: string;
  role: string;
  company: string;
  date: string;
  status: ApplicationStatus;
}

export interface DailyChartData {
  date: string;
  applications: number;
}