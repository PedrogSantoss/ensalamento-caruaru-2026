import { useState, useEffect, useRef } from "react";
import { X, Save, Clock, MapPin, User, BookOpen, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import type { Disciplina } from "../../types";

type Props = {
  disciplina: Disciplina;
  onClose: () => void;
  onSave: (d: Disciplina) => void;
};

export default function EditDisciplinaModal({ disciplina, onClose, onSave }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);
  const [form, setForm] = useState<Disciplina>({ 
    ...disciplina,
    horario_inicio: disciplina.horario_inicio || "19:00",
    horario_fim: disciplina.horario_fim || "22:00"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value } as Disciplina);
  };

  const handleSubmit = () => {
    if (!form.nome || !form.tutor) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }
    
    // Validate time
    if (form.horario_inicio >= form.horario_fim) {
        toast.error("Horário de início deve ser antes do fim");
        return;
    }

    onSave(form);
    toast.success("Disciplina atualizada com sucesso");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div ref={modalRef} tabIndex={-1} className="w-full max-w-2xl bg-white dark:bg-[#1b263b] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-[#0d1b2a]/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Editar Disciplina</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors" aria-label="Fechar modal">
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          
          {/* Status Section */}
          <div className="bg-slate-50 dark:bg-[#0d1b2a] p-4 rounded-xl border border-slate-200 dark:border-white/5">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${form.sem_aula ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <span className="text-slate-900 dark:text-white font-medium block">Status da Aula</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">Marcar se não haverá aula neste dia</span>
                </div>
              </div>
              
              <div className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={form.sem_aula} 
                  onChange={e => setForm({ ...form, sem_aula: e.target.checked })}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </div>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-1.5">Nome da Disciplina</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  placeholder="Ex: Cálculo I"
                />
              </div>
            </div>

            <div>
               <label className="block text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-1.5">Tipo de Aula</label>
               <select
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all appearance-none"
                >
                  <option value="teorica">Teórica</option>
                  <option value="pratica">Prática</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-1.5">Professor / Tutor</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input
                    name="tutor"
                    value={form.tutor}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    placeholder="Nome do professor"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-1.5">Tipo de Aula</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <select
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all appearance-none"
                  >
                    <option value="teorica">Teórica</option>
                    <option value="pratica">Prática</option>
                    <option value="laboratorio">Laboratório</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-1.5">Horário Início</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input
                    type="time"
                    name="horario_inicio"
                    value={form.horario_inicio}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-1.5">Horário Fim</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                  <input
                    type="time"
                    name="horario_fim"
                    value={form.horario_fim}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 text-xs font-medium uppercase mb-1.5">Sala / Laboratório</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  name="sala"
                  value={form.sala}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  placeholder="Ex: Sala 104, Lab Informática II"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0d1b2a]/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-[#1b263b] transition-colors font-medium"
            aria-label="Cancelar edição"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all font-bold flex items-center gap-2"
            aria-label="Salvar alterações da disciplina"
          >
            <Save size={20} />
            Salvar Alterações
          </button>
        </div>

      </div>
    </div>
  );
}
