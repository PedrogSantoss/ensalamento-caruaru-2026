import React, { useState } from "react";
import { User, Lock, ChevronRight, GraduationCap, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function UserTypeModal({ onSelect }) {
  const [step, setStep] = useState("selection"); // selection, admin-login
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    if (password === "admin123") {
      toast.success("Login realizado com sucesso!");
      onSelect("admin");
    } else {
      toast.error("Senha incorreta");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-[#1b263b] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-300">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-600 to-orange-500 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo</h2>
          <p className="text-orange-100 text-sm">Sistema de Ensalamento 26.1</p>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {step === "selection" ? (
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300 text-center mb-6">
                Como você deseja acessar o sistema?
              </p>

              <button
                onClick={() => onSelect("student")}
                className="w-full group relative flex items-center p-4 bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/5 rounded-xl hover:border-orange-500/50 hover:bg-white dark:hover:bg-[#23304a] transition-all duration-300 shadow-sm"
              >
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <GraduationCap size={24} />
                </div>
                <div className="ml-4 text-left flex-1">
                  <h3 className="text-slate-900 dark:text-white font-semibold">Sou Estudante</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Acessar cronograma e avisos</p>
                </div>
                <ChevronRight className="text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={() => setStep("admin-login")}
                className="w-full group relative flex items-center p-4 bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/5 rounded-xl hover:border-orange-500/50 hover:bg-white dark:hover:bg-[#23304a] transition-all duration-300 shadow-sm"
              >
                <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <ShieldCheck size={24} />
                </div>
                <div className="ml-4 text-left flex-1">
                  <h3 className="text-slate-900 dark:text-white font-semibold">Sou Administrador</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Gerenciar disciplinas e avisos</p>
                </div>
                <ChevronRight className="text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex h-16 w-16 rounded-full bg-orange-500/10 items-center justify-center mb-4">
                  <Lock size={32} className="text-orange-500" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-semibold text-lg">Área Administrativa</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Digite sua senha de acesso</p>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              />

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep("selection")}
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#23304a] transition-colors text-sm font-medium"
                >
                  Voltar
                </button>
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 px-4 py-3 rounded-xl bg-orange-600 text-white hover:bg-orange-500 transition-colors text-sm font-medium"
                >
                  Entrar
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
