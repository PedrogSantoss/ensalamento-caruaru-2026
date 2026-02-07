import { useState, useEffect } from "react";
import { AuthAPI } from "../api/auth.js";

export function useAuth() {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    AuthAPI.me().then((user: { role?: string }) => {
      setIsAdmin(user?.role === "admin");
    });
  }, []);

  const login = (senha: string) => {
    return AuthAPI.login(senha).then((data: { role?: string }) => {
      setIsAdmin(data?.role === "admin");
      return data?.role === "admin";
    });
  };

  const logout = () => {
    AuthAPI.logout();
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
}
