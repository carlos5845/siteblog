export interface ComparisonPage {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  winner: string;
  itemA: {
    name: string;
    tagline: string;
    pros: string[];
    cons: string[];
    score: string;
  };
  itemB: {
    name: string;
    tagline: string;
    pros: string[];
    cons: string[];
    score: string;
  };
  features: {
    name: string;
    itemA: string;
    itemB: string;
    winner: 'A' | 'B' | 'Tie';
  }[];
  detailedAnalysis: {
    sectionTitle: string;
    content: string;
  }[];
  verdictDescription: string;
}

export const COMPARISONS_DATA: ComparisonPage[] = [
  {
    slug: 'chatgpt-vs-claude',
    title: 'ChatGPT (GPT-4o) vs. Claude (Claude 3.5 Sonnet): ¿Cuál es Mejor?',
    shortTitle: 'ChatGPT vs Claude',
    category: 'Modelos de Inteligencia Artificial',
    summary: 'Enfrentamos a los dos titanes de la IA generativa en capacidad de programación, razonamiento lógico, redacción, límites de contexto y costos de API.',
    winner: 'Claude 3.5 Sonnet para programación y análisis; GPT-4o para tareas multimodales y ecosistema móvil.',
    itemA: {
      name: 'ChatGPT (GPT-4o)',
      tagline: 'El asistente más versátil con integración de voz, visión y ecosistema de GPTs.',
      pros: [
        'Modo de voz en tiempo real sobresaliente',
        'Generación de imágenes con DALL-E 3 integrada',
        'Ecosistema maduro de extensiones y Custom GPTs',
        'Búsqueda web integrada con citas interactivas',
      ],
      cons: [
        'Mayor tendencia a generar código con atajos o funciones incompletas',
        'Ventana de contexto menor (128K vs 200K)',
      ],
      score: '9.2 / 10',
    },
    itemB: {
      name: 'Claude (Claude 3.5 Sonnet)',
      tagline: 'El estándar de oro para desarrolladores, arquitectura de software y escritura profunda.',
      pros: [
        'Capacidades de generación y depuración de código líderes de la industria',
        'Funcionalidad de Artifacts para previsualizar código y diagramas al instante',
        'Ventana de contexto de 200,000 tokens altamente precisa (retención perfecta)',
        'Tono de redacción natural y menos robótico',
      ],
      cons: [
        'Límite de mensajes más estricto en la versión gratuita/Pro',
        'Sin generación directa de imágenes o audio',
      ],
      score: '9.6 / 10',
    },
    features: [
      { name: 'Generación de Código Complejo', itemA: '8.8 / 10', itemB: '9.7 / 10', winner: 'B' },
      { name: 'Ventana de Contexto Máxima', itemA: '128,000 tokens', itemB: '200,000 tokens', winner: 'B' },
      { name: 'Previsualización Interactiva (Artifacts / Canvas)', itemA: 'Canvas básico', itemB: 'Artifacts React y SVG', winner: 'B' },
      { name: 'Modo de Voz en Tiempo Real', itemA: 'Nativo ultra-fluido', itemB: 'No disponible', winner: 'A' },
      { name: 'Generación de Imágenes', itemA: 'DALL-E 3 incluido', itemB: 'No disponible', winner: 'A' },
      { name: 'Costo de Entrada en API (por 1M tokens)', itemA: '$2.50 USD', itemB: '$3.00 USD', winner: 'A' },
      { name: 'Costo de Salida en API (por 1M tokens)', itemA: '$10.00 USD', itemB: '$15.00 USD', winner: 'A' },
    ],
    detailedAnalysis: [
      {
        sectionTitle: 'Rendimiento en Programación y Refactorización',
        content: 'Si tu principal caso de uso es escribir código, Claude 3.5 Sonnet es el vencedor indiscutible. En pruebas de refactorización multi-archivo y detección de vulnerabilidades, Claude no omite código ni recurre al temido "// resto del código aquí", entregando implementaciones completas y funcionales. GPT-4o es excelente para scripts rápidos, pero suele necesitar más correcciones en bases de código grandes.',
      },
      {
        sectionTitle: 'Capacidades Multimodales y Ecosistema',
        content: 'OpenAI mantiene una clara ventaja en funciones auxiliares: la app móvil de ChatGPT con modo de voz avanzado es insuperable para practicar idiomas, lluvia de ideas en el coche o consultas rápidas. Además, la capacidad de generar gráficos e ilustraciones con DALL-E dentro del mismo hilo ahorra tiempo en tareas creativas.',
      },
    ],
    verdictDescription: 'Para desarrolladores de software, creadores de contenido técnico y profesionales que buscan análisis riguroso de documentos, Claude 3.5 Sonnet es la mejor herramienta actualmente. Para usuarios que valoran asistentes de voz, generación gráfica y la biblioteca de GPTs personalizados, ChatGPT (GPT-4o) sigue siendo la opción más completa.',
  },
  {
    slug: 'deepseek-r1-vs-o1',
    title: 'DeepSeek R1 vs. OpenAI o1: La Batalla de los Modelos de Razonamiento',
    shortTitle: 'DeepSeek R1 vs o1',
    category: 'Modelos de Razonamiento',
    summary: 'Comparativa exhaustiva entre el modelo open-weights que sacudió la industria y el modelo de razonamiento propietario de OpenAI.',
    winner: 'DeepSeek R1 gana en relación costo/privacidad (Open Weights); OpenAI o1 mantiene una ligera ventaja en razonamiento multimodal.',
    itemA: {
      name: 'DeepSeek R1',
      tagline: 'Razonamiento abierto y auto-reflexión con pesos descargables para correr localmente.',
      pros: [
        'Pesos 100% abiertos (Open Weights) ejecutables con Ollama',
        'Costo en API hasta 27 veces menor que o1',
        'Pensamiento visible y auditable paso a paso',
        'Rendimiento equiparable en matemáticas y algoritmos',
      ],
      cons: [
        'Ventana de contexto de 64K tokens (frente a 200K de o1)',
        'Saturación ocasional en sus servidores oficiales',
      ],
      score: '9.5 / 10',
    },
    itemB: {
      name: 'OpenAI o1',
      tagline: 'El pionero del razonamiento deliberativo con cadena de pensamiento oculta.',
      pros: [
        'Ventana de contexto de 200,000 tokens',
        'Límite de salida masivo (hasta 100K tokens)',
        'Integración nativa con la plataforma empresarial de OpenAI',
        'Menor tendencia a desviarse en instrucciones de seguridad estrictas',
      ],
      cons: [
        'Precio muy elevado ($15 in / $60 out por millón de tokens)',
        'Pensamiento oculto que no permite auditar el razonamiento interno',
      ],
      score: '9.3 / 10',
    },
    features: [
      { name: 'Licencia / Disponibilidad', itemA: 'Open Weights (MIT)', itemB: 'Propietario cerrado', winner: 'A' },
      { name: 'Costo Entrada (por 1M tokens)', itemA: '$0.55 USD', itemB: '$15.00 USD', winner: 'A' },
      { name: 'Costo Salida (por 1M tokens)', itemA: '$2.19 USD', itemB: '$60.00 USD', winner: 'A' },
      { name: 'Ventana de Contexto', itemA: '64,000 tokens', itemB: '200,000 tokens', winner: 'B' },
      { name: 'Benchmark MATH (Nivel Olimpiada)', itemA: '93.1%', itemB: '94.8%', winner: 'B' },
      { name: 'Capacidad de Auto-alojamiento', itemA: 'Sí (Ollama / vLLM)', itemB: 'No disponible', winner: 'A' },
    ],
    detailedAnalysis: [
      {
        sectionTitle: 'El Factor Económico y la Soberanía de Datos',
        content: 'La gran revolución de DeepSeek R1 radica en que democratiza el razonamiento de nivel de doctorado. Para una empresa que procesa millones de tokens diarios en validación de código o resolución de problemas matemáticos, utilizar DeepSeek R1 reduce la factura de miles de dólares a apenas unos pocos cientos.',
      },
    ],
    verdictDescription: 'Si requieres privacidad total para correr el modelo en tu propia infraestructura o buscas una relación costo-beneficio imbatible para tareas analíticas pesadas, DeepSeek R1 es el claro ganador. Si necesitas ventanas de contexto superiores a 64K tokens y soporte enterprise de OpenAI, o1 sigue siendo la referencia.',
  },
  {
    slug: 'gemini-flash-vs-gpt-4o-mini',
    title: 'Gemini 1.5 Flash vs. GPT-4o mini: La Mejor IA Rápida y Económica',
    shortTitle: 'Gemini Flash vs GPT-4o mini',
    category: 'Modelos Compactos & APIs',
    summary: '¿Cuál es el mejor modelo para flujos automatizados de alto volumen, clasificación de texto y chatbots de soporte?',
    winner: 'Gemini 1.5 Flash por su contexto colosal de 1M tokens; GPT-4o mini por su salida estructurada JSON impecable.',
    itemA: {
      name: 'Gemini 1.5 Flash',
      tagline: '1 millón de tokens de contexto a una fracción de centavo.',
      pros: [
        'Ventana de 1,000,000 tokens',
        'Capacidad multimodal nativa para video largo y audio',
        'Precio imbatible ($0.075 / $0.30 por millón)',
      ],
      cons: [
        'Menor precisión en formateo estricto de JSON complejo',
      ],
      score: '9.1 / 10',
    },
    itemB: {
      name: 'GPT-4o mini',
      tagline: 'El caballo de batalla de OpenAI para APIs de producción masiva.',
      pros: [
        'Formateo JSON estructurado garantizado con schemas',
        'Baja latencia muy consistente',
        'Enorme ecosistema de librerías y SDKs',
      ],
      cons: [
        'Ventana de contexto limitada a 128K tokens',
      ],
      score: '9.2 / 10',
    },
    features: [
      { name: 'Ventana de Contexto', itemA: '1,000,000 tokens', itemB: '128,000 tokens', winner: 'A' },
      { name: 'Precio Entrada (1M tokens)', itemA: '$0.075 USD', itemB: '$0.15 USD', winner: 'A' },
      { name: 'Precio Salida (1M tokens)', itemA: '$0.30 USD', itemB: '$0.60 USD', winner: 'A' },
      { name: 'Soporte de Video Largo', itemA: 'Hasta 1 hora nativa', itemB: 'Solo frames como imágenes', winner: 'A' },
      { name: 'Structured Outputs (Strict JSON)', itemA: 'Bueno', itemB: 'Excelente (Garantizado)', winner: 'B' },
    ],
    detailedAnalysis: [
      {
        sectionTitle: 'El Contexto de 1 Millón de Tokens Marca la Diferencia',
        content: 'Gemini 1.5 Flash permite pasarle un libro entero o docenas de transcripciones de reuniones en una sola llamada sin necesidad de configurar una base de datos vectorial (RAG). Para análisis documental masivo a bajo costo, Gemini Flash no tiene rival.',
      },
    ],
    verdictDescription: 'Utiliza Gemini 1.5 Flash cuando necesites procesar documentos gigantescos, videos o audio a un costo ínfimo. Utiliza GPT-4o mini para llamadas de API de alta frecuencia donde requieras respuestas JSON 100% predecibles para integrar con bases de datos.',
  },
  {
    slug: 'n8n-vs-make',
    title: 'n8n vs. Make (Integromat): ¿Cuál Plataforma de Automatización Elegir?',
    shortTitle: 'n8n vs Make',
    category: 'Automatización & Workflows',
    summary: 'Comparamos la herramienta líder open-source para flujos con IA frente a la plataforma cloud más intuitiva del mercado.',
    winner: 'n8n para desarrolladores y privacidad; Make para agencias y usuarios no-técnicos.',
    itemA: {
      name: 'n8n',
      tagline: 'Orquestación de flujos y agentes de IA auto-alojable sin límites de ejecuciones.',
      pros: [
        'Versión Community 100% gratuita para auto-alojar con Docker',
        'Soporte nativo para LangChain y Agentes de IA autónomos',
        'Control total de los datos y cumplimiento de privacidad',
        'Permite código personalizado en JavaScript/TypeScript y Python',
      ],
      cons: [
        'Requiere mantenimiento de servidor en la versión self-hosted',
        'Curva de aprendizaje inicial ligeramente superior',
      ],
      score: '9.5 / 10',
    },
    itemB: {
      name: 'Make',
      tagline: 'El constructor visual no-code más elegante y potente en la nube.',
      pros: [
        'Interfaz visual sumamente intuitiva y agradable',
        'Cero mantenimiento de infraestructura',
        'Miles de módulos preconstruidos con autenticación instantánea',
      ],
      cons: [
        'Facturación basada en número de operaciones (puede volverse costoso a escala)',
        'Sin posibilidad de auto-alojar en servidores propios',
      ],
      score: '9.0 / 10',
    },
    features: [
      { name: 'Auto-alojamiento (Self-hosted)', itemA: 'Sí (Gratis / Ilimitado)', itemB: 'No disponible', winner: 'A' },
      { name: 'Integración Nativa con Agentes IA', itemA: 'Nodos LangChain integrados', itemB: 'Llamadas HTTP API estándar', winner: 'A' },
      { name: 'Facilidad de Uso Inicial', itemA: 'Media', itemB: 'Muy Alta', winner: 'B' },
      { name: 'Costo a Gran Volumen (100k+ tareas)', itemA: 'Costo fijo de servidor ($10-$20/mes)', itemB: 'Cientos de dólares al mes', winner: 'A' },
    ],
    detailedAnalysis: [
      {
        sectionTitle: 'El Auge de los Agentes de IA en n8n',
        content: 'n8n se ha posicionado como la herramienta predilecta para conectar modelos de lenguaje con herramientas externas. Sus nodos dedicados para memoria conversacional, herramientas de búsqueda y llamadas a bases de datos vectoriales permiten crear agentes de IA funcionales en minutos.',
      },
    ],
    verdictDescription: 'Si eres desarrollador, valoras la privacidad o procesas miles de ejecuciones al mes, n8n es la inversión inteligente. Si buscas una herramienta rápida en la nube para conectar apps comerciales sin gestionar servidores, Make es insuperable en facilidad.',
  },
  {
    slug: 'cursor-vs-github-copilot',
    title: 'Cursor IDE vs. GitHub Copilot: ¿Vale la Pena Cambiar de Editor?',
    shortTitle: 'Cursor vs Copilot',
    category: 'Herramientas de Desarrollo',
    summary: 'Evaluamos la diferencia entre tener un plugin de autocompletado y un editor impulsado por IA con indexación total de tu repositorio.',
    winner: 'Cursor supera ampliamente a GitHub Copilot gracias a Composer y su comprensión multi-archivo.',
    itemA: {
      name: 'Cursor IDE',
      tagline: 'El editor fork de VS Code diseñado desde cero para trabajar con IA.',
      pros: [
        'Modo Composer para editar múltiples archivos de forma coordinada',
        'Indexación vectorial profunda de todo el repositorio',
        'Libertad para elegir el modelo subyacente (Claude 3.5, GPT-4o)',
        'Atajo inteligente Tab para predecir tus siguientes ediciones',
      ],
      cons: [
        'Requiere migrar de editor (aunque importa extensiones de VS Code con un clic)',
      ],
      score: '9.7 / 10',
    },
    itemB: {
      name: 'GitHub Copilot',
      tagline: 'El asistente oficial de Microsoft disponible como plugin universal.',
      pros: [
        'Funciona como plugin en cualquier editor (VS Code, JetBrains, Neovim)',
        'Soporte empresarial maduro y seguro',
      ],
      cons: [
        'Comprensión del contexto del proyecto mucho más limitada',
        'Menor flexibilidad para seleccionar modelos punteros',
      ],
      score: '8.5 / 10',
    },
    features: [
      { name: 'Edición Multi-Archivo (Composer)', itemA: 'Excelente', itemB: 'Limitado a workspace', winner: 'A' },
      { name: 'Indexación del Proyecto Entero', itemA: 'Vectorial profunda (.cursorrules)', itemB: 'Solo pestañas abiertas', winner: 'A' },
      { name: 'Elección de Modelos (Claude 3.5 Sonnet)', itemA: 'Soportado nativamente', itemB: 'Configuración limitada', winner: 'A' },
      { name: 'Compatibilidad de Editores', itemA: 'Basado en VS Code', itemB: 'VS Code, JetBrains, Visual Studio', winner: 'B' },
    ],
    detailedAnalysis: [
      {
        sectionTitle: 'Por Qué Cursor Multiplica la Productividad',
        content: 'La gran diferencia entre un plugin tradicional como Copilot y Cursor radica en que Cursor comprende la totalidad de tu código. Al pedirle una refactorización, Cursor es capaz de crear un nuevo componente, actualizar los tipos de TypeScript y corregir las importaciones en 5 archivos simultáneamente.',
      },
    ],
    verdictDescription: 'Si tu editor principal es VS Code, migrar a Cursor es la mejor decisión para multiplicar tu velocidad de programación. GitHub Copilot sigue siendo útil si tu empresa exige licencias de Microsoft o trabajas en entornos JetBrains.',
  },
];
