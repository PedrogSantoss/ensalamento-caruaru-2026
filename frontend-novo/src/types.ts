export interface Unidade {
  id: string;
  nome: string;
}

export interface Disciplina {
  id: string;
  nome: string;
  tutor: string;
  periodo: string;
  dia_semana: string;
  horario_inicio: string;
  horario_fim: string;
  tipo: string;
  sala: string;
  sem_aula: boolean;
}

export interface CronogramaProps {
  unidade?: Unidade;
}