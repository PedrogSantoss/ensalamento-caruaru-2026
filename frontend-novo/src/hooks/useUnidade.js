import { useQuery } from "@tanstack/react-query";
import { UnidadesAPI } from "../api/unidades";

export function useUnidades() {
  return useQuery({
    queryKey: ["unidades"],
    queryFn: UnidadesAPI.listar
  });
}
