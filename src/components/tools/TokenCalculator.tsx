import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, Layers } from 'lucide-react';
import CustomModelSelect from '../ui/CustomModelSelect';

interface AIModel {
  id: string;
  name: string;
  provider: string;
  inputCostPerMillion: number;
  outputCostPerMillion: number;
  contextWindow: string;
  badge?: string;
}

const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    inputCostPerMillion: 0.15,
    outputCostPerMillion: 0.60,
    contextWindow: '128K',
    badge: 'Más Popular',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    inputCostPerMillion: 2.50,
    outputCostPerMillion: 10.00,
    contextWindow: '128K',
    badge: 'Multimodal',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    inputCostPerMillion: 3.00,
    outputCostPerMillion: 15.00,
    contextWindow: '200K',
    badge: 'Líder Código',
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    inputCostPerMillion: 0.80,
    outputCostPerMillion: 4.00,
    contextWindow: '200K',
  },
  {
    id: 'gemini-1-5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    inputCostPerMillion: 0.075,
    outputCostPerMillion: 0.30,
    contextWindow: '1M',
    badge: 'Ultra Económico',
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    inputCostPerMillion: 1.25,
    outputCostPerMillion: 5.00,
    contextWindow: '2M',
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    inputCostPerMillion: 0.14,
    outputCostPerMillion: 0.28,
    contextWindow: '64K',
    badge: 'Open Weights',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    inputCostPerMillion: 0.55,
    outputCostPerMillion: 2.19,
    contextWindow: '64K',
    badge: 'Razonamiento',
  },
];

export default function TokenCalculator() {
  const [selectedModelId, setSelectedModelId] = useState<string>('gpt-4o-mini');
  const [inputWords, setInputWords] = useState<number>(500);
  const [outputWords, setOutputWords] = useState<number>(300);
  const [requestsPerDay, setRequestsPerDay] = useState<number>(100);

  // Estimación estándar: 1 palabra ≈ 1.33 tokens
  const inputTokens = Math.round(inputWords * 1.33);
  const outputTokens = Math.round(outputWords * 1.33);
  const requestsPerMonth = requestsPerDay * 30;

  const currentModel = useMemo(() => {
    return AI_MODELS.find((m) => m.id === selectedModelId) || AI_MODELS[0];
  }, [selectedModelId]);

  const costPerRequest = useMemo(() => {
    const inCost = (inputTokens / 1_000_000) * currentModel.inputCostPerMillion;
    const outCost = (outputTokens / 1_000_000) * currentModel.outputCostPerMillion;
    return inCost + outCost;
  }, [inputTokens, outputTokens, currentModel]);

  const costPerMonth = costPerRequest * requestsPerMonth;

  const comparisons = useMemo(() => {
    return AI_MODELS.map((m) => {
      const inCost = (inputTokens / 1_000_000) * m.inputCostPerMillion;
      const outCost = (outputTokens / 1_000_000) * m.outputCostPerMillion;
      const single = inCost + outCost;
      const monthly = single * requestsPerMonth;
      return {
        ...m,
        singleCost: single,
        monthlyCost: monthly,
      };
    }).sort((a, b) => a.monthlyCost - b.monthlyCost);
  }, [inputTokens, outputTokens, requestsPerMonth]);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[2.5rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50 p-6 sm:p-10">
      
      {/* Header con estilo Neo-Editorial / Bento */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-xs font-extrabold uppercase tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            Utilidad Interactiva Gratuita
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            CALCULADORA DE TOKENS & COSTOS DE IA
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1.5">
            Proyecta en segundos el costo por llamada y la factura mensual para las APIs de OpenAI, Anthropic, Google y DeepSeek.
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-700">
          <Calculator className="w-5 h-5 text-slate-900 icon-bounce" />
          <span className="text-xs font-bold font-mono">1 palabra ≈ 1.33 tokens</span>
        </div>
      </div>

      {/* Selector Personalizado y Controles Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        
        {/* Selector Personalizado con Padding y Diseño Bento */}
        <div className="space-y-1">
          <CustomModelSelect
            models={AI_MODELS}
            selectedId={selectedModelId}
            onSelect={setSelectedModelId}
            label="Modelo de Inteligencia Artificial"
          />
          <div className="flex justify-between items-center text-xs text-slate-500 pt-2 px-1">
            <span>Contexto: <strong className="text-slate-900">{currentModel.contextWindow}</strong></span>
            {currentModel.badge && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#ede9fe] text-[#6b21a8]">
                {currentModel.badge}
              </span>
            )}
          </div>
        </div>

        {/* Input Words */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-black uppercase tracking-wider text-slate-700">Prompt / Entrada</span>
            <span className="text-emerald-700 font-mono font-bold bg-[#dcfce7] px-2 py-0.5 rounded-md">
              {inputWords} palabras (~{inputTokens} tokens)
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="15000"
            step="50"
            value={inputWords}
            onChange={(e) => setInputWords(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>50 palabras</span>
            <span>15,000 palabras</span>
          </div>
        </div>

        {/* Output Words */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-black uppercase tracking-wider text-slate-700">Respuesta / Salida</span>
            <span className="text-purple-700 font-mono font-bold bg-[#f3e8ff] px-2 py-0.5 rounded-md">
              {outputWords} palabras (~{outputTokens} tokens)
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="4000"
            step="20"
            value={outputWords}
            onChange={(e) => setOutputWords(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>20 palabras</span>
            <span>4,000 palabras</span>
          </div>
        </div>

      </div>

      {/* Control de Volumen Mensual */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Volumen diario proyectado</h4>
            <p className="text-xs text-slate-500">
              Calculando sobre {requestsPerDay} peticiones/día ({requestsPerMonth.toLocaleString()} llamadas al mes).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[20, 100, 500, 2000].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setRequestsPerDay(num)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                requestsPerDay === num
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {num}/día
            </button>
          ))}
        </div>
      </div>

      {/* Tarjetas de Resultados Sólidas (Sin degradados) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
        
        {/* Costo por Petición */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Costo por Petición</span>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
              ${costPerRequest < 0.0001 ? '<$0.0001' : costPerRequest.toFixed(4)}
            </span>
            <span className="text-xs font-bold text-slate-400">USD</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Prompt: ${( (inputTokens / 1_000_000) * currentModel.inputCostPerMillion ).toFixed(5)} + Salida: ${( (outputTokens / 1_000_000) * currentModel.outputCostPerMillion ).toFixed(5)}
          </p>
        </div>

        {/* Costo Mensual - Tarjeta Sólida Verde Pastel */}
        <div className="p-6 rounded-2xl bg-[#dcfce7] border border-[#bbf7d0]">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-[#15803d] uppercase tracking-wider">Costo Mensual Estimado</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white text-[#15803d] shadow-sm">
              30 DÍAS
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-black text-[#14532d] font-mono">
              ${costPerMonth.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-[#15803d]">USD/mes</span>
          </div>
          <p className="text-[11px] text-[#166534] mt-2 font-medium">
            Proyección para {requestsPerMonth.toLocaleString()} llamadas con {currentModel.name}.
          </p>
        </div>

        {/* Tokens Totales */}
        <div className="p-6 rounded-2xl bg-[#f3e8ff] border border-[#e9d5ff] sm:col-span-2 lg:col-span-1">
          <span className="text-xs font-black text-[#6b21a8] uppercase tracking-wider">Tokens Totales / Llamada</span>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-black text-[#581c87] font-mono">
              {(inputTokens + outputTokens).toLocaleString()}
            </span>
            <span className="text-xs font-bold text-[#7e22ce]">tokens</span>
          </div>
          <div className="w-full bg-white h-2.5 rounded-full mt-3 overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full"
              style={{ width: `${(inputTokens / (inputTokens + outputTokens)) * 100}%` }}
              title={`Prompt: ${inputTokens} tokens`}
            />
            <div
              className="bg-purple-600 h-full"
              style={{ width: `${(outputTokens / (inputTokens + outputTokens)) * 100}%` }}
              title={`Salida: ${outputTokens} tokens`}
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-[#6b21a8] mt-1.5 font-mono">
            <span>In: {inputTokens}</span>
            <span>Out: {outputTokens}</span>
          </div>
        </div>

      </div>

      {/* Tabla Comparativa de Todos los Modelos */}
      <div className="mt-6 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
            Comparativa de Costo Mensual ({requestsPerMonth.toLocaleString()} peticiones)
          </h3>
          <span className="text-xs font-medium text-slate-500">De menor a mayor costo</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="text-xs uppercase bg-slate-50 text-slate-600 border-b border-slate-200 font-black">
              <tr>
                <th scope="col" className="px-5 py-3.5">Modelo</th>
                <th scope="col" className="px-5 py-3.5">Proveedor</th>
                <th scope="col" className="px-5 py-3.5 text-right">Por Llamada</th>
                <th scope="col" className="px-5 py-3.5 text-right">Costo Mes</th>
                <th scope="col" className="px-5 py-3.5 text-center">Seleccionar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-xs">
              {comparisons.map((model) => {
                const isSelected = model.id === selectedModelId;
                return (
                  <tr
                    key={model.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-slate-100/90 font-bold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-5 py-3.5 flex items-center gap-2 font-sans font-bold text-slate-900">
                      <span>{model.name}</span>
                      {model.badge && (
                        <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                          {model.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-sans font-medium text-slate-500">{model.provider}</td>
                    <td className="px-5 py-3.5 text-right text-slate-700">
                      ${model.singleCost < 0.0001 ? '<$0.0001' : model.singleCost.toFixed(4)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-slate-900">
                      ${model.monthlyCost.toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedModelId(model.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-sans font-extrabold transition-all ${
                          isSelected
                            ? 'bg-black text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? 'Activo' : 'Elegir'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
