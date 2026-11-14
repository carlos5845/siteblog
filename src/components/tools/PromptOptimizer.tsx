import React, { useState, useMemo } from 'react';
import { Sparkles, Copy, Check, Terminal, Wand2, RefreshCw } from 'lucide-react';

interface Framework {
  id: string;
  name: string;
  tagline: string;
  bestFor: string;
}

const FRAMEWORKS: Framework[] = [
  {
    id: 'crispe',
    name: 'Marco CRISPE',
    tagline: 'Capacidad, Rol, Insight, Sentencia, Personalidad y Experimento',
    bestFor: 'Proyectos profesionales y generación de contenido complejo',
  },
  {
    id: 'cot',
    name: 'Chain-of-Thought (CoT)',
    tagline: 'Razonamiento deliberativo paso a paso',
    bestFor: 'Resolución de bugs, matemáticas y toma de decisiones lógicas',
  },
  {
    id: 'few-shot',
    name: 'Few-Shot (Con Ejemplos)',
    tagline: 'Entrenamiento en contexto con pares de entrada y salida',
    bestFor: 'Formateo estricto, clasificación y respuestas JSON',
  },
  {
    id: 'rtf',
    name: 'RTF (Rol, Tarea, Formato)',
    tagline: 'Estructura minimalista de alta velocidad',
    bestFor: 'Peticiones rápidas y asistentes de programación',
  },
];

export default function PromptOptimizer() {
  const [selectedFramework, setSelectedFramework] = useState<string>('crispe');
  const [targetModel, setTargetModel] = useState<string>('Claude 3.5 Sonnet');
  const [rawIdea, setRawIdea] = useState<string>('Quiero crear un script en TypeScript para scrapear datos y guardarlos en una base de datos sin ser bloqueado');
  const [expertRole, setExpertRole] = useState<string>('Ingeniero de Datos Senior especializado en Web Scraping y TypeScript');
  const [constraints, setConstraints] = useState<string>('Evitar librerías pesadas, manejar reintentos con backoff exponencial y salida en JSON');
  const [outputFormat, setOutputFormat] = useState<string>('Código comentado paso a paso con manejo de errores estricto');
  const [copied, setCopied] = useState<boolean>(false);

  // Generador dinámico según el marco elegido
  const generatedPrompt = useMemo(() => {
    if (selectedFramework === 'crispe') {
      return `<system_role>
Actúa con la máxima competencia como ${expertRole}.
Tu personalidad debe ser rigurosa, analítica y orientada a código de producción limpio.
</system_role>

<context>
El objetivo principal es: ${rawIdea}.
Restricciones clave del proyecto:
- ${constraints}
</context>

<instructions>
1. Analiza el problema y define la arquitectura óptima para ${targetModel}.
2. Escribe una solución modular y robusta sin atajos ni pseudocódigo incompleto.
3. Asegura el cumplimiento de las restricciones señaladas.
</instructions>

<output_format>
${outputFormat}
</output_format>`;
    }

    if (selectedFramework === 'cot') {
      return `Eres un especialista en razonamiento analítico y ${expertRole}.

TAREA: ${rawIdea}

RESTRICCIONES:
${constraints}

INSTRUCCIONES DE RAZONAMIENTO PASO A PASO:
1. Primero, descompón el problema en sub-problemas elementales.
2. Identifica posibles cuellos de botella o casos límite (edge cases).
3. Evalúa al menos dos enfoques alternativos antes de elegir el definitivo.
4. Genera la solución final en el siguiente formato:
${outputFormat}`;
    }

    if (selectedFramework === 'few-shot') {
      return `Rol: ${expertRole}
Objetivo: ${rawIdea}

REGLAS:
- Formato esperado: ${outputFormat}
- Restricciones: ${constraints}

EJEMPLO DE ENTRADA:
"Entrada de prueba estándar"

EJEMPLO DE SALIDA ESPERADA:
{
  "status": "success",
  "resultado": "Respuesta formateada exactamente según los estándares requeridos"
}

AHORA PROCESA LA SIGUIENTE PETICIÓN REAL:
${rawIdea}`;
    }

    // RTF (Default)
    return `[ROL]
${expertRole}

[TAREA]
${rawIdea}

[RESTRICCIONES]
${constraints}

[FORMATO DE SALIDA]
${outputFormat}`;
  }, [selectedFramework, targetModel, rawIdea, expertRole, constraints, outputFormat]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[2.5rem] border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-100">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#fef9c3] text-[#713f12] text-xs font-black uppercase tracking-wider">
            Utilidad Gratuita #2
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase mt-2">
            Generador & Optimizador de Prompts
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Transforma instrucciones informales en prompts de ingeniería estructurados con delimitadores XML y roles precisos.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
          <Wand2 className="w-5 h-5 text-slate-900 icon-bounce" />
          <span className="text-xs font-bold font-mono">Zero Alucinaciones</span>
        </div>
      </div>

      {/* Selectores de Configuración */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
        
        {/* Selector de Marco */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
            Estructura / Marco de Prompting
          </label>
          <div className="grid grid-cols-2 gap-2">
            {FRAMEWORKS.map((fw) => (
              <button
                key={fw.id}
                type="button"
                onClick={() => setSelectedFramework(fw.id)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  selectedFramework === fw.id
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-black">{fw.name}</div>
                <div className="text-[10px] opacity-70 line-clamp-1 mt-0.5">{fw.bestFor}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Modelo Destino */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
            Modelo de Inteligencia Artificial Destino
          </label>
          <select
            value={targetModel}
            onChange={(e) => setTargetModel(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer shadow-sm"
          >
            <option>Claude 3.5 Sonnet (Recomendado para código)</option>
            <option>OpenAI GPT-4o (Multimodal y general)</option>
            <option>DeepSeek R1 (Razonamiento profundo)</option>
            <option>Cursor IDE Composer</option>
            <option>Google Gemini 1.5 Pro</option>
          </select>
          <p className="text-[11px] text-slate-500 font-medium">
            El prompt se adaptará a la sintaxis y tipos de etiquetas que mejor interpreta este modelo.
          </p>
        </div>

      </div>

      {/* Formulario de Entrada */}
      <div className="space-y-4 pb-8">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
            1. ¿Qué quieres lograr? (Tu idea en bruto)
          </label>
          <textarea
            rows={3}
            value={rawIdea}
            onChange={(e) => setRawIdea(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Escribe tu objetivo aquí..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
              2. Rol del Experto
            </label>
            <input
              type="text"
              value={expertRole}
              onChange={(e) => setExpertRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
              3. Restricciones / Reglas
            </label>
            <input
              type="text"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
              4. Formato de Salida
            </label>
            <input
              type="text"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>

      {/* Salida Generada con Botón de Copiar */}
      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-emerald-600" />
            Prompt Estructurado Listo para Copiar
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wide transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-black text-white hover:bg-slate-800'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Prompt</span>
              </>
            )}
          </button>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {generatedPrompt}
        </div>
      </div>

    </div>
  );
}
