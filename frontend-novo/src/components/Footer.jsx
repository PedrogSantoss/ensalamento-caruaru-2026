import React from "react";
import { MapPin, Phone, Calendar, Mail, Instagram } from "lucide-react";

export default function Footer({ unidade }) {
  return (
    <footer className="mt-12 bg-slate-50 dark:bg-[#0d1b2a] border-t border-slate-200 dark:border-white/10 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

        <div className="space-y-3">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">{unidade?.nome || 'Anhanguera Caruaru'}</h3>

          <div className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
            <h4 className="font-semibold">Endereço:</h4>
            <p className="flex items-center gap-2"><MapPin size={16} className="text-orange-500" />{unidade?.endereco || '—'}</p>

            <h4 className="font-semibold mt-2">Atendimento Secretária:</h4>
            <p className="flex items-center gap-2"><Phone size={16} className="text-orange-500" />Secretaria: (81) 92004-9659</p>
            <p className="flex items-center gap-2"><Phone size={16} className="text-orange-500" />CRA: 3003-4030</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Agendamentos</h3>

          <div className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
            <a href="https://minhaagendavirtual.com.br/agendamentos/novo/anhanguera-caruaru?fbclid=PAdGRleAPvUD1leHRuA2FlbQIxMQABpt-XymYj9nszStj1c7FZ-WSAUgxyv1yVoCFXJtDIG2-LIuk6PEbnh9xvpw_aem_QZxefN4jeW750_-Snva1pw&utm_source=ig&utm_medium=social&utm_content=link_in_bio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-orange-500 transition-colors group">
              <div className="bg-slate-200 dark:bg-white/5 p-2 rounded-lg group-hover:bg-orange-500/10 transition-colors">
                <Calendar className="text-orange-500" size={18} />
              </div>
              <span>Agendar com a Direção</span>
            </a>

            <a href="https://minhaagendavirtual.com.br/agendamentos/novo/anhanguera-caruaru?fbclid=PAdGRleAPvUD1leHRuA2FlbQIxMQABpt-XymYj9nszStj1c7FZ-WSAUgxyv1yVoCFXJtDIG2-LIuk6PEbnh9xvpw_aem_QZxefN4jeW750_-Snva1pw&utm_source=ig&utm_medium=social&utm_content=link_in_bio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-orange-500 transition-colors group">
              <div className="bg-slate-200 dark:bg-white/5 p-2 rounded-lg group-hover:bg-orange-500/10 transition-colors">
                 <Calendar className="text-orange-500" size={18} />
              </div>
              <span>Agendar com a Coordenação</span>
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Setor de Estágio</h3>

          <div className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
            <a href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_MjRmOTg0MWMtMWRjNC00MzU3LTk0ZGItNDc4NmQ1ZDE3YTc5%40thread.v2/0?context=%7b%22Tid%22%3a%22a50e7b76-8ea5-492c-bf17-97d652fc3ce9%22%2c%22Oid%22%3a%2276079095-1c24-48b5-8ebc-8bad707c5375%22%7d" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <Calendar size={16} className="text-orange-500" />
              <span>Reunião de Estágio (todo Sábado) — Acessar reunião</span>
            </a>
            <a href="mailto:estagioanhangueracaruaru@gmail.com" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <Mail size={16} className="text-orange-500" />
              <span>estagioanhangueracaruaru@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white">Nossas redes sociais:</h3>
          <div className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
            <a href="https://www.instagram.com/pos_anhangueracaruaru" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <Instagram size={16} className="text-orange-500" />
              <span>Pós-Graduação: @pos_anhangueracaruaru</span>
            </a>
            <a href="https://www.instagram.com/anhanguera_caruaru" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <Instagram size={16} className="text-orange-500" />
              <span>Graduação: @anhanguera_caruaru</span>
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-200 dark:border-white/5 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} {unidade?.nome || 'Anhanguera Caruaru'}. Todos os direitos reservados — Programador Pedro Santos.
      </div>
    </footer>
  );
}
