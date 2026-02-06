import React, { useState } from "react";
import { X, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginModal({ onSuccess, onClose }) {
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (senha === "admin123") {
      localStorage.setItem("userType", "admin");
      toast.success("Acesso administrativo liberado");
      onSuccess();
    } else {
      toast.error("Senha inválida");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Acesso Administrador</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <input
          type="password"
          className="w-full border rounded p-2 mb-4"
          placeholder="Digite a senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-600 text-white p-2 rounded flex items-center justify-center gap-2"
        >
          <LogIn size={18} />
          Entrar
        </button>

      </div>
    </div>
  );
}
