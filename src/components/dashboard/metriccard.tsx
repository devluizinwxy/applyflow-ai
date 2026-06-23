import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: number;
}

export function MetricCard({ title, value, description, icon, trend }: MetricCardProps) {
  const isPositiveTrend = trend !== undefined && trend > 0;

  return (
    <Card className="border-border bg-card text-card-foreground shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-4 w-4 text-primary" aria-hidden="true">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend !== undefined && (
              <span className={isPositiveTrend ? "text-emerald-500 font-medium" : "text-rose-500 font-medium"}>
                {isPositiveTrend ? `+${trend}% ` : `${trend}% `}
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}