import ChatWindow from "./_components/ChatWindow";
import ResumeAnalysis from "./_components/ResumeAnalysis";
import { SuggestionsList, QuestionSuggestions, RecentDocuments } from "./_components/AiSuggestions";

export default function AiAssistantPage() {
  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-screen bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Topo com a Logo */}
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
        <img 
          src="/images/logo.PNG" 
          alt="ApplyFlow Logo" 
          className="w-10 h-10 object-contain"
        />
        <h1 className="text-2xl font-bold tracking-tight">
          ApplyFlow AI Assistant
        </h1>
      </div>
      
      {/* Layout Grid Integrado */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lado Esquerdo */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <ResumeAnalysis />
          <SuggestionsList />
        </div>

        {/* Centro: Chat */}
        <div className="lg:col-span-6 border-x-0 lg:border-x border-slate-100 dark:border-slate-800 lg:px-6">
          <ChatWindow />
        </div>

        {/* Lado Direito */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <QuestionSuggestions />
          <RecentDocuments />
        </div>

      </div>
    </div>
  );
}