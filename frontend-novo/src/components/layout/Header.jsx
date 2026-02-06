import React from "react";
import { LogOut, MapPinned, Menu } from "lucide-react";

export default function Header({
  unidade,
  userType,
  onLogout,
  onChangeUnidade
}) {
  return (
    <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <img
            src="/logo-anhanguera.png"
            alt="Anhanguera"
            className="h-8 sm:h-10"
          />

          <div>
            <h1 className="text-lg sm:text-xl font-bold">
              Ensalamento
            </h1>

            <p className="text-xs sm:text-sm opacity-90">
              {unidade?.nome}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onChangeUnidade}
            className="flex items-center gap-1 bg-white/20 px-3 py-2 rounded-lg text-sm"
          >
            <MapPinned size={16} />
            Trocar Unidade
          </button>

          {userType === "admin" && (
            <span className="hidden sm:inline bg-white text-orange-600 px-2 py-1 rounded text-xs font-bold">
              MODO ADMIN
            </span>
          )}

          <button
            onClick={onLogout}
            className="flex items-center gap-1 bg-white/20 px-3 py-2 rounded-lg text-sm"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
