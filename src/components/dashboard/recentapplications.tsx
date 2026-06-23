import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplicationHistoryItem, ApplicationStatus } from "@/types/dashboard";

interface RecentApplicationsProps {
  applications: ApplicationHistoryItem[];
}

const statusStyles: Record<ApplicationStatus, string> = {
  "Em análise": "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20",
  "Entrevista": "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20",
  "Testes": "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20",
  "Recusado": "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20",
  "Aprovado": "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20",
};

export function RecentApplications({ applications }: RecentApplicationsProps) {
  return (
    <Card className="col-span-full lg:col-span-3 border-border bg-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Histórico de Candidaturas</CardTitle>
        <CardDescription>Acompanhamento em tempo real dos fluxos ativos.</CardDescription>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground">
            Nenhuma candidatura enviada recentemente.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cargo / Empresa</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="font-medium text-foreground">{app.role}</div>
                      <div className="text-xs text-muted-foreground">{app.company}</div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{app.date}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className={`${statusStyles[app.status]} transition-colors`}>
                        {app.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}