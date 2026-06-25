"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
        role: "Senior Frontend Engineer",
        company: "TechGlobal Inc",
        date: "25/06/2026",
        status: "SENT",
    },
    {
        id: 2,
        role: "React Developer",
        company: "Stripe Group",
        date: "24/06/2026",
        status: "INTERVIEW",
    },
    {
        id: 3,
        role: "Software Engineer III",
        company: "Cyberdyne Systems",
        date: "21/06/2026",
        status: "REJECTED",
    },
];

export function ApplicationsView() {
    const [search, setSearch] = useState("");

    const filteredApplications = applications.filter(
        (app) =>
            app.role.toLowerCase().includes(search.toLowerCase()) ||
            app.company.toLowerCase().includes(search.toLowerCase())
    );

    const getBadgeClass = (status: string) => {
        switch (status) {
            case "INTERVIEW":
                return "bg-amber-500";
            case "REJECTED":
                return "bg-rose-500";
            default:
                return "bg-sky-500";
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Monitoramento de Candidaturas
                </h1>

                <p className="text-slate-500 mt-1">
                    Histórico completo das vagas aplicadas.
                </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm">
                <div className="mb-6">
                    <Input
                        placeholder="Buscar empresa ou cargo..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredApplications.map((app) => (
                            <TableRow key={app.id}>
                                <TableCell>{app.company}</TableCell>
                                <TableCell>{app.role}</TableCell>
                                <TableCell>{app.date}</TableCell>

                                <TableCell>
                                    <Badge
                                        className={`${getBadgeClass(app.status)} text-white border-transparent`}
                                    >
                                        {app.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}