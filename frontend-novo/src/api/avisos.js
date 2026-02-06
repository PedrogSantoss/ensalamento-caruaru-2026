import { base44, safeCall } from "./client";

let mockAvisos = [
  {
    id: 1,
    titulo: "Bem-vindo ao semestre",
    conteudo: "Início das aulas 26.1",
    tipo: "geral",
    importante: true,
    data: new Date(),
    unidade_id: null
  }
];

export const AvisosAPI = {

  async listar(unidade_id) {
    return safeCall(
      () => base44.entities.Aviso.list(unidade_id),
      mockAvisos.filter(
        a =>
          a.unidade_id === null ||
          a.unidade_id === unidade_id
      )
    );
  },

  async criar(data) {
    return safeCall(
      () => base44.entities.Aviso.create(data),
      (() => {
        const novo = { ...data, id: Date.now() };
        mockAvisos.push(novo);
        return novo;
      })()
    );
  },

  async remover(id) {
    return safeCall(
      () => base44.entities.Aviso.delete(id),
      (() => {
        mockAvisos = mockAvisos.filter(a => a.id !== id);
        return true;
      })()
    );
  },

  async atualizar(id, data) {
    return safeCall(
      () => base44.entities.Aviso.update(id, data),
      (() => {
        mockAvisos = mockAvisos.map(a => (a.id === id ? { ...a, ...data, id } : a));
        return { ...data, id };
      })()
    );
  }
};
