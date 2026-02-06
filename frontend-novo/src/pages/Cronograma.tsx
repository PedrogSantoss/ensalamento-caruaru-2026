import { useState, useMemo, useCallback, useEffect } from "react";
import DisciplinaCard from "../components/cronograma/DisciplinaCard";
import DisciplinaModal from "../components/modals/DisciplinaModal";
import EditDisciplinaModal from "../components/modals/EditDisciplinaModal";
import { useDisciplinas } from "../hooks/useDisciplinas";
import { useAuth } from "../hooks/useAuth";
import { Calendar, Share } from "lucide-react";
import { CronogramaProps, Disciplina } from "../types";

const dayColors: Record<string, string> = {
  "SEGUNDA": "from-blue-600 to-blue-700",
  "TERÇA": "from-yellow-500 to-yellow-600",
  "QUARTA": "from-green-500 to-green-600",
  "QUINTA": "from-cyan-500 to-cyan-600",
  "SEXTA": "from-purple-500 to-purple-600",
  "SÁBADO": "from-orange-500 to-orange-600"
};

export default function Cronograma({ unidade }: CronogramaProps) {
  const getInitialState = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      periodo: urlParams.get("periodo") || "ALL",
      busca: urlParams.get("busca") || "",
    };
  };

  const [periodo, setPeriodo] = useState<string>(getInitialState().periodo);
  const [busca, setBusca] = useState<string>(getInitialState().busca);
  const [buscaDebounced, setBuscaDebounced] = useState<string>(getInitialState().busca);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (periodo !== "ALL") {
      url.searchParams.set("periodo", periodo);
    } else {
      url.searchParams.delete("periodo");
    }
    if (busca.trim()) {
      url.searchParams.set("busca", busca.trim());
    } else {
      url.searchParams.delete("busca");
    }
    window.history.replaceState({}, "", url);
  }, [periodo, busca]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBuscaDebounced(busca);
    }, 300);
    return () => clearTimeout(timer);
  }, [busca]);
  const { data: disciplinas, isLoading, isError, refetch } = useDisciplinas(periodo, unidade?.id);
  const { isAdmin } = useAuth();
  
  const [selectedDisciplina, setSelectedDisciplina] = useState<Disciplina | null>(null);
  const [editingDisciplina, setEditingDisciplina] = useState<Disciplina | null>(null);

  const dias: string[] = useMemo(() => ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"], []);

  const handleEditSave = async (updatedDisciplina: Disciplina) => {
      // Aqui você integraria com a API para salvar
      console.log("Saving disciplina:", updatedDisciplina);
      // await updateDisciplina(updatedDisciplina);
      setEditingDisciplina(null);
      refetch(); // Recarrega os dados
  };

  const shareLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copiado para a área de transferência!");
    } catch (error) {
      console.error("Erro ao copiar link:", error);
      // Fallback: mostrar o link em um prompt
      prompt("Copie o link:", url);
    }
  };

  const sortByPeriodo = useCallback((a: Disciplina, b: Disciplina) => {
    const pa = parseInt(String(a.periodo).split(/[^\d]+/)[0] || "0", 10);
    const pb = parseInt(String(b.periodo).split(/[^\d]+/)[0] || "0", 10);
    return pa - pb || a.nome.localeCompare(b.nome);
  }, []);

  const disciplinasPorDia = useMemo(() => {
    const listaSegura = Array.isArray(disciplinas) ? disciplinas : [];
    const result: Record<string, Disciplina[]> = {};
    dias.forEach(dia => {
      result[dia] = listaSegura
        .filter(d => d.dia_semana === dia)
        .filter(d => {
          const q = buscaDebounced.trim().toLowerCase();
          if (!q) return true;
          return (
            String(d.nome).toLowerCase().includes(q) ||
            String(d.tutor).toLowerCase().includes(q)
          );
        })
        .sort(sortByPeriodo);
    });
    return result;
  }, [disciplinas, buscaDebounced, sortByPeriodo, dias]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-500/20">
        Erro ao carregar cronograma. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div id="cronograma-content" className="animate-in fade-in duration-500 space-y-6">
      
      {/* Filtro de Período */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 bg-white dark:bg-[#1b263b] p-4 rounded-xl shadow-lg border border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="bg-orange-500 p-2 rounded-lg text-white">
          <Calendar size={20} />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">SELECIONE SEU PERÍODO ACADÊMICO</label>
          <select
            value={periodo}
            onChange={e => setPeriodo(e.target.value)}
            className="bg-transparent text-slate-900 dark:text-white font-bold text-lg outline-none cursor-pointer border border-slate-300 dark:border-white/20 rounded-md px-2 py-1 hover:border-orange-500 transition-colors"
            aria-label="Selecionar período acadêmico"
          >
            <option value="ALL" className="bg-white dark:bg-[#0d1b2a] text-slate-900 dark:text-white">Todos os períodos</option>
            {["1","2","3","4","5","6","7","8","9","10"].map(p => (
              <option key={p} value={p} className="bg-white dark:bg-[#0d1b2a] text-slate-900 dark:text-white">{p}º Período</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col flex-[2]">
          <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Buscar curso ou tutor</label>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite o nome do curso ou do tutor..."
            className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-1.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
            aria-label="Buscar curso ou tutor"
          />
        </div>
        <button
          onClick={shareLink}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors flex items-center gap-2"
          aria-label="Compartilhar link do cronograma"
        >
          <Share size={20} />
          <span className="hidden md:inline">Compartilhar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 overflow-x-auto">
        {dias.map(dia => (
          <div key={dia} className="flex flex-col gap-3 group min-w-[200px]">
            <div className={`bg-gradient-to-r ${dayColors[dia]} p-3 rounded-lg shadow-lg text-white font-bold text-center tracking-wider text-sm flex items-center justify-center gap-2 relative overflow-hidden hover:scale-105 transition-transform duration-200`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <span className="relative z-10">{dia}</span>
            </div>

            <div className="flex flex-col gap-3 min-h-[200px] bg-slate-100 dark:bg-white/5 rounded-xl p-2 border border-slate-200 dark:border-white/5 transition-colors duration-300">
              {disciplinasPorDia[dia].map(disc => (
                <DisciplinaCard 
                  key={disc.id} 
                  disciplina={disc} 
                  onClick={() => setSelectedDisciplina(disc)}
                />
              ))}
                
              {disciplinasPorDia[dia].length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-slate-500 text-sm border-2 border-dashed border-slate-200 dark:border-white/5 rounded-lg h-full">
                  <span>Sem aulas</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <DisciplinaModal 
        disciplina={selectedDisciplina} 
        onClose={() => setSelectedDisciplina(null)} 
        isAdmin={isAdmin}
        onEdit={() => {
            setEditingDisciplina(selectedDisciplina);
            setSelectedDisciplina(null);
        }}
      />

      {editingDisciplina && (
        <EditDisciplinaModal 
            disciplina={editingDisciplina}
            onClose={() => setEditingDisciplina(null)}
            onSave={handleEditSave}
        />
      )}

    </div>
  );
}
