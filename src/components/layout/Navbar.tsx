"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationBell } from "./NotificationBell";
import { User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Função utilitária para extrair as iniciais de qualquer nome
function getInitials(name: string) {
  const names = name.trim().split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export function Navbar() {
  // Simulando o estado de um usuário autenticado (isso virá do seu backend no futuro)
  const userName = "Luis Fernandes";
  const userInitials = getInitials(userName);

  return (
    <header className="flex h-20 w-full items-center justify-end px-8 bg-transparent">
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 px-4 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
        
        <ThemeToggle />
        <NotificationBell />
        
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 overflow-hidden border border-blue-200 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:opacity-80">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                {userInitials}
              </span>
            </button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-slate-500">
                  usuario@applyflow.ai
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* O asChild permite que o Link do Next.js assuma o comportamento do Item do Menu */}
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer flex w-full items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil do Usuário</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer flex w-full items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link href="/login" className="cursor-pointer flex w-full items-center text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair da conta</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </div>
    </header>
  );
}