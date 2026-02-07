import type { Disciplina } from "../types";

declare module "../api/auth" {
  export const AuthAPI: {
    me(): Promise<{ role?: string }>;
    login(senha: string): Promise<{ role: string; token: string | null }>;
    logout(): void;
  };
}

declare module "../api/disciplinas" {
  export const DisciplinaAPI: {
    listar(periodo: string, unidade_id: string | number | undefined): Promise<Disciplina[]>;
    atualizar(id: string | number, data: Partial<Disciplina>): Promise<Disciplina>;
  };
}

declare module "../api/auth.js" {
  export const AuthAPI: {
    me(): Promise<{ role?: string }>;
    login(senha: string): Promise<{ role: string; token: string | null }>;
    logout(): void;
  };
}

declare module "../api/disciplinas.js" {
  export const DisciplinaAPI: {
    listar(periodo: string, unidade_id: string | number | undefined): Promise<Disciplina[]>;
    atualizar(id: string | number, data: Partial<Disciplina>): Promise<Disciplina>;
  };
}
