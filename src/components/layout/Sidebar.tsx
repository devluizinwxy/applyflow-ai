"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, User, Bot, Settings } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/applications", icon: FileText },
    { name: "Profile", href: "/profile", icon: User },
    { name: "AI Agent", href: "/ai-assistant", icon: Bot },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-24 h-screen bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-6 fixed left-0 top-0 z-50">
      <div className="mb-10">
        <Link href="/dashboard">
          {/* Certifique-se de que a logo.png está na pasta public/images/ */}
          <Image src="/images/logo.PNG" alt="Logo" width={60} height={60} />
        </Link>
      </div>
      
      <nav className="flex flex-col gap-6 w-full px-2">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex flex-col items-center gap-1.5 p-2 w-full rounded-xl transition-all duration-200 ${
                isActive 
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400" 
                  : "text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-6 h-6 stroke-[1.5]" />
              <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}