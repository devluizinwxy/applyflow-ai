"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const applications = [
  {
    id: 1,
    empresa: "Google",
    cargo: "Front-End Developer",
    data: "20/06/2026",
    status: "Em análise",
  },
  {
    id: 2,
    empresa: "Microsoft",
    cargo: "Back-End Developer",
    data: "18/06/2026",
    status: "Aprovado",
  },
  {
    id: 3,
    empresa: "Amazon",
    cargo: "Full Stack Developer",
    data: "15/06/2026",
    status: "Rejeitado",
  },
  {
    id: 4,
    empresa: "Netflix",
    cargo: "Software Engineer",
    data: "10/06/2026",
    status: "Em análise",
  },
  {
    id: 5,
    empresa: "Spotify",
    cargo: "React Developer",
    data: "08/06/2026",
    status: "Aprovado",
  },
];

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("todos");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
        app.empresa.toLowerCase().includes(search.toLowerCase()) ||
        app.cargo.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
        status === "todos" || app.status === status;

    return matchesSearch && matchesStatus;
  });

  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
      (app) => app.status === "Em análise"
  ).length;

  const approvedApplications = applications.filter(
      (app) => app.status === "Aprovado"
  ).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovado":
        return (
            <Badge className="bg-green-500 hover:bg-green-500 text-white rounded-full px-3">
              Aprovado
            </Badge>
        );

      case "Rejeitado":
        return (
            <Badge className="bg-red-500 hover:bg-red-500 text-white rounded-full px-3">
              Rejeitado
            </Badge>
        );

      default:
        return (
            <Badge className="bg-yellow-500 hover:bg-yellow-500 text-white rounded-full px-3">
              Em análise
            </Badge>
        );
    }
  };

  return (
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between gap-6">
          <div className="text-center xl:text-left">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your Job Applications
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Job Tracking
            </h1>
          </div>

          {/* Cards responsivos: 1 coluna no celular, 3 no tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full xl:w-auto">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm w-full xl:min-w-[160px]">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total Applications
              </p>

              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                {totalApplications}
              </h2>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm w-full xl:min-w-[140px]">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">
                {pendingApplications}
              </h2>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm w-full xl:min-w-[140px]">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interviews
              </p>

              <h2 className="text-3xl font-bold text-green-600 dark:text-green-500">
                {approvedApplications}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Controles de Filtro Responsivos */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            {/* Agrupamento dos inputs quebrando linha de forma fluída no mobile */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">
              <Input
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-[220px] md:w-[280px]"
              />

              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 w-full sm:w-auto">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full sm:w-[140px] md:w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="todos">All Status</SelectItem>
                    <SelectItem value="Em análise">Pending</SelectItem>
                    <SelectItem value="Aprovado">Approved</SelectItem>
                    <SelectItem value="Rejeitado">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="date">
                  <SelectTrigger className="w-full sm:w-[140px] md:w-[160px]">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="date">
                      All Dates
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="type">
                  <SelectTrigger className="w-full sm:w-[140px] md:w-[160px]">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="type">
                      Job Type
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="show">
                  <SelectTrigger className="w-full sm:w-[140px] md:w-[160px]">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="show">
                      Show All
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Botão ocupar toda a largura no celular */}
            <Button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5">
              + Add New Application
            </Button>
          </div>

          {/* Tabela com scroll horizontal no mobile */}
          <div className="mt-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto relative w-full shadow-sm">
            <div className="min-w-[600px] w-full">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-slate-200 dark:border-slate-800">
                    <TableHead className="text-slate-500 dark:text-slate-400">Company</TableHead>
                    <TableHead className="text-slate-500 dark:text-slate-400">Job Title</TableHead>
                    <TableHead className="text-slate-500 dark:text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-500 dark:text-slate-400">Date</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredApplications.map((application) => (
                      <TableRow key={application.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                          {application.empresa}
                        </TableCell>

                        <TableCell className="text-slate-700 dark:text-slate-300">
                          {application.cargo}
                        </TableCell>

                        <TableCell>
                          {getStatusBadge(application.status)}
                        </TableCell>

                        <TableCell className="text-slate-700 dark:text-slate-300">
                          {application.data}
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
  );
}