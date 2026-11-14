import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export interface CommandTab {
  label: string; // e.g. "Windows (winget)", "macOS (brew)", "Linux", "Docker"
  command: string;
  language?: string;
}

interface CodeTerminalProps {
  tabs: CommandTab[];
  title?: string;
  className?: string;
}

export default function CodeTerminal({ tabs, title = 'Terminal', className = '' }: CodeTerminalProps) {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const currentTab = tabs[activeTabIdx] || tabs[0];

  const handleCopy = () => {
    if (!currentTab) return;
    navigator.clipboard.writeText(currentTab.command);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2200);
  };

  return (
    <div className={`w-full rounded-2xl border border-slate-800 bg-[#0c1017] text-slate-200 overflow-hidden shadow-xl font-mono ${className}`}>
      
      {/* Barra Superior de la Terminal */}
      <div className="px-4 py-3 bg-[#161b22] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 select-none">
        
        {/* Controles estilo macOS y Título */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-sans font-bold">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span>{title}</span>
          </div>
        </div>

        {/* Pestañas de Sistemas Operativos / Gestores */}
        <div className="flex items-center gap-1 bg-[#0c1017] p-1 rounded-xl border border-slate-800">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTabIdx(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-sans font-bold transition-all ${
                activeTabIdx === idx
                  ? 'bg-slate-200 text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Botón de Copiar con Icono y Micro-Animación (Sin Alert!) */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar comando"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all duration-200 ${
            copied
              ? 'bg-[#15803d] text-white shadow-sm scale-105'
              : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 active:scale-95'
          }`}
          title="Copiar al portapapeles"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white animate-bounce" style={{ animationIterationCount: 2 }} />
              <span className="text-[11px]">¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-300 transition-transform group-hover:scale-110" />
              <span className="text-[11px]">Copiar</span>
            </>
          )}
        </button>

      </div>

      {/* Cuerpo de la Terminal con Comandos Bien Centrados y Espaciados */}
      <div className="p-5 sm:p-6 overflow-x-auto text-xs sm:text-sm leading-relaxed text-emerald-400">
        <pre className="font-mono m-0 whitespace-pre">
          {currentTab.command.split('\n').map((line, i) => {
            const isComment = line.trim().startsWith('#');
            return (
              <div key={i} className="table-row">
                <span className="table-cell pr-4 select-none text-slate-600 text-right font-mono text-xs">
                  {i + 1}
                </span>
                <span className={`table-cell ${isComment ? 'text-slate-500 italic' : 'text-slate-200'}`}>
                  {!isComment && line.trim().length > 0 && (
                    <span className="text-emerald-400 select-none mr-2 font-bold">$</span>
                  )}
                  {line}
                </span>
              </div>
            );
          })}
        </pre>
      </div>

    </div>
  );
}
