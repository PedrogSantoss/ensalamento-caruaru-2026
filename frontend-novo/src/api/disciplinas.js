import { base44, safeCall } from "./client";
import mock from "../mock/disciplinas";

export const DisciplinaAPI = {

  async listar(periodo, unidade_id) {
    return safeCall(
      () => base44.entities.Disciplina.list({ periodo, unidade_id }),
      mock.filter(d => d.unidade_id === unidade_id && (periodo === "ALL" ? true : d.periodo === periodo))
    );
  },

  async atualizar(id, data) {
    return safeCall(
      () => base44.entities.Disciplina.update(id, data),
      { ...data, id }
    );
  }
};
