"use client";

import React from 'react';
import { FileText } from 'lucide-react';

interface AnalysisItemProps {
  label: string;
  value: string;
  percentage: number;
}

function AnalysisItem({ label, value, percentage }: AnalysisItemProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-baseline">
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{label}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">Analyzing: {percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-[#00A3FF] rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1">{value}</span>
    </div>
  );
}

export default function ResumeAnalysis() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
          Resume Analysis Panel
        </h2>
        <FileText className="w-4 h-4 text-slate-400" />
      </div>

      <div className="flex flex-col gap-4">
        <AnalysisItem label="Candidate Name" value="Analyzing candidate background details..." percentage={75} />
        <AnalysisItem label="Experience Level" value="Experience Level = Experience" percentage={75} />
        <AnalysisItem label="Key Skills" value="Randories, Key skills, Engagement..." percentage={75} />
        <AnalysisItem label="Education" value="Education of Ginasemente, 2000" percentage={75} />
      </div>
    </div>
  );
}