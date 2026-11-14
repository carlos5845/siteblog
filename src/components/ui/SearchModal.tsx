import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Layers, GitCompare, Wrench, Sparkles } from 'lucide-react';
import { GUIDES_DATA } from '../../data/guides';
import { TOOLS_DATA } from '../../data/tools';
import { COMPARISONS_DATA } from '../../data/comparisons';

interface SearchResult {
  title: string;
  category: 'Guía' | 'Herramienta' | 'Comparativa' | 'Utilidad';
  url: string;
  description: string;
}

const STATIC_SEARCH_ITEMS: SearchResult[] = [
  {
    title: 'Calculadora de Tokens & Costos de IA',
    category: 'Utilidad',
    url: '/utilidades/calculadora-tokens-ia',
    description: 'Calcula el gasto por llamada y mensual para OpenAI, Claude, Gemini y DeepSeek.',
  },
  {
    title: 'Generador & Optimizador de Prompts (CRISPE, CoT)',
    category: 'Utilidad',
    url: '/utilidades/optimizador-prompts-ia',
    description: 'Crea prompts estructurados con delimitadores XML y cero alucinaciones.',
  },
  {
    title: 'Especialidad en Inteligencia Artificial',
    category: 'Guía',
    url: '/ia',
    description: 'Hub de modelos LLM, agentes autónomos y herramientas generativas.',
  },
  {
    title: 'Especialidad en Automatización & n8n',
    category: 'Guía',
    url: '/automatizacion',
    description: 'Workflows con n8n, Make, Zapier y APIs para conectar servicios.',
  },
  {
    title: 'Especialidad en Productividad Digital',
    category: 'Guía',
    url: '/productividad',
    description: 'Sistemas de organización, Notion, Cursor y metodologías de trabajo.',
  },
  {
    title: 'Zona de Recursos & Plantillas Descargables',
    category: 'Utilidad',
    url: '/recursos',
    description: 'Workflows listos para importar en n8n y cheatsheets de LLMs.',
  },
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Compilar todos los elementos indexables
  const allItems: SearchResult[] = [
    ...STATIC_SEARCH_ITEMS,
    ...GUIDES_DATA.map((g) => ({
      title: g.title,
      category: 'Guía' as const,
      url: `/guias/${g.slug}`,
      description: g.description,
    })),
    ...TOOLS_DATA.map((t) => ({
      title: `${t.name} (${t.category})`,
      category: 'Herramienta' as const,
      url: `/herramientas/${t.slug}`,
      description: t.tagline,
    })),
    ...COMPARISONS_DATA.map((c) => ({
      title: c.title,
      category: 'Comparativa' as const,
      url: `/comparativas/${c.slug}`,
      description: c.summary,
    })),
  ];

  // Filtrado reactivo en tiempo real
  const results = query.trim() === ''
    ? allItems.slice(0, 6) // Mostrar los más relevantes inicialmente
    : allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  // Escuchar atajo global Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Foco automático en el input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Guía':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'Herramienta':
        return <Layers className="w-4 h-4 text-blue-600" />;
      case 'Comparativa':
        return <GitCompare className="w-4 h-4 text-purple-600" />;
      case 'Utilidad':
        return <Wrench className="w-4 h-4 text-amber-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-500" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Guía':
        return 'bg-[#dcfce7] text-[#15803d]';
      case 'Herramienta':
        return 'bg-[#bae6fd] text-[#0369a1]';
      case 'Comparativa':
        return 'bg-[#ede9fe] text-[#6b21a8]';
      case 'Utilidad':
        return 'bg-[#fef9c3] text-[#854d0e]';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <>
      {/* Botón Disparador en el Header */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-600 hover:text-black hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
        title="Buscar (Ctrl + K)"
        aria-label="Abrir buscador"
      >
        <Search className="w-4 h-4 text-slate-700" />
        <span className="hidden xl:inline text-xs font-semibold text-slate-500">Buscar...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-500 border border-slate-200">
          ⌘K
        </kbd>
      </button>

      {/* Modal Overlay estilo Spotlight / Raycast */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          
          {/* Backdrop click to close */}
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />

          {/* Caja del Buscador */}
          <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 font-sans">
            
            {/* Input de Búsqueda */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca guías, herramientas, comparativas o utilidades..."
                className="w-full text-sm font-semibold text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ESC
              </button>
            </div>

            {/* Lista de Resultados */}
            <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
              {results.length > 0 ? (
                results.map((item) => (
                  <a
                    key={item.url + item.title}
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                    className="flex items-start justify-between gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0 mt-0.5">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-black">
                            {item.title}
                          </h4>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${getCategoryBadge(item.category)}`}>
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                  </a>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <p className="text-sm font-bold">No se encontraron resultados para "{query}"</p>
                  <p className="text-xs mt-1">Prueba con palabras clave como: Ollama, n8n, Claude, Cursor, Tokens...</p>
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
              <div className="flex items-center gap-3">
                <span>Navegar con <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↑</kbd> <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↓</kbd></span>
                <span>Seleccionar con <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↵</kbd></span>
              </div>
              <span>DigitalStack Search</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
