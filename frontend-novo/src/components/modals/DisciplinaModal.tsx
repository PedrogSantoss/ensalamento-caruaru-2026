import { useEffect, useRef } from "react";
import { X, Clock, MapPin, User, BookOpen, AlertTriangle, Calendar, Edit } from "lucide-react";
import type { Disciplina } from "../../types";

type Props = {
  disciplina: Disciplina | null;
  onClose: () => void;
  onEdit: () => void;
  isAdmin: boolean;
};

export default function DisciplinaModal({ disciplina, onClose, onEdit, isAdmin }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  if (!disciplina) return null;

  const isPratica = disciplina.tipo === "pratica";
  const semAula = disciplina.sem_aula;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div ref={modalRef} tabIndex={-1} className="w-full max-w-md bg-white dark:bg-[#1b263b] rounded-3xl shadow-2xl overflow-hidden relative transition-all animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
        
        {/* Header with Close Button */}
        <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={onClose}
              className="bg-slate-100 dark:bg-black/20 hover:bg-slate-200 dark:hover:bg-black/40 text-slate-500 dark:text-white p-2 rounded-full transition-colors"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>
        </div>

        {/* Course Title Section */}
        <div className="pt-10 pb-6 px-8 bg-slate-50 dark:bg-[#0d1b2a]/50 border-b border-slate-100 dark:border-white/5">
            {semAula && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold mb-3">
                    <AlertTriangle size={14} />
                    SEM AULA HOJE
                </div>
            )}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {disciplina.nome}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 font-bold">
                Período: {disciplina.periodo}
              </span>
            </div>
        </div>

        {/* Content Cards */}
        <div className="p-6 space-y-3">
            

            {/* Professor */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#0d1b2a] rounded-2xl">
                <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-full text-blue-600 dark:text-blue-400">
                    <User size={24} />
                </div>
                <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Professor/Tutor</span>
                    <span className="block text-lg font-bold text-slate-900 dark:text-white">{disciplina.tutor}</span>
                </div>
            </div>

            {/* Tipo de Aula */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#0d1b2a] rounded-2xl">
                <div className={`p-3 rounded-full ${isPratica ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'}`}>
                    <BookOpen size={24} />
                </div>
                <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Aula</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mt-1 ${
                        isPratica 
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300' 
                        : 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300'
                    }`}>
                        {isPratica ? "Aula Prática" : "Aula Teórica"}
                    </span>
                </div>
            </div>

            {/* Local */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#0d1b2a] rounded-2xl">
                <div className="bg-red-100 dark:bg-red-500/10 p-3 rounded-full text-red-600 dark:text-red-400">
                    <MapPin size={24} />
                </div>
                <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Local</span>
                    <span className="block text-lg font-bold text-slate-900 dark:text-white">{disciplina.sala}</span>
                </div>
            </div>

            {/* Horário */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#0d1b2a] rounded-2xl">
                <div className="bg-orange-100 dark:bg-orange-500/10 p-3 rounded-full text-orange-600 dark:text-orange-400">
                    <Clock size={24} />
                </div>
                <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Horário</span>
                    <span className="block text-lg font-bold text-slate-900 dark:text-white">{disciplina.horario_inicio} - {disciplina.horario_fim}</span>
                </div>
            </div>

            {/* Dia da Semana */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#0d1b2a] rounded-2xl">
                <div className="bg-purple-100 dark:bg-purple-500/10 p-3 rounded-full text-purple-600 dark:text-purple-400">
                    <Calendar size={24} />
                </div>
                <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Dia da Semana</span>
                    <span className="block text-lg font-bold text-slate-900 dark:text-white capitalize">{disciplina.dia_semana.toLowerCase().replace('feira', '-feira')}</span>
                </div>
            </div>

        </div>
        
        {/* Admin Actions */}
        {isAdmin && (
            <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#0d1b2a]/30">
                <button 
                    onClick={onEdit}
                    className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-orange-500/20"
                    aria-label="Editar disciplina"
                >
                    <Edit size={20} />
                    Editar Disciplina
                </button>
            </div>
        )}

      </div>
    </div>
  );
}
