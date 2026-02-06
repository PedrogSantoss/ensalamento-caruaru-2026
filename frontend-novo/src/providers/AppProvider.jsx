import React, { useState } from "react";
import { AppContext } from "./appContext";

export function AppProvider({ children }) {
  const [userType, setUserType] = useState(() => localStorage.getItem("userType"));
  const [unidade, setUnidade] = useState(() => {
    const saved = localStorage.getItem("unidade");
    return saved ? JSON.parse(saved) : null;
  });

  const escolherTipo = (tipo) => {
    setUserType(tipo);
    localStorage.setItem("userType", tipo);
  };

  const escolherUnidade = (u) => {
    setUnidade(u);
    localStorage.setItem("unidade", JSON.stringify(u));
  };

  const resetar = () => {
    localStorage.clear();
    setUserType(null);
    setUnidade(null);
  };

  return (
    <AppContext.Provider value={{ userType, unidade, escolherTipo, escolherUnidade, resetar }}>
      {children}
    </AppContext.Provider>
  );
}
