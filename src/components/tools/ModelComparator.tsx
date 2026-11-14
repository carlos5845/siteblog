import React, { useState, useMemo } from 'react';
import { ALL_AI_MODELS, type AIModel } from '../../data/models';
import { Sparkles, Trophy, Cpu, Zap, DollarSign, ArrowRight, Check, X } from 'lucide-react';
import CustomModelSelect from '../ui/CustomModelSelect';

export default function ModelComparator() {
  const [modelAId, setModelAId] = useState<string>('claude-3-5-sonnet');
  const [modelBId, setModelBId] = useState<string>('gpt-4o');
  const [providerFilter, setProviderFilter] = useState<string>('Todos');

  const modelA = useMemo(() => {
    return ALL_AI_MODELS.find((m) => m.id === modelAId) || ALL_AI_MODELS[0];
  }, [modelAId]);

  const modelB = useMemo(() => {
    return ALL_AI_MODELS.find((m) => m.id === modelBId) || ALL_AI_MODELS[1];
  }, [modelBId]);

  const filteredModels = useMemo(() => {
    if (providerFilter === 'Todos') return ALL_AI_MODELS;
    return ALL_AI_MODELS.filter((m) => m.provider === providerFilter);
  }, [providerFilter]);

  const providers = ['Todos', 'OpenAI', 'Anthropic', 'Google', 'DeepSeek', 'Meta'];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      
      {/* Panel Superior: Selector Frente a Frente */}
      <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="px-3.5 py-1 rounded-full bg-[#fef08a] text-[#854d0e] text-xs font-black uppercase tracking-wider">
            Matriz Interactiva de IA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-2">
            Compara Cualquier Modelo Frente a Frente
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Selecciona dos modelos para evaluar especificaciones técnicas, costos por millón de tokens y benchmarks.
          </p>
        </div>

        {/* Controles de Selección Personalizados con Padding y Diseño Limpio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-100">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <CustomModelSelect
              models={ALL_AI_MODELS}
              selectedId={modelAId}
              onSelect={setModelAId}
              label="Primer Modelo (Opción A)"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <CustomModelSelect
              models={ALL_AI_MODELS}
              selectedId={modelBId}
              onSelect={setModelBId}
              label="Segundo Modelo (Opción B)"
            />
          </div>

        </div>

        {/* Tarjetas Comparativas Lado a Lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          
          {/* Card Modelo A */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm relative">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${modelA.pillBg}`}>
                  {modelA.provider}
                </span>
                <span className="text-xs font-bold font-mono text-slate-500">
                  {modelA.type}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                {modelA.name}
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-1">
                {modelA.specialty}
              </p>

              {/* Métricas clave */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400">Contexto</span>
                  <div className="text-xl font-black text-slate-900 font-mono mt-0.5">{modelA.contextDisplay}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400">Costo Entrada/Salida</span>
                  <div className="text-xs font-black text-slate-900 font-mono mt-1">
                    ${modelA.inputCostPerMillion} / ${modelA.outputCostPerMillion} <span className="text-[9px] text-slate-400">/1M</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400">Benchmark Código</span>
                  <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">{modelA.benchmarkCoding}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400">Razonamiento MMLU</span>
                  <div className="text-xl font-black text-indigo-700 font-mono mt-0.5">{modelA.benchmarkMMLU}%</div>
                </div>
              </div>

              {/* Fortalezas */}
              <div className="mt-6 space-y-2">
                <span className="text-[11px] font-black uppercase text-slate-700 block">Ventajas Clave:</span>
                {modelA.strengths.map((str) => (
                  <div key={str} className="flex items-start gap-2 text-xs font-medium text-slate-600">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Modelo B */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm relative">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${modelB.pillBg}`}>
                  {modelB.provider}
                </span>
                <span className="text-xs font-bold font-mono text-slate-500">
                  {modelB.type}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                {modelB.name}
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-1">
                {modelB.specialty}
              </p>

              {/* Métricas clave */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400">Contexto</span>
                  <div className="text-xl font-black text-slate-900 font-mono mt-0.5">{modelB.contextDisplay}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400">Costo Entrada/Salida</span>
                  <div className="text-xs font-black text-slate-900 font-mono mt-1">
                    ${modelB.inputCostPerMillion} / ${modelB.outputCostPerMillion} <span className="text-[9px] text-slate-400">/1M</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400">Benchmark Código</span>
                  <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">{modelB.benchmarkCoding}%</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400">Razonamiento MMLU</span>
                  <div className="text-xl font-black text-indigo-700 font-mono mt-0.5">{modelB.benchmarkMMLU}%</div>
                </div>
              </div>

              {/* Fortalezas */}
              <div className="mt-6 space-y-2">
                <span className="text-[11px] font-black uppercase text-slate-700 block">Ventajas Clave:</span>
                {modelB.strengths.map((str) => (
                  <div key={str} className="flex items-start gap-2 text-xs font-medium text-slate-600">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Resumen del Veredicto Comparativo */}
        <div className="mt-8 p-6 rounded-2xl bg-[#dcfce7] border border-[#bbf7d0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#15803d]">Veredicto Directo</span>
            <p className="text-sm font-bold text-slate-900 mt-1">
              ¿Cuál elegir? Elige <strong>{modelA.name}</strong> para {modelA.specialty.toLowerCase()}, o elige <strong>{modelB.name}</strong> si tu prioridad es {modelB.specialty.toLowerCase()}.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-black text-slate-700 bg-white px-3 py-1.5 rounded-full shadow-sm">
              {modelA.inputCostPerMillion < modelB.inputCostPerMillion ? `${modelA.name} es más económico` : `${modelB.name} es más económico`}
            </span>
          </div>
        </div>

      </div>

      {/* Tabla Global con TODOS los Modelos */}
      <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              Tabla Completa de Modelos de Inteligencia Artificial
            </h3>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              Todos los modelos evaluados en especificaciones técnicas, benchmarks y costos unitarios.
            </p>
          </div>

          {/* Filtro por Proveedor */}
          <div className="flex flex-wrap items-center gap-1.5">
            {providers.map((prov) => (
              <button
                key={prov}
                type="button"
                onClick={() => setProviderFilter(prov)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  providerFilter === prov
                    ? 'bg-black text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {prov}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-900 text-xs uppercase font-black border-b border-slate-200">
              <tr>
                <th className="px-5 py-4">Modelo</th>
                <th className="px-5 py-4">Proveedor</th>
                <th className="px-5 py-4">Tipo</th>
                <th className="px-5 py-4">Contexto</th>
                <th className="px-5 py-4 text-right">In / 1M</th>
                <th className="px-5 py-4 text-right">Out / 1M</th>
                <th className="px-5 py-4 text-center">Código</th>
                <th className="px-5 py-4 text-center">MMLU</th>
                <th className="px-5 py-4 text-center">Comparar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-xs">
              {filteredModels.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-sans font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span>{m.name}</span>
                      {m.badge && (
                        <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold hidden sm:inline-block">
                          {m.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-sans text-slate-600">{m.provider}</td>
                  <td className="px-5 py-4 font-sans">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      m.type === 'Open-Weights' ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-900">{m.contextDisplay}</td>
                  <td className="px-5 py-4 text-right text-slate-700">${m.inputCostPerMillion}</td>
                  <td className="px-5 py-4 text-right font-bold text-slate-900">${m.outputCostPerMillion}</td>
                  <td className="px-5 py-4 text-center font-bold text-emerald-700">{m.benchmarkCoding}%</td>
                  <td className="px-5 py-4 text-center font-bold text-indigo-700">{m.benchmarkMMLU}%</td>
                  <td className="px-5 py-4 text-center font-sans">
                    <button
                      type="button"
                      onClick={() => {
                        setModelAId(m.id);
                        window.scrollTo({ top: 100, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-slate-100 hover:bg-black hover:text-white transition-colors"
                    >
                      Elegir en A
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
