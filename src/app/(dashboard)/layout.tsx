import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Mantido o seu background original, mas com w-full e overflow-x-hidden para proteger o mobile
    <div className="flex min-h-screen w-full bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">
      
      {/* Sidebar na esquerda */}
      <Sidebar />

      {/* AQUI ESTÁ A CORREÇÃO: 
        Trocamos o seu "ml-24" fixo por "ml-14 md:ml-24" para adaptar no mobile.
        Adicionamos "min-w-0" e "overflow-x-hidden" para evitar a rolagem horizontal fantasma.
      */}
      <div className="flex-1 ml-14 md:ml-24 flex flex-col min-h-screen min-w-0 w-full overflow-x-hidden transition-all duration-300">
        
        {/* A SUA NAVBAR ORIGINAL RESTAURADA AQUI! */}
        <Navbar />

        {/* Ajustei o padding para "p-4 md:p-8" para dar mais espaço de tela no celular */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
          {children}
        </main>
        
      </div>
    </div>
  );
}