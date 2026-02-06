import React, { useState } from "react";
import { MapPin, Search, ChevronRight } from "lucide-react";

export default function SelectLocationModal({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");

  const unidades = [
    {
      id: 1,
      nome: "Anhanguera Unidade 1",
      cidade: "Caruaru - PE",
      endereco: "Rua Cleto Campelo, 36 – Maurício de Nassau"
    },
    {
      id: 2,
      nome: "Anhanguera Unidade 2",
      cidade: "Caruaru - PE",
      endereco: "Rua Rodrigues de Abreu – Maurício de Nassau"
    }
  ];

  const filteredUnidades = unidades.filter(u => 
    u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.cidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-[#1b263b] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Selecione sua Unidade</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Escolha o campus para ver o cronograma</p>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0d1b2a]/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Buscar unidade ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-[#1b263b] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto p-4 space-y-3">
          {filteredUnidades.map(u => (
            <button
              key={u.id}
              onClick={() => onSelect(u)}
              className="w-full text-left group p-4 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0d1b2a] hover:bg-white dark:hover:bg-[#23304a] hover:border-orange-500/30 transition-all duration-200 flex items-center gap-4 shadow-sm"
            >
              <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors shrink-0">
                <MapPin size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 dark:text-white font-medium truncate">{u.nome}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs truncate">{u.cidade}</p>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5 truncate">{u.endereco}</p>
              </div>

              <ChevronRight className="text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0" size={18} />
            </button>
          ))}

          {filteredUnidades.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p>Nenhuma unidade encontrada.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
