import React from "react";

export default function DisciplinaCard({ d, onClick }) {
    return (
        <div
            className="card"
            style={{ margin: 8, padding: 10 }}
            onClick={() => onClick?.(d)}
        >
            <strong>{d.nome}</strong>

            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                👨‍🏫 {d.tutor}
            </div>

            <div style={{ fontSize: 13 }}>
                🕒 {d.horario_inicio} - {d.horario_fim}
            </div>

            <div style={{ fontSize: 13 }}>
                📍 {d.tipo === "pratica" ? "🧪 Laboratório" : "📚 Sala de Aula"}
            </div>

            <span style={{
                background: d.tipo === "pratica" ? "#E3F8FF" : "#FFF1EA",
                color: d.tipo === "pratica" ? "#0369A1" : "#C4541A",
                padding: "3px 6px",
                borderRadius: 6,
                fontSize: 12
            }}>
                {d.tipo === "pratica" ? "Aula Prática" : "Aula Teórica"}
            </span>
        </div>
    );
}
