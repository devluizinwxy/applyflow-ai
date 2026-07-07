"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";

type ApplicationStatus = "Pendente" | "Aplicado" | "Rejeitado";
type SortField = "cargo" | "empresa" | "status" | "data";
type SortDirection = "asc" | "desc";

type Application = {
  id: number;
  empresa: string;
  cargo: string;
  data: string; // dd/mm/yyyy
  status: ApplicationStatus;
};

const initialApplications: Application[] = [
  {
    id: 1,
    empresa: "Google",
    cargo: "Senior UX Designer",
    data: "12/10/2023",
    status: "Pendente",
  },
  {
    id: 2,
    empresa: "Microsoft",
    cargo: "Software Engineer",
    data: "01/11/2023",
    status: "Aplicado",
  },
  {
    id: 3,
    empresa: "Amazon",
    cargo: "Product Manager",
    data: "28/10/2023",
    status: "Aplicado",
  },
  {
    id: 4,
    empresa: "Meta",
    cargo: "Product Manager",
    data: "28/10/2023",
    status: "Rejeitado",
  },
  {
    id: 5,
    empresa: "Spotify",
    cargo: "React Developer",
    data: "16/10/2023",
    status: "Aplicado",
  },
  {
    id: 6,
    empresa: "Netflix",
    cargo: "Senior UI Designer",
    data: "15/10/2023",
    status: "Rejeitado",
  },
  {
    id: 7,
    empresa: "Microsoft",
    cargo: "Senior C# Designer",
    data: "03/10/2023",
    status: "Pendente",
  },
  {
    id: 8,
    empresa: "Google",
    cargo: "Front-End Developer",
    data: "10/10/2023",
    status: "Aplicado",
  },
];

function parseDate(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function isSameMonth(dateString: string, month: number, year: number) {
  const date = parseDate(dateString);
  return date.getMonth() === month && date.getFullYear() === year;
}

function isSameYear(dateString: string, year: number) {
  const date = parseDate(dateString);
  return date.getFullYear() === year;
}

function formatDateToInput(dateString: string) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

function formatInputToDate(dateString: string) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export default function ApplicationsPage() {
  const [applications, setApplications] =
      useState<Application[]>(initialApplications);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("data");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newCompany, setNewCompany] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newStatus, setNewStatus] = useState<ApplicationStatus>("Pendente");

  const companies = useMemo(() => {
    const uniqueCompanies = Array.from(
        new Set(applications.map((app) => app.empresa))
    );
    return uniqueCompanies.sort((a, b) => a.localeCompare(b));
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let filtered = applications.filter((app) => {
      const matchesSearch =
          app.empresa.toLowerCase().includes(search.toLowerCase()) ||
          app.cargo.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
          statusFilter === "all" || app.status === statusFilter;

      const matchesCompany =
          companyFilter === "all" || app.empresa === companyFilter;

      let matchesDate = true;

      if (dateFilter === "thisMonth") {
        matchesDate = isSameMonth(app.data, currentMonth, currentYear);
      } else if (dateFilter === "thisYear") {
        matchesDate = isSameYear(app.data, currentYear);
      } else if (dateFilter === "older") {
        const appDate = parseDate(app.data);
        matchesDate =
            appDate.getFullYear() < currentYear ||
            (appDate.getFullYear() === currentYear &&
                appDate.getMonth() < currentMonth);
      }

      return matchesSearch && matchesStatus && matchesCompany && matchesDate;
    });

    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortField === "data") {
        comparison =
            parseDate(a.data).getTime() - parseDate(b.data).getTime();
      } else {
        comparison = a[sortField].localeCompare(b[sortField]);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [
    applications,
    search,
    statusFilter,
    companyFilter,
    dateFilter,
    sortField,
    sortDirection,
  ]);

  const totalApplications = filteredApplications.length;
  const pendingApplications = filteredApplications.filter(
      (app) => app.status === "Pendente"
  ).length;
  const interviewApplications = filteredApplications.filter(
      (app) => app.status === "Aplicado"
  ).length;

  function getStatusBadge(status: ApplicationStatus) {
    switch (status) {
      case "Aplicado":
        return (
            <Badge className="bg-green-500 hover:bg-green-500 text-white rounded-full px-3 py-1">
              Aplicado
            </Badge>
        );
      case "Rejeitado":
        return (
            <Badge className="bg-red-500 hover:bg-red-500 text-white rounded-full px-3 py-1">
              Rejeitado
            </Badge>
        );
      default:
        return (
            <Badge className="bg-yellow-500 hover:bg-yellow-500 text-white rounded-full px-3 py-1">
              Pendente
            </Badge>
        );
    }
  }

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortField(field);
    setSortDirection("asc");
  }

  function renderSortIcon(field: SortField) {
    if (sortField !== field) {
      return <ChevronUp className="h-3.5 w-3.5 opacity-30" />;
    }

    return sortDirection === "asc" ? (
        <ChevronUp className="h-3.5 w-3.5" />
    ) : (
        <ChevronDown className="h-3.5 w-3.5" />
    );
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setCompanyFilter("all");
    setDateFilter("all");
  }

  function handleAddApplication() {
    if (!newCompany.trim() || !newRole.trim() || !newDate) {
      alert("Preencha empresa, cargo e data.");
      return;
    }

    const newApplication: Application = {
      id: Date.now(),
      empresa: newCompany.trim(),
      cargo: newRole.trim(),
      data: formatInputToDate(newDate),
      status: newStatus,
    };

    setApplications((prev) => [newApplication, ...prev]);

    setNewCompany("");
    setNewRole("");
    setNewDate("");
    setNewStatus("Pendente");
    setIsAddModalOpen(false);
  }

  return (
      <>
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full xl:w-auto">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm w-full xl:min-w-[170px]">
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
                  {interviewApplications}
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Filtros */}
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div className="relative w-full xl:max-w-[340px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                      placeholder="Search jobs..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 w-full bg-white dark:bg-slate-950"
                  />
                </div>

                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full xl:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5"
                >
                  + Add New Application
                </Button>
              </div>

              <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[170px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Status: All</SelectItem>
                    <SelectItem value="Pendente">Status: Pending</SelectItem>
                    <SelectItem value="Aplicado">Status: Applied</SelectItem>
                    <SelectItem value="Rejeitado">Status: Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full sm:w-[170px]">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Date: All Time</SelectItem>
                    <SelectItem value="thisMonth">Date: This month</SelectItem>
                    <SelectItem value="thisYear">Date: This year</SelectItem>
                    <SelectItem value="older">Date: Older</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={companyFilter} onValueChange={setCompanyFilter}>
                  <SelectTrigger className="w-full sm:w-[190px]">
                    <SelectValue placeholder="Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Company: All</SelectItem>
                    {companies.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                    className="rounded-lg"
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Tabela */}
            <div className="mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden w-full shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-slate-200 dark:border-slate-800">
                    <TableHead className="text-slate-500 dark:text-slate-400">
                      <button
                          type="button"
                          onClick={() => handleSort("cargo")}
                          className="inline-flex items-center gap-1 font-medium"
                      >
                        Job Title
                        {renderSortIcon("cargo")}
                      </button>
                    </TableHead>

                    <TableHead className="text-slate-500 dark:text-slate-400">
                      <button
                          type="button"
                          onClick={() => handleSort("empresa")}
                          className="inline-flex items-center gap-1 font-medium"
                      >
                        Company
                        {renderSortIcon("empresa")}
                      </button>
                    </TableHead>

                    <TableHead className="text-slate-500 dark:text-slate-400">
                      <button
                          type="button"
                          onClick={() => handleSort("status")}
                          className="inline-flex items-center gap-1 font-medium"
                      >
                        Status
                        {renderSortIcon("status")}
                      </button>
                    </TableHead>

                    <TableHead className="text-slate-500 dark:text-slate-400">
                      <button
                          type="button"
                          onClick={() => handleSort("data")}
                          className="inline-flex items-center gap-1 font-medium"
                      >
                        Date
                        {renderSortIcon("data")}
                      </button>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredApplications.length > 0 ? (
                      filteredApplications.map((application) => (
                          <TableRow
                              key={application.id}
                              className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                              {application.cargo}
                            </TableCell>

                            <TableCell className="text-slate-700 dark:text-slate-300">
                              {application.empresa}
                            </TableCell>

                            <TableCell>
                              {getStatusBadge(application.status)}
                            </TableCell>

                            <TableCell className="text-slate-700 dark:text-slate-300">
                              {application.data}
                            </TableCell>
                          </TableRow>
                      ))
                  ) : (
                      <TableRow className="hover:bg-transparent">
                        <TableCell
                            colSpan={4}
                            className="py-10 text-center text-slate-500 dark:text-slate-400"
                        >
                          Nenhuma candidatura encontrada com os filtros atuais.
                        </TableCell>
                      </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Modal simples sem precisar de dialog.tsx */}
        {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
              <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Add New Application
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Preencha os dados da candidatura.
                    </p>
                  </div>

                  <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid gap-4 px-6 py-5">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Company
                    </label>
                    <Input
                        placeholder="Ex: Google"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Job Title
                    </label>
                    <Input
                        placeholder="Ex: Front-End Developer"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Date
                    </label>
                    <Input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Status
                    </label>
                    <Select
                        value={newStatus}
                        onValueChange={(value) =>
                            setNewStatus(value as ApplicationStatus)
                        }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Aplicado">Aplicado</SelectItem>
                        <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-slate-200 dark:border-slate-800 px-6 py-4">
                  <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancelar
                  </Button>

                  <Button
                      type="button"
                      onClick={handleAddApplication}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Salvar candidatura
                  </Button>
                </div>
              </div>
            </div>
        )}
      </>
  );
}