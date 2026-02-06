import React from "react";
import DisciplinaCard from "./DisciplinaCard";

const DIAS = [
  "SEGUNDA",
  "TERÇA",
  "QUARTA",
  "QUINTA",
  "SEXTA"
];

export default function GradeSemanal({
  periodo,
  unidade,
  userType
}) {

  // SIMULAÇÃO — depois vem da API real
  const disciplinas = [
    {
      id: 1,
      nome: "ADS",
      tutor: "Leonardo",
      dia_semana: "SEGUNDA",
      sala: "SALA 08",
      tipo: "teorica",
      periodo: 1,
      unidade_id: 1,
      cor: "blue",
      horario_inicio: "19:00",
      horario_fim: "22:00"
    }
  ];

  const filtradas = disciplinas.filter(
    d =>
      d.periodo === periodo &&
      d.unidade_id === unidade.id
  );

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-5 gap-4 min-w-[900px]">

        {DIAS.map(dia => (
          <div key={dia} className="bg-white rounded-xl border">

            <div className="p-2 text-center font-bold border-b bg-orange-50">
              {dia}
            </div>

            <div className="p-2 space-y-2">
              {filtradas
                .filter(d => d.dia_semana === dia)
                .map(disc => (
                  <DisciplinaCard
                    key={disc.id}
                    disciplina={disc}
                    isAdmin={userType === "admin"}
                  />
                ))}

              {filtradas.filter(d => d.dia_semana === dia).length === 0 && (
                <p className="text-xs text-center text-gray-400">
                  Sem aulas
                </p>
              )}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
