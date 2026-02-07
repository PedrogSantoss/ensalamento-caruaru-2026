import { base44, safeCall } from "./client";
import mock from "../mock/disciplinas";

export const DisciplinaAPI = {

  async listar(periodo, unidade_id) {
    // Função auxiliar para comparar períodos flexivelmente (ex.: "1" casa com "1 A"/"1 B"/"1°A")
    const matchesPeriodo = (dPeriodo, selPeriodo) => {
      if (selPeriodo === "ALL") return true;
      const norm = (s) => String(s).toUpperCase().replace(/\s+/g, "");
      const onlyFirstNumber = (s) => {
        const m = String(s).match(/\d+/);
        return m ? m[0] : "";
      };
      // Igualdade direta (depois de normalizar)
      if (norm(dPeriodo) === norm(selPeriodo)) return true;
      // Comparar apenas o primeiro número
      return onlyFirstNumber(dPeriodo) === onlyFirstNumber(selPeriodo);
    };

    return safeCall(
      () => base44.entities.Disciplina.list({ periodo, unidade_id }),
      mock.filter(d => d.unidade_id === unidade_id && matchesPeriodo(d.periodo, periodo))
    );
  },

  async atualizar(id, data) {
    return safeCall(
      () => base44.entities.Disciplina.update(id, data),
      { ...data, id }
    );
  }
};
