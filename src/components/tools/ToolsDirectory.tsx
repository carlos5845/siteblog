import React, { useState, useMemo, useEffect } from 'react';
import type { SoftwareTool } from '../../data/tools';
import { Search, X, Sparkles, Filter, ExternalLink, ArrowRight, Star } from 'lucide-react';

interface ToolsDirectoryProps {
  initialTools: SoftwareTool[];
  categories: string[];
}

export default function ToolsDirectory({
  initialTools,
  categories,
}: ToolsDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sincronización inicial con URL query param (?categoria=ia)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('categoria');
      if (catParam) {
        const found = categories.find(
          (c) => c.toLowerCase() === catParam.toLowerCase()
        );
        if (found) {
          setSelectedCategory(found);
        }
      }
    }
  }, [categories]);

  // Manejar cambio de categoría y actualizar URL sin recargar
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (category === 'Todos') {
        url.searchParams.delete('categoria');
      } else {
        url.searchParams.set('categoria', category.toLowerCase());
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Contadores por categoría
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: initialTools.length };
    categories.forEach((cat) => {
      if (cat !== 'Todos') {
        counts[cat] = initialTools.filter(
          (t) => t.category.toLowerCase() === cat.toLowerCase()
        ).length;
      }
    });
    return counts;
  }, [initialTools, categories]);

  // Filtrado reactivo de herramientas
  const filteredTools = useMemo(() => {
    return initialTools.filter((tool) => {
      // Filtro por categoría
      const matchesCategory =
        selectedCategory === 'Todos' ||
        tool.category.toLowerCase() === selectedCategory.toLowerCase();

      // Filtro por texto de búsqueda
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q)) ||
        tool.pricingType.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialTools, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      
      {/* Controles: Botones de Píldoras de Categoría + Buscador */}
      <div className="flex flex-col items-center gap-6 mb-10">
        
        {/* Píldoras de Filtro con Estados Activos Nítidos */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            const count = categoryCounts[cat] ?? 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white shadow-md shadow-slate-900/10 scale-105'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Barra de Búsqueda Rápida de Herramientas */}
        <div className="w-full max-w-md relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, tags (Docker, LLM...) o licencia..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs font-medium placeholder:text-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              title="Borrar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Resumen de Resultados */}
        <div className="text-xs font-semibold text-slate-500">
          Mostrando <span className="font-bold text-slate-900">{filteredTools.length}</span> de {initialTools.length} herramientas disponibles
          {selectedCategory !== 'Todos' && (
            <span> en categoría <strong className="text-slate-900">"{selectedCategory}"</strong></span>
          )}
          {searchQuery && (
            <span> coincidiendo con <strong className="text-slate-900">"{searchQuery}"</strong></span>
          )}
        </div>

      </div>

      {/* Grid de Tarjetas Bento de Herramientas */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          {filteredTools.map((tool) => (
            <div
              key={tool.slug}
              className="rounded-3xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${tool.tagBg}`}
                  >
                    {tool.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {tool.rating}
                  </span>
                </div>

                <a href={`/herramientas/${tool.slug}`} className="block">
                  <h3 className="text-xl font-black text-slate-900 uppercase group-hover:text-emerald-600 transition-colors">
                    {tool.name}
                  </h3>
                </a>

                <p className="text-xs text-slate-500 font-medium mt-2.5 line-clamp-3 leading-relaxed">
                  {tool.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-slate-700">
                  {tool.pricingType}
                </span>
                
                <div className="flex items-center gap-2">
                  <a
                    href={`/herramientas/${tool.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    Ficha <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-xs hover:bg-black hover:text-white transition-colors"
                    title="Visitar web oficial"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 my-10 max-w-lg mx-auto">
          <Filter className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-black text-slate-900 uppercase">
            No se encontraron herramientas
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1 mb-6">
            No hay resultados que coincidan con la categoría "{selectedCategory}" o el término de búsqueda actual.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('Todos');
              setSearchQuery('');
              if (typeof window !== 'undefined') {
                const url = new URL(window.location.href);
                url.searchParams.delete('categoria');
                window.history.replaceState({}, '', url.toString());
              }
            }}
            className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wide hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Restablecer Filtros
          </button>
        </div>
      )}

    </div>
  );
}