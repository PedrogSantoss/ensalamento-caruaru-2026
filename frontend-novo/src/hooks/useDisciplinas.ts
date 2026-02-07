import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DisciplinaAPI } from "../api/disciplinas.js";
import type { Disciplina } from "../types";

export function useDisciplinas(periodo: string, unidade_id?: string | number) {

  return useQuery({
    queryKey: ["disciplinas", periodo, unidade_id],
    queryFn: () =>
      DisciplinaAPI.listar(periodo, unidade_id),
    enabled: !!unidade_id
  });
}

export function useAtualizarDisciplina() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: Partial<Disciplina> }) =>
      DisciplinaAPI.atualizar(id, data),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["disciplinas"] });
    }
  });
}
