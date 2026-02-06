import { base44, safeCall } from "./client";

const mockUnidades = [
  {
    id: 1,
    nome: "Anhanguera Unidade 1",
    cidade: "Caruaru",
    estado: "PE",
    endereco: "Rua Cleto Campelo, 36"
  },
  {
    id: 2,
    nome: "Anhanguera Unidade 2",
    cidade: "Caruaru",
    estado: "PE",
    endereco: "Rua Rodrigues de Abreu"
  }
];

export const UnidadesAPI = {
  async listar() {
    return safeCall(
      () => base44.entities.Unidade.list(),
      mockUnidades
    );
  }
};
