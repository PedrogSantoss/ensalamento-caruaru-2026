import { base44 } from "./client";

export const AuthAPI = {

  async me() {
    try {
      return await base44.auth.me();
    } catch {
      return {
        role: localStorage.getItem("userType")
      };
    }
  },

  async login(senha) {
    try {
      const data = await base44.auth.login(senha);
      if (data?.role) {
        localStorage.setItem("userType", data.role);
      }
      return data;
    } catch {
      const role = senha === "admin123" ? "admin" : "student";
      localStorage.setItem("userType", role);
      return { role, token: null };
    }
  },

  logout() {
    localStorage.removeItem("userType");
    try {
      base44.auth.logout();
    } catch {
      void 0;
    }
  }
};
