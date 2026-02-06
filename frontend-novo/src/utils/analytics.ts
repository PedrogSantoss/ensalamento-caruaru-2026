/**
 * Analytics utility para rastreamento de eventos e páginas
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const analytics = {
  // Rastrear visualizações de página
  pageView: (pagePath: string, pageTitle: string) => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  },

  // Rastrear eventos customizados
  event: (eventName: string, eventParams?: Record<string, any>) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  },

  // Rastrear cliques em disciplinas
  viewDisciplina: (disciplinaId: string, disciplinaNome: string) => {
    analytics.event('view_disciplina', {
      disciplina_id: disciplinaId,
      disciplina_nome: disciplinaNome,
    });
  },

  // Rastrear edições
  editDisciplina: (disciplinaId: string) => {
    analytics.event('edit_disciplina', {
      disciplina_id: disciplinaId,
    });
  },

  // Rastrear exportações de PDF
  exportPDF: (unidadeNome?: string) => {
    analytics.event('export_pdf', {
      unidade: unidadeNome,
    });
  },

  // Rastrear compartilhamentos
  shareLink: () => {
    analytics.event('share_link', {
      timestamp: new Date().toISOString(),
    });
  },

  // Rastrear buscas
  search: (searchTerm: string, resultsCount?: number) => {
    analytics.event('search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  },
};
