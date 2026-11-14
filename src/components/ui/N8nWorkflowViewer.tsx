import React, { useState } from 'react';
import { Sparkles, Copy, Check, Play, Settings, ArrowRight, Bot, Zap, Send, FileText } from 'lucide-react';

interface N8nNode {
  id: string;
  name: string;
  type: string;
  category: 'trigger' | 'ai' | 'action' | 'output';
  iconType: 'webhook' | 'openai' | 'gemini' | 'telegram' | 'notion';
  color: string;
  badge: string;
  parameters: { label: string; value: string; isExpression?: boolean }[];
  inputSample: string;
  outputSample: string;
}

const WORKFLOW_NODES: N8nNode[] = [
  {
    id: 'node-webhook',
    name: 'Webhook Trigger',
    type: 'n8n-nodes-base.webhook',
    category: 'trigger',
    iconType: 'webhook',
    color: '#ff6d5a', // n8n Trigger Orange-Red
    badge: 'Disparador',
    parameters: [
      { label: 'HTTP Method', value: 'POST' },
      { label: 'Path', value: '/alertas-leads' },
      { label: 'Authentication', value: 'Header Auth (API Key)' },
      { label: 'Response Mode', value: 'On Received (200 OK)' },
    ],
    inputSample: '{\n  "from": "carlos@startup.com",\n  "subject": "Solicitud Demo Agente IA",\n  "content": "Queremos automatizar el triaje de 500 tickets al día."\n}',
    outputSample: '{\n  "body": {\n    "from": "carlos@startup.com",\n    "subject": "Solicitud Demo Agente IA",\n    "content": "Queremos automatizar el triaje de 500 tickets..."\n  }\n}',
  },
  {
    id: 'node-openai',
    name: 'OpenAI GPT-4o-mini',
    type: '@n8n/n8n-nodes-langchain.openAi',
    category: 'ai',
    iconType: 'openai',
    color: '#10a37f', // OpenAI Green
    badge: 'Modelo IA',
    parameters: [
      { label: 'Model', value: 'gpt-4o-mini' },
      { label: 'Temperature', value: '0.2' },
      { label: 'System Message', value: 'Eres un clasificador de oportunidades de ventas. Genera un resumen de 2 frases con prioridad Alta/Media/Baja.' },
      { label: 'Prompt Expresión', value: '{{ $json.body.content }}', isExpression: true },
    ],
    inputSample: 'Recibe payload del Webhook...',
    outputSample: '{\n  "prioridad": "Alta",\n  "resumen": "Lead calificado con volumen de 500 tickets diarios para automatización.",\n  "siguiente_accion": "Agendar demo en < 2 horas"\n}',
  },
  {
    id: 'node-telegram',
    name: 'Telegram Bot',
    type: 'n8n-nodes-base.telegram',
    category: 'action',
    iconType: 'telegram',
    color: '#229ed9', // Telegram Blue
    badge: 'Notificación',
    parameters: [
      { label: 'Resource', value: 'Message' },
      { label: 'Operation', value: 'Send Text Message' },
      { label: 'Chat ID', value: '{{ $env.TELEGRAM_CHAT_ID }}', isExpression: true },
      { label: 'Text Formato', value: '🚨 *NUEVO LEAD URGENTE*\n👤 De: {{ $node["Webhook Trigger"].json.body.from }}\n⚡ Prioridad: {{ $json.prioridad }}\n📝 {{ $json.resumen }}', isExpression: true },
      { label: 'Parse Mode', value: 'MarkdownV2' },
    ],
    inputSample: 'Recibe resumen de OpenAI...',
    outputSample: '{\n  "message_id": 4821,\n  "chat": { "id": 1928381 },\n  "status": "sent"\n}',
  },
  {
    id: 'node-notion',
    name: 'Notion Database',
    type: 'n8n-nodes-base.notion',
    category: 'output',
    iconType: 'notion',
    color: '#000000', // Notion Black
    badge: 'Base de Datos',
    parameters: [
      { label: 'Resource', value: 'Database Page' },
      { label: 'Database ID', value: 'CRM_Leads_2026' },
      { label: 'Nombre Lead', value: '{{ $node["Webhook Trigger"].json.body.from }}', isExpression: true },
      { label: 'Estado', value: 'Nuevo' },
      { label: 'Resumen IA', value: '{{ $json.resumen }}', isExpression: true },
    ],
    inputSample: 'Recibe datos combinados...',
    outputSample: '{\n  "page_id": "9a38d...f1",\n  "url": "https://notion.so/lead-4821"\n}',
  },
];

export default function N8nWorkflowViewer() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-openai');
  const [copiedWorkflow, setCopiedWorkflow] = useState<boolean>(false);

  const selectedNode = WORKFLOW_NODES.find((n) => n.id === selectedNodeId) || WORKFLOW_NODES[0];

  const handleCopyJSON = () => {
    const rawJSON = JSON.stringify(
      {
        name: 'Workflow n8n - Alertas IA & Telegram',
        nodes: WORKFLOW_NODES.map((n) => ({
          name: n.name,
          type: n.type,
          parameters: n.parameters,
        })),
      },
      null,
      2
    );
    navigator.clipboard.writeText(rawJSON);
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 2200);
  };

  return (
    <div className="w-full my-10 rounded-[2.5rem] border border-slate-300 bg-white overflow-hidden shadow-xl font-sans">
      
      {/* Barra de herramientas estilo n8n Canvas */}
      <div className="px-6 py-4 bg-[#1e1e2f] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#ff6d5a] flex items-center justify-center font-black text-xs text-white shadow-sm">
            n8n
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-tight text-white">
              Lienzo Interactivo de Flujo: Triaje de Leads con IA & Telegram
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Haz clic en cualquier nodo para inspeccionar sus parámetros y expresiones en tiempo real.
            </p>
          </div>
        </div>

        {/* Botón de Copiar Workflow JSON con animación sin alert */}
        <button
          type="button"
          onClick={handleCopyJSON}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
            copiedWorkflow
              ? 'bg-[#15803d] text-white scale-105 shadow-md'
              : 'bg-black text-white hover:bg-slate-800 active:scale-95'
          }`}
          title="Copiar JSON del flujo para importar en n8n"
        >
          {copiedWorkflow ? (
            <>
              <Check className="w-4 h-4 animate-bounce" style={{ animationIterationCount: 2 }} />
              <span>¡Workflow Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar Flujo JSON</span>
            </>
          )}
        </button>
      </div>

      {/* Lienzo Visual de Nodos estilo n8n */}
      <div className="p-8 sm:p-12 bg-[#252538] relative overflow-x-auto min-h-[380px] flex items-center justify-center">
        
        {/* Cuadrícula de Puntos SVG auténtica de n8n */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>

        {/* Diagrama de Conexiones de Nodos */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10 py-6">
          
          {WORKFLOW_NODES.map((node, index) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <React.Fragment key={node.id}>
                
                {/* Caja de Nodo estilo n8n */}
                <div
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`w-64 rounded-2xl bg-[#1e1e2f] border-2 transition-all cursor-pointer relative p-4 flex flex-col justify-between shadow-lg select-none group ${
                    isSelected
                      ? 'border-[#ff6d5a] ring-4 ring-[#ff6d5a]/20 scale-105'
                      : 'border-slate-700 hover:border-slate-500 hover:scale-[1.02]'
                  }`}
                >
                  {/* Conector de Entrada (Puerto Izquierdo) */}
                  {index > 0 && (
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1e1e2f] border-2 border-slate-600 flex items-center justify-center text-[10px] text-slate-400 group-hover:border-[#ff6d5a] transition-colors">
                      +
                    </div>
                  )}

                  {/* Cabecera del Nodo */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: node.color }}
                    >
                      {node.iconType === 'webhook' && <Zap className="w-5 h-5" />}
                      {node.iconType === 'openai' && <Bot className="w-5 h-5" />}
                      {node.iconType === 'telegram' && <Send className="w-5 h-5" />}
                      {node.iconType === 'notion' && <FileText className="w-5 h-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {node.badge}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white truncate mt-0.5">
                        {node.name}
                      </h4>
                    </div>
                  </div>

                  {/* Estado / Subtexto */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[140px] font-mono">{node.type.split('.').pop()}</span>
                    <span className="text-emerald-400 font-bold">Activo</span>
                  </div>

                  {/* Conector de Salida (Puerto Derecho) */}
                  {index < WORKFLOW_NODES.length - 1 && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1e1e2f] border-2 border-slate-600 flex items-center justify-center text-[10px] text-slate-400 group-hover:border-[#ff6d5a] transition-colors">
                      +
                    </div>
                  )}
                </div>

                {/* Cable conector entre nodos */}
                {index < WORKFLOW_NODES.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-8 text-slate-500 font-bold">
                    <ArrowRight className="w-5 h-5 text-slate-400 animate-pulse" />
                  </div>
                )}

              </React.Fragment>
            );
          })}

        </div>

      </div>

      {/* Panel Inferior: Inspector de Parámetros y Expresiones del Nodo Seleccionado */}
      <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: selectedNode.color }}
            />
            <h4 className="text-base font-black text-slate-900 uppercase">
              Configuración del Nodo: {selectedNode.name}
            </h4>
            <span className="text-xs font-mono bg-white px-2.5 py-0.5 rounded-md border border-slate-200 text-slate-600">
              {selectedNode.type}
            </span>
          </div>

          <span className="text-xs font-bold text-slate-500">
            Paso {WORKFLOW_NODES.findIndex((n) => n.id === selectedNode.id) + 1} de {WORKFLOW_NODES.length}
          </span>
        </div>

        {/* Tabla de Parámetros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
              Parámetros y Expresiones
            </h5>
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100 text-xs">
                {selectedNode.parameters.map((param) => (
                  <div key={param.label} className="p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <span className="font-bold text-slate-700 sm:w-1/3">{param.label}</span>
                    <span className={`sm:w-2/3 font-mono text-left break-all ${
                      param.isExpression
                        ? 'bg-[#fef9c3] text-[#713f12] px-2 py-0.5 rounded font-bold border border-[#fef08a]'
                        : 'text-slate-900'
                    }`}>
                      {param.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Salida JSON Generada */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
              Datos que Pasan al Siguiente Nodo (JSON Output)
            </h5>
            <div className="rounded-2xl border border-slate-800 bg-[#0c1017] p-4 text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre max-h-[220px]">
              {selectedNode.outputSample}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
