import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import UserTypeModal from "./components/modals/UserTypeModal";
import SelectLocationModal from "./components/modals/SelectLocationModal";
import Header from "./components/Header";
import Cronograma from "./pages/Cronograma";
import Footer from "./components/Footer";
import { useApp } from "./hooks/useApp";
import CreateAvisoModal from "./components/modals/CreateAvisoModal";
import { useCriarAviso } from "./hooks/useAvisos";
import AdminAvisosPanel from "./components/admin/AdminAvisosPanel";
import "./styles/modern.css";

export default function App() {
  const { userType, unidade, escolherTipo, escolherUnidade, resetar } = useApp();
  const [abrirAviso, setAbrirAviso] = useState(false);
  const [abrirPainel, setAbrirPainel] = useState(false);
  const criarAviso = useCriarAviso();

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster 
        position="top-right"
        toastOptions={{
          className: '!bg-white dark:!bg-[#1b263b] !text-slate-900 dark:!text-white !border !border-slate-200 dark:!border-white/10 !shadow-lg',
          success: {
            iconTheme: {
              primary: '#f97316',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {!userType ? (
        <UserTypeModal onSelect={escolherTipo} />
      ) : !unidade ? (
        <SelectLocationModal onSelect={escolherUnidade} />
      ) : (
        <>
          <Header
            unidade={unidade}
            onTrocar={() => escolherUnidade(null)}
            onReset={resetar}
            onNovoAviso={() => setAbrirAviso(true)}
            onAbrirPainel={() => setAbrirPainel(true)}
          />

          <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8">
            <Cronograma unidade={unidade} />
          </main>
          
          <Footer unidade={unidade} />

          {abrirAviso && (
            <CreateAvisoModal
              unidade={unidade}
              onClose={() => setAbrirAviso(false)}
              onCreate={(data) => criarAviso.mutate(data)}
            />
          )}
          
          {abrirPainel && (
            <AdminAvisosPanel
              unidade={unidade}
              onClose={() => setAbrirPainel(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
