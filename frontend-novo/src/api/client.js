// Cliente base para base44 ou API REST futura

export const API_URL = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) || "http://localhost:3001";

export const base44 = window.base44 || {
  entities: {
    Aviso: {
      async list(unidade_id) {
        const qs = new URLSearchParams();
        if (unidade_id != null) qs.set("unidade_id", unidade_id);
        const url = qs.toString() ? `${API_URL}/api/avisos?${qs.toString()}` : `${API_URL}/api/avisos`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed");
        return res.json();
      },
      async create(data) {
        const res = await fetch(`${API_URL}/api/avisos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed");
        return res.json();
      },
      async update(id, data) {
        const res = await fetch(`${API_URL}/api/avisos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed");
        return res.json();
      },
      async delete(id) {
        const res = await fetch(`${API_URL}/api/avisos/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed");
        return true;
      }
    },
    Disciplina: {
      async list(params) {
        const qs = new URLSearchParams();
        if (params?.periodo) qs.set("periodo", params.periodo);
        if (params?.unidade_id) qs.set("unidade_id", params.unidade_id);
        const res = await fetch(`${API_URL}/api/disciplinas?${qs.toString()}`);
        if (!res.ok) throw new Error("Failed");
        return res.json();
      },
      async update(id, data) {
        const res = await fetch(`${API_URL}/api/disciplinas/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed");
        return res.json();
      }
    }
  },
  auth: {
    async login(senha) {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha })
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      return data;
    },
    async me() {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    async logout() {
      localStorage.removeItem("token");
    }
  }
};

// Helper para fallback mock caso não exista base44
export const safeCall = async (fn, fallback) => {
  try {
    return await fn();
  } catch {
    console.warn("API não disponível, usando mock");
    return fallback;
  }
};
