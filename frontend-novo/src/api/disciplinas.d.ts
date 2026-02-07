import type { Disciplina } from "../types";

export declare const DisciplinaAPI: {
  listar(periodo: string, unidade_id: string | number | undefined): Promise<Disciplina[]>;
  atualizar(id: string | number, data: Partial<Disciplina>): Promise<Disciplina>;
};
