import React, { useState, useEffect, useRef } from "react";
import { Bell, AlertTriangle, Check } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAvisos } from "../../hooks/useAvisos";

export default function NotificationBell({ unidade }) {
  const [open, setOpen] = useState(false);
  const [lidos, setLidos] = useState(() => {
    const stored = localStorage.getItem("notificationsRead");
    return stored ? JSON.parse(stored) : [];
  });
  const dropdownRef = useRef(null);
  const { data: avisos = [], isLoading, isError } = useAvisos(unidade?.id);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [unidade]);

  const marcarLido = (id) => {
    const novos = [...lidos, id];
    setLidos(novos);
    localStorage.setItem("notificationsRead", JSON.stringify(novos));
  };

  const naoLidos = avisos.filter(a => !lidos.includes(a.id)).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative bg-white dark:bg-[#1b263b] hover:bg-slate-50 dark:hover:bg-[#23304a] border border-slate-200 dark:border-white/10 p-2.5 rounded-xl transition-all active:scale-95"
      >
        <Bell className="text-slate-600 dark:text-slate-300" size={20} />

        {naoLidos > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1b263b]">
            {naoLidos}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white dark:bg-[#1b263b] rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#0d1b2a]/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-white">Notificações</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-full">
              {naoLidos} novas
            </span>
          </div>

          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">Carregando...</div>
            ) : isError ? (
              <div className="p-8 text-center text-red-500 text-sm">Erro ao carregar avisos</div>
            ) : avisos.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">Nenhuma notificação</div>
            ) : (
              avisos.map(aviso => (
                <div
                  key={aviso.id}
                  className={`p-4 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
                    lidos.includes(aviso.id) ? "opacity-60 bg-slate-50/30 dark:bg-transparent" : "bg-white dark:bg-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 text-sm">
                      {aviso.importante && (
                        <AlertTriangle size={14} className="text-amber-500" />
                      )}
                      {aviso.titulo}
                    </p>

                    {!lidos.includes(aviso.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          marcarLido(aviso.id);
                        }}
                        className="text-slate-400 dark:text-slate-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                        title="Marcar como lida"
                      >
                        <Check size={16} />
                      </button>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-2">
                    {aviso.conteudo}
                  </p>

                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {format(new Date(aviso.data), "d 'de' MMMM 'às' HH:mm", {
                      locale: ptBR
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
