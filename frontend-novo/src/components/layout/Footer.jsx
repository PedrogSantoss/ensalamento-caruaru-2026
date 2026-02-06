import React from "react";
import { Phone, MapPin, Calendar } from "lucide-react";

export default function Footer({ unidade }) {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>
          <h3 className="font-bold mb-2">{unidade?.nome || 'Anhanguera Caruaru'}</h3>

          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <div>
              <strong>Endereço:</strong>
              <div><span role="img" aria-label="endereço" className="mr-2">📍</span>{unidade?.endereco || '—'}</div>
            </div>

            <div className="mt-2">
              <strong>Atendimento Secretária</strong>
              <div><span role="img" aria-label="telefone" className="mr-2">📞</span>Secretaria: (81) 92004-9659</div>
              <div><span role="img" aria-label="telefone" className="mr-2">📞</span>CRA: 3003-4030</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2">Agendamentos</h3>

          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <a href="#" className="block hover:text-orange-600 transition-colors"><span role="img" aria-label="agendar" className="mr-2">📅</span>Agendar com a Direção</a>
            <a href="#" className="block hover:text-orange-600 transition-colors"><span role="img" aria-label="agendar" className="mr-2">📅</span>Agendar com a Coordenação</a>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2">Setor de Estágio</h3>

          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <a href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_MjRmOTg0MWMtMWRjNC00MzU3LTk0ZGItNDc4NmQ1ZDE3YTc5%40thread.v2/0?context=%7b%22Tid%22%3a%22a50e7b76-8ea5-492c-bf17-97d652fc3ce9%22%2c%22Oid%22%3a%2276079095-1c24-48b5-8ebc-8bad707c5375%22%7d" target="_blank" rel="noopener noreferrer" className="block hover:text-orange-600 transition-colors"><span role="img" aria-label="estagio" className="mr-2">🎓</span>Reunião de Estágio (todo Sábado) — Acessar reunião</a>
            <a href="mailto:estagioanhangueracaruaru@gmail.com" className="block hover:text-orange-600 transition-colors"><span role="img" aria-label="email" className="mr-2">✉️</span>estagioanhangueracaruaru@gmail.com</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
