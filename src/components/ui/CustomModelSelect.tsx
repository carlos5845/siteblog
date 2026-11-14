import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, ChevronRight, Search } from 'lucide-react';

export interface SelectableModel {
  id: string;
  name: string;
  provider: string;
  inputCostPerMillion?: number;
  outputCostPerMillion?: number;
  contextWindow?: string | number;
  contextDisplay?: string;
  badge?: string;
}

interface CustomModelSelectProps {
  models: SelectableModel[];
  selectedId: string;
  onSelect: (id: string) => void;
  label?: string;
  className?: string;
}

export default function CustomModelSelect({
  models,
  selectedId,
  onSelect,
  label = 'Modelo de Inteligencia Artificial',
  className = '',
}: CustomModelSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedModel = models.find((m) => m.id === selectedId) || models[0];

  // Cerrar al hacer clic fuera o presionar escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Autofocus en el input de búsqueda al abrir
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  // Modelos filtrados
  const filteredModels = useMemo(() => {
    if (!searchTerm.trim()) return models;
    const q = searchTerm.toLowerCase();
    return models.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        (m.badge && m.badge.toLowerCase().includes(q))
    );
  }, [models, searchTerm]);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
          {label}
        </label>
      )}

      {/* Botón Disparador con Padding Generoso y Bordes Redondeados */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-xs hover:border-slate-300 hover:bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all cursor-pointer group text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3.5 min-w-0 pr-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-slate-900 truncate">
                {selectedModel.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                {selectedModel.contextDisplay || selectedModel.contextWindow || 'Medium'}
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 block truncate mt-0.5">
              {selectedModel.provider} {selectedModel.inputCostPerMillion !== undefined ? `• $${selectedModel.inputCostPerMillion}/M in` : ''}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {selectedModel.badge && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#fef9c3] text-[#854d0e] border border-[#fef08a] hidden sm:inline-block">
              {selectedModel.badge}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-black' : 'group-hover:text-slate-600'
            }`}
          />
        </div>
      </button>

      {/* Menú Desplegable Personalizado estilo Imagen de Referencia */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden py-2 max-h-[360px] flex flex-col animate-in fade-in slide-in-from-top-1 duration-150">
          
          {/* Barra de búsqueda rápida integrada */}
          {models.length > 5 && (
            <div className="px-3 pt-1 pb-2 border-b border-slate-100">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar modelo o proveedor..."
                  className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          )}

          {/* Encabezado sutil */}
          <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
            <span>Modelo & Proveedor</span>
            <span>Tarifa / Contexto</span>
          </div>

          {/* Lista de Modelos con Padding Generoso */}
          <div className="p-1.5 space-y-1 overflow-y-auto max-h-[280px]">
            {filteredModels.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-slate-400">
                No se encontraron modelos con "{searchTerm}"
              </div>
            ) : (
              filteredModels.map((model) => {
                const isSelected = model.id === selectedId;
                return (
                  <div
                    key={model.id}
                    onClick={() => {
                      onSelect(model.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-100 text-black font-bold'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm truncate ${isSelected ? 'font-black text-slate-900' : 'font-bold text-slate-800'}`}>
                            {model.name}
                          </span>
                          <span className="text-xs font-normal text-slate-500">
                            {model.contextDisplay || model.contextWindow || 'Medium'}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {model.provider}
                          </span>
                          {model.badge && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d]">
                              {model.badge}
                            </span>
                          )}
                        </div>
                        
                        <div className="text-[11px] text-slate-500 font-medium font-mono mt-0.5">
                          {model.inputCostPerMillion !== undefined && (
                            <span>In: ${model.inputCostPerMillion}/M • Out: ${model.outputCostPerMillion}/M</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}
    </div>
  );
}
