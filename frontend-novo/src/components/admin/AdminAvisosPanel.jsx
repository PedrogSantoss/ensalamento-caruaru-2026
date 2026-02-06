import React, { useMemo, useState } from "react";
import { X, Search, Trash2, Bell, Plus, Pencil } from "lucide-react";
import { useAvisos, useRemoverAviso, useAtualizarAviso } from "../../hooks/useAvisos";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import toast from "react-hot-toast";
import CreateAvisoModal from "../modals/CreateAvisoModal";
import EditAvisoModal from "../modals/EditAvisoModal";

export default function AdminAvisosPanel({ unidade, onClose }) {
  const [query, setQuery] = useState("");
  const [onlyCurrentUnit, setOnlyCurrentUnit] = useState(true);
  const [abrirCriar, setAbrirCriar] = useState(false);
  const { data: avisos = [], isLoading, isError } = useAvisos(unidade?.id);
  const remover = useRemoverAviso();
  const atualizar = useAtualizarAviso();
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    const base = avisos.filter(a => {
      if (onlyCurrentUnit) {
        return a.unidade_id === null || a.unidade_id === unidade?.id;
      }
      return true;
    });
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(a =>
      a.titulo.toLowerCase().includes(q) ||
      a.conteudo.toLowerCase().includes(q)
    );
  }, [avisos, query, onlyCurrentUnit, unidade]);

  const excluir = (id) => {
    remover.mutate(id, {
      onSuccess: () => toast.success("Aviso excluído"),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-5xl bg-white dark:bg-[#1b263b] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-[#0d1b2a]/50">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
              <Bell size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Painel de Avisos</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#0d1b2a]/50 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título ou conteúdo..."
              className="w-full bg-slate-50 dark:bg-[#1b263b] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
          <label className="flex items-center gap-2 text-sm bg-slate-50 dark:bg-[#1b263b] border border-slate-200 dark:border-white/10 px-3 py-2 rounded-xl">
            <input
              type="checkbox"
              checked={onlyCurrentUnit}
              onChange={e => setOnlyCurrentUnit(e.target.checked)}
            />
            <span className="text-slate-700 dark:text-slate-200">Somente unidade atual</span>
          </label>
          <button
            onClick={() => setAbrirCriar(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
          >
            <Plus size={18} />
            Novo Aviso
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">Carregando...</div>
          ) : isError ? (
            <div className="p-8 text-center text-red-500">Erro ao carregar avisos</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">Nenhum aviso encontrado</div>
          ) : (
            filtered.map(aviso => (
              <div
                key={aviso.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1b263b] flex items-start justify-between"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {aviso.importante && <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Importante</span>}
                    {aviso.unidade_id === null && <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Todas as unidades</span>}
                    {aviso.unidade_id && <span className="text-xs text-slate-600 dark:text-slate-300">Unidade #{aviso.unidade_id}</span>}
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-semibold mt-1">{aviso.titulo}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{aviso.conteudo}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {format(new Date(aviso.data), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <button
                  onClick={() => excluir(aviso.id)}
                  className="text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg ml-4"
                  title="Excluir aviso"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => setEditing(aviso)}
                  className="text-slate-700 dark:text-slate-200 hover:text-orange-600 dark:hover:text-orange-400 bg-slate-50 dark:bg-white/10 px-3 py-2 rounded-lg ml-2"
                  title="Editar aviso"
                >
                  <Pencil size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {abrirCriar && (
          <CreateAvisoModal
            unidade={unidade}
            onClose={() => setAbrirCriar(false)}
            onCreate={() => setAbrirCriar(false)}
          />
        )}
        
        {editing && (
          <EditAvisoModal
            aviso={editing}
            unidade={unidade}
            onClose={() => setEditing(null)}
            onSave={(data) => atualizar.mutate({ id: editing.id, data })}
          />
        )}
      </div>
    </div>
  );
}
