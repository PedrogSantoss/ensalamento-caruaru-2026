import express from "express";
import cors from "cors";
import morgan from "morgan";
import { v4 as uuid } from "uuid";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const tokens = new Map();

let avisos = [
  {
    id: "1",
    titulo: "Bem-vindo ao semestre",
    conteudo: "Início das aulas 26.1",
    tipo: "geral",
    importante: true,
    data: new Date().toISOString(),
    unidade_id: null
  }
];

let disciplinas = [
  {
    id: 101,
    nome: "Cálculo I",
    periodo: "ALL",
    dia: "SEGUNDA",
    horario_inicio: "19:00",
    horario_fim: "22:00",
    sala: "Sala 101",
    tutor: "Prof. A",
    tipo: "teorica",
    unidade_id: 1,
    sem_aula: false
  },
  {
    id: 102,
    nome: "Laboratório de Física",
    periodo: "ALL",
    dia: "TERÇA",
    horario_inicio: "19:00",
    horario_fim: "22:00",
    sala: "Lab 2",
    tutor: "Prof. B",
    tipo: "pratica",
    unidade_id: 1,
    sem_aula: false
  }
];

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.post("/api/auth/login", (req, res) => {
  const { senha } = req.body || {};
  const role = senha === "admin123" ? "admin" : "student";
  const token = uuid();
  tokens.set(token, { role });
  res.json({ token, role });
});

app.get("/api/auth/me", (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token || !tokens.has(token)) return res.status(401).json({ error: "unauthorized" });
  const data = tokens.get(token);
  res.json({ role: data.role });
});

app.get("/api/avisos", (req, res) => {
  const unidade_id = req.query.unidade_id ? Number(req.query.unidade_id) : undefined;
  const data = avisos.filter(
    a => a.unidade_id === null || (unidade_id && a.unidade_id === unidade_id)
  );
  res.json(data);
});

app.post("/api/avisos", (req, res) => {
  const body = req.body || {};
  const novo = {
    id: uuid(),
    titulo: body.titulo ?? "",
    conteudo: body.conteudo ?? "",
    tipo: body.tipo ?? "geral",
    importante: !!body.importante,
    data: new Date().toISOString(),
    unidade_id: body.unidade_id ?? null
  };
  avisos.push(novo);
  res.status(201).json(novo);
});

app.put("/api/avisos/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body || {};
  let updated;
  avisos = avisos.map(a => {
    if (a.id === id) {
      updated = { ...a, ...body, id };
      return updated;
    }
    return a;
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

app.delete("/api/avisos/:id", (req, res) => {
  const { id } = req.params;
  const before = avisos.length;
  avisos = avisos.filter(a => a.id !== id);
  if (avisos.length === before) return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

app.get("/api/disciplinas", (req, res) => {
  const periodo = req.query.periodo;
  const unidade_id = req.query.unidade_id ? Number(req.query.unidade_id) : undefined;
  const data = disciplinas.filter(
    d =>
      (periodo ? d.periodo === periodo || periodo === "ALL" : true) &&
      (unidade_id ? d.unidade_id === unidade_id : true)
  );
  res.json(data);
});

app.put("/api/disciplinas/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body || {};
  const nid = Number(id);
  let updated;
  disciplinas = disciplinas.map(d => {
    if (d.id === nid) {
      updated = { ...d, ...body, id: nid };
      return updated;
    }
    return d;
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
