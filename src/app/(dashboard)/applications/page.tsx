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
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <p className="text-sm text-slate-500">
              Your Job Applications
            </p>

            <h1 className="text-4xl font-bold text-slate-900">
              Job Tracking
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm min-w-[160px]">
              <p className="text-xs text-slate-500">
                Total Applications
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                {totalApplications}
              </h2>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm min-w-[140px]">
              <p className="text-xs text-slate-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-yellow-600">
                {pendingApplications}
              </h2>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm min-w-[140px]">
              <p className="text-xs text-slate-500">
                Interviews
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                {approvedApplications}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

            <div className="flex flex-wrap gap-3">

              <Input
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[280px]"
              />

              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
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
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="date">
                    All Dates
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="type">
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="type">
                    Job Type
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="show">
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="show">
                    Show All
                  </SelectItem>
                </SelectContent>
              </Select>

            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5">
              + Add New Application
            </Button>

          </div>

          {/* Tabela */}
          <div className="mt-5 rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {application.empresa}
                      </TableCell>

                      <TableCell>
                        {application.cargo}
                      </TableCell>

                      <TableCell>
                        {getStatusBadge(application.status)}
                      </TableCell>

                      <TableCell>
                        {application.data}
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
  );
}