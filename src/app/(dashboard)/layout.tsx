import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      {/* Sidebar fixa na esquerda */}
      <Sidebar />

      {/* O SEGREDO ESTÁ AQUI: 
        No mobile usamos ml-14 (56px) para casar perfeitamente com a sidebar encolhida.
        No desktop voltamos para md:ml-24 (96px). 
        Isso elimina o buraco preto lateral instantaneamente.
      */}
      <div className="flex-1 ml-14 md:ml-24 flex flex-col min-h-screen min-w-0 w-full overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}