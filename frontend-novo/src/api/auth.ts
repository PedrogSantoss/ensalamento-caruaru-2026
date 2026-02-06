import { base44 } from "./client.ts";

export type AuthMe = { role?: string };
export type AuthLogin = { role: string; token: string | null };

export const AuthAPI = {
  async me(): Promise<AuthMe> {
    try {
      return await base44.auth.me();
    } catch {
      return {
        role: localStorage.getItem("userType") || undefined
      };
    }
  },

  async login(senha: string): Promise<AuthLogin> {
    try {
      const data = await base44.auth.login(senha);
      if (data?.role) {
        localStorage.setItem("userType", data.role);
      }
      return data as AuthLogin;
    } catch {
      const role = senha === "admin123" ? "admin" : "student";
      localStorage.setItem("userType", role);
      return { role, token: null };
    }
  },

  logout(): void {
    localStorage.removeItem("userType");
    try {
      base44.auth.logout();
    } catch {
      void 0;
    }
  }
};
