import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AvisosAPI } from "../api/avisos";

export function useAvisos(unidade_id) {

  return useQuery({
    queryKey: ["avisos", unidade_id],
    queryFn: () => AvisosAPI.listar(unidade_id),
    enabled: !!unidade_id
  });
}

export function useCriarAviso() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: AvisosAPI.criar,

    onSuccess: () => {
      client.invalidateQueries(["avisos"]);
    }
  });
}

export function useRemoverAviso() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: AvisosAPI.remover,
    onSuccess: () => {
      client.invalidateQueries(["avisos"]);
    }
  });
}

export function useAtualizarAviso() {
  const client = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => AvisosAPI.atualizar(id, data),
    onSuccess: () => {
      client.invalidateQueries(["avisos"]);
    }
  });
}
