import React, { useState } from "react";
import { X, Plus, Bell } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateAvisoModal({ unidade, onClose, onCreate }) {

  const [form, setForm] = useState({
    titulo: "",
    conteudo: "",
    tipo: "geral",
    importante: false,
    unidade_id: unidade?.id || null,
    all_units: false
  });

  const handleSubmit = () => {
    if (!form.titulo || !form.conteudo) {
      toast.error("Preencha todos os campos");
      return;
    }

    onCreate({
      ...form,
      id: Date.now(),
      data: new Date(),
      unidade_id: form.all_units ? null : (unidade?.id || form.unidade_id)
    });

    toast.success("Aviso publicado com sucesso!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-[#1b263b] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-[#0d1b2a]/50">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
                <Bell size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Novo Aviso</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto">

          <div>
            <label className="block text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-1.5">Título do Aviso</label>
            <input
              className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              placeholder="Ex: Prazo de Rematrícula"
              onChange={e => setForm({...form, titulo: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-1.5">Conteúdo</label>
            <textarea
              className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none h-32"
              placeholder="Digite a mensagem do aviso..."
              onChange={e => setForm({...form, conteudo: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-1.5">Categoria</label>
                <select
                  className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all appearance-none"
                  onChange={e => setForm({...form, tipo: e.target.value})}
                >
                    <option value="geral">Geral</option>
                    <option value="academico">Acadêmico</option>
                    <option value="eventos">Eventos</option>
                    <option value="urgente">Urgente</option>
                </select>
            </div>
          <div className="space-y-4">
             <div className="flex items-end">
                <label className="flex items-center gap-3 bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 p-3 rounded-xl w-full">
                  <input
                    type="checkbox"
                    checked={form.importante}
                    onChange={e => setForm({ ...form, importante: e.target.checked })}
                  />
                  <div className="flex flex-col">
                    <span className="text-slate-900 dark:text-white text-sm font-bold">Notificação Importante</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Será destacada para os usuários</span>
                  </div>
                </label>
            </div>

            <div className="flex items-end">
                <label className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/20 p-3 rounded-xl w-full">
                  <input
                    type="checkbox"
                    checked={form.all_units}
                    onChange={e => setForm({ ...form, all_units: e.target.checked })}
                  />
                  <div className="flex flex-col">
                    <span className="text-slate-900 dark:text-white text-sm font-bold">Enviar para Todas as Unidades</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Notificar alunos de todos os campus</span>
                  </div>
                </label>
            </div>
          </div>

          

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0d1b2a]/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-[#1b263b] transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all font-bold flex items-center gap-2"
          >
            <Plus size={20} />
            Publicar Aviso
          </button>
        </div>

      </div>
    </div>
    </div>
  );
}