"use client";

import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function NotificationBell() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors focus:outline-none">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-slate-900"></span>
          <span className="sr-only">Notificações</span>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notificações</span>
          <span className="text-xs text-blue-500 cursor-pointer hover:underline font-normal">
            Marcar como lidas
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="max-h-[300px] overflow-y-auto">
          {/* Exemplo de Notificação 1 */}
          <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer gap-1 focus:bg-slate-50 dark:focus:bg-slate-800">
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Candidatura enviada!</span>
            <span className="text-xs text-slate-500">Sua aplicação para &quot;Software Engineer&quot; foi concluída com sucesso.</span>
            <span className="text-[10px] text-slate-400 mt-1">Há 5 min</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          {/* Exemplo de Notificação 2 */}
          <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer gap-1 focus:bg-slate-50 dark:focus:bg-slate-800">
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Robô Pausado</span>
            <span className="text-xs text-slate-500">O limite de 20 candidaturas diárias foi atingido.</span>
            <span className="text-[10px] text-slate-400 mt-1">Há 2 horas</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}