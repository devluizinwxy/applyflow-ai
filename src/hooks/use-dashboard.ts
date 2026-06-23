'use client';

import { useState, useEffect } from 'react';
import { DashboardMetrics, ApplicationHistoryItem, DailyChartData } from '@/types/dashboard';

interface UseDashboardResult {
  metrics: DashboardMetrics | null;
  history: ApplicationHistoryItem[];
  chartData: DailyChartData[];
  isLoading: boolean;
  error: Error | null;
}

export function useDashboard(): UseDashboardResult {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [history, setHistory] = useState<ApplicationHistoryItem[]>([]);
  const [chartData, setChartData] = useState<DailyChartData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        setIsLoading(true);
        setError(null);
        
        await new Promise((resolve) => setTimeout(resolve, 400));

        if (!isMounted) return;

        setMetrics({
          totalApplied: 1248,
          successRate: 64.2,
          appliedToday: 14,
          appliedTodayTrend: 12,
        });

        setChartData([
          { date: 'Seg', applications: 12 },
          { date: 'Ter', applications: 19 },
          { date: 'Qua', applications: 15 },
          { date: 'Qui', applications: 22 },
          { date: 'Sex', applications: 14 },
          { date: 'Sáb', applications: 6 },
          { date: 'Dom', applications: 8 },
        ]);

        setHistory([
          { id: '1', role: 'Senior Frontend Engineer', company: 'Tech Corp', date: '23/06/2026', status: 'Em análise' },
          { id: '2', role: 'Fullstack Developer', company: 'InnovaSoft', date: '23/06/2026', status: 'Entrevista' },
          { id: '3', role: 'React Developer', company: 'Flow Studio', date: '22/06/2026', status: 'Aprovado' },
          { id: '4', role: 'Software Engineer', company: 'Cloud Scale', date: '21/06/2026', status: 'Recusado' },
          { id: '5', role: 'TypeScript Expert', company: 'AI Labs', date: '20/06/2026', status: 'Testes' },
        ]);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Erro ao carregar dados do dashboard'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { metrics, history, chartData, isLoading, error };
}