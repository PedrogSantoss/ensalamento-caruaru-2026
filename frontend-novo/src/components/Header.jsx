import React from "react";
import { LogOut, MapPin, Menu, X, Sun, Moon, Plus } from "lucide-react";
import NotificationBell from "./notifications/NotificationBell";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../providers/themeContext";

export default function Header({ unidade, onTrocar, onReset, onNovoAviso, onAbrirPainel }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-[#0d1b2a]/80 border-b border-slate-200 dark:border-white/10 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Logo e Info Unidade */}
        <div className="flex items-center gap-4">
          <div className="bg-orange-500 rounded-lg p-2 shadow-lg shadow-orange-500/20">
            <span className="font-bold text-white tracking-wider text-sm md:text-base">ANHANGUERA</span>
          </div>
          
          <div className="hidden md:flex flex-col">
            <h1 className="text-sm font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wide">
              Ensalamento 26.1
            </h1>
            <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold text-lg leading-none">
              <MapPin size={16} className="text-orange-500" />
              {unidade?.nome}
            </div>
          </div>
        </div>

        {/* Ações Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <div className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-orange-500 transition-colors"
            title={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <NotificationBell unidade={unidade} />

          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2" />

          {isAdmin && (
            <button
              onClick={onNovoAviso}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-orange-500/20 transition-all"
            >
              <Plus size={16} />
              Novo Aviso
            </button>
          )}
          
          {isAdmin && (
            <button
              onClick={onAbrirPainel}
              className="flex items-center gap-2 bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/10 dark:hover:bg-white/20 text-slate-900 dark:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
            >
              Painel
            </button>
          )}

          <button 
            onClick={onTrocar}
            className="text-sm font-medium text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Trocar Unidade
          </button>

          <button 
            onClick={onReset}
            className="flex items-center gap-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>

        {/* Menu Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <NotificationBell unidade={unidade} />
          
          {isAdmin && (
            <button
              onClick={onNovoAviso}
              className="px-3 py-2 rounded-lg bg-orange-500 text-white text-xs font-bold"
            >
              Aviso
            </button>
          )}
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1b2a] p-4 space-y-3 animate-in slide-in-from-top-5 shadow-xl">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold pb-2 border-b border-slate-200 dark:border-white/10">
            <MapPin size={16} className="text-orange-500" />
            {unidade?.nome}
          </div>
          <button 
            onClick={() => { onTrocar(); setIsMenuOpen(false); }}
            className="w-full text-left px-4 py-3 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 text-sm"
          >
            Trocar Unidade
          </button>
          <button 
            onClick={() => { onReset(); setIsMenuOpen(false); }}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-500 dark:text-red-400 text-sm"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
