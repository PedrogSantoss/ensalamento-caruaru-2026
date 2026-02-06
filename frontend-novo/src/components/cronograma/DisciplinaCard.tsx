import { Ban } from "lucide-react";
import { Disciplina } from "../../types";

interface DisciplinaCardProps {
  disciplina: Disciplina;
  onClick: (disciplina: Disciplina) => void;
}

export default function DisciplinaCard({ disciplina, onClick }: DisciplinaCardProps) {
  const isPratica = disciplina.tipo === "pratica";
  const semAula = disciplina.sem_aula;

  // Minimalist border color logic
  const getBorderColor = () => {
    if (semAula) return "border-slate-600";
    if (isPratica) return "border-green-500";
    return "border-blue-500";
  };

  return (
    <button 
      onClick={() => onClick(disciplina)}
      className={`group relative rounded-lg border-l-4 ${getBorderColor()} bg-white dark:bg-[#1b263b] shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 p-4 cursor-pointer overflow-hidden ${semAula ? 'opacity-75' : ''} text-left w-full`}
      aria-label={`Detalhes da disciplina ${disciplina.nome}`}
    >
      {semAula && (
        <div className="absolute right-2 top-2">
          <span className="text-red-500 bg-red-50 dark:bg-red-900/20 p-1 rounded-full">
            <Ban size={16} />
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight line-clamp-2">
          {disciplina.nome}
        </h3>
        
        <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isPratica ? 'bg-green-500' : 'bg-blue-500'}`}></span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {disciplina.horario_inicio} - {disciplina.horario_fim}
            </span>
        </div>
      </div>
    </button>
  );
}
