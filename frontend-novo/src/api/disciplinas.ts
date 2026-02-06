import { base44, safeCall } from "./client.js";
import mock from "../mock/disciplinas.js";
import type { Disciplina } from "../types";

export const DisciplinaAPI = {
  async listar(periodo: string, unidade_id?: string): Promise<Disciplina[]> {
    return safeCall(
      () => base44.entities.Disciplina.list({ periodo, unidade_id }),
      mock.filter((d) => d.unidade_id === unidade_id && (periodo === "ALL" ? true : d.periodo === periodo))
    );
  },

  async atualizar(id: string, data: Partial<Disciplina>): Promise<Disciplina> {
    return safeCall(
      () => base44.entities.Disciplina.update(id, data),
      { ...data, id } as Disciplina
    );
  }
};
