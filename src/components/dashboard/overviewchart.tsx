"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DailyChartData } from "@/types/dashboard";

const chartConfig = {
  applications: {
    label: "Aplicações",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface OverviewChartProps {
  data: DailyChartData[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <Card className="col-span-full lg:col-span-4 border-border bg-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Aplicações por Dia</CardTitle>
        <CardDescription>Fluxo quantitativo de envios automatizados na última semana.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] h-[300px] w-full">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} className="stroke-muted/30" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="fill-muted-foreground text-xs"
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="fill-muted-foreground text-xs"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="applications"
              fill="var(--color-applications)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}