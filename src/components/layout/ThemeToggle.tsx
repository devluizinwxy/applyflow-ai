"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
      className="relative flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors focus:outline-none w-9 h-9"
      title="Alternar Tema"
    >
      {mounted && theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : mounted && theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <span className="h-5 w-5 opacity-0" /> 
      )}
      <span className="sr-only">Alternar tema</span>
    </button>
  );
}