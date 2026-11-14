export interface SoftwareTool {
  slug: string;
  name: string;
  category: 'IA' | 'Automatización' | 'Productividad' | 'Desarrollo';
  pricingType: 'Gratis' | 'Freemium' | 'Pago' | 'Open Source';
  rating: number;
  websiteUrl: string;
  tagline: string;
  description: string;
  tagBg: string;
  tags: string[];
  pricingPlans: {
    name: string;
    price: string;
    features: string[];
  }[];
  pros: string[];
  cons: string[];
  bestUseCases: string[];
  alternatives: { name: string; link: string }[];
}

export const TOOLS_DATA: SoftwareTool[] = [
  {
    slug: 'n8n',
    name: 'n8n',
    category: 'Automatización',
    pricingType: 'Open Source',
    rating: 4.9,
    websiteUrl: 'https://n8n.io',
    tagline: 'Plataforma líder de flujos de trabajo con soporte nativo para agentes de IA y auto-alojamiento.',
    description: 'n8n es una herramienta de automatización de código abierto que permite conectar cualquier API y base de datos con modelos de lenguaje grande. A diferencia de las alternativas cerradas, n8n se puede auto-alojar en tus propios servidores Docker de forma totalmente gratuita y sin límite de ejecuciones.',
    tagBg: 'bg-[#bbf7d0] text-[#166534]',
    tags: ['Workflows', 'Agentes IA', 'Self-hosted', 'Docker'],
    pricingPlans: [
      { name: 'Community (Self-Hosted)', price: '$0 / mes', features: ['Ilimitadas ejecuciones', 'Control total de datos', 'Nodos comunitarios'] },
      { name: 'Cloud Starter', price: '$20 / mes', features: ['2,500 ejecuciones', 'Alojado por n8n', 'Soporte estándar'] },
      { name: 'Enterprise', price: 'Personalizado', features: ['SSO / SAML', 'Auditoría avanzada', 'SLA garantizado'] },
    ],
    pros: [
      'Versión Community 100% gratuita para auto-alojar sin límites de tareas',
      'Integración nativa con LangChain, memoria y herramientas de agentes de IA',
      'Permite código personalizado en JavaScript, TypeScript y Python',
      'Control absoluto de la privacidad de datos corporativos',
    ],
    cons: [
      'Requiere conocimientos básicos de Docker para el auto-alojamiento',
      'La versión en la nube oficial es de pago por ejecuciones',
    ],
    bestUseCases: [
      'Empresas que no pueden compartir datos con servicios cloud externos por GDPR',
      'Desarrolladores que crean agentes de IA autónomos con herramientas externas',
      'Automatización de tareas complejas con lógica condicional y bucles',
    ],
    alternatives: [
      { name: 'Make (Integromat)', link: '/comparativas/n8n-vs-make' },
      { name: 'Zapier', link: '/herramientas/zapier' },
    ],
  },
  {
    slug: 'claude',
    name: 'Claude (Anthropic)',
    category: 'IA',
    pricingType: 'Freemium',
    rating: 4.9,
    websiteUrl: 'https://claude.ai',
    tagline: 'Familia de modelos con capacidades punteras de programación, análisis y razonamiento.',
    description: 'Claude, desarrollado por Anthropic, es ampliamente reconocido en la comunidad tecnológica como el modelo de lenguaje más capaz para generación de código complejo y redacción analítica matizada. Su interfaz web incluye Artifacts para renderizar código y diagramas al instante.',
    tagBg: 'bg-[#fef08a] text-[#854d0e]',
    tags: ['LLM', 'Código', 'Artifacts', 'Sonnet'],
    pricingPlans: [
      { name: 'Gratuito', price: '$0', features: ['Acceso a Claude 3.5 Sonnet', 'Uso de Artifacts', 'Límites de mensajes dinámicos'] },
      { name: 'Claude Pro', price: '$20 / mes', features: ['5x más uso en horas pico', 'Acceso prioritario a nuevos modelos', 'Creación de Proyectos'] },
      { name: 'Team', price: '$25 / usuario / mes', features: ['Espacio compartido', 'Facturación centralizada', 'Controles de privacidad'] },
    ],
    pros: [
      'El mejor modelo del mercado para programación sin errores',
      'Artifacts interactivos para ver aplicaciones React y diagramas en tiempo real',
      'Ventana de contexto de 200,000 tokens con retención perfecta',
      'Excelente comprensión de matices en textos técnicos largos',
    ],
    cons: [
      'Límites de mensajes que pueden alcanzarse en sesiones intensas de desarrollo',
      'Sin generación nativa de imágenes ni modo de voz interactivo',
    ],
    bestUseCases: [
      'Refactorización y arquitectura de software en múltiples archivos',
      'Análisis profundo de contratos, libros o documentación técnica',
      'Creación rápida de prototipos interactivos en frontend',
    ],
    alternatives: [
      { name: 'ChatGPT (OpenAI)', link: '/comparativas/chatgpt-vs-claude' },
      { name: 'DeepSeek R1', link: '/comparativas/deepseek-r1-vs-o1' },
    ],
  },
  {
    slug: 'cursor',
    name: 'Cursor IDE',
    category: 'Desarrollo',
    pricingType: 'Freemium',
    rating: 4.8,
    websiteUrl: 'https://cursor.com',
    tagline: 'El editor de código fork de VS Code impulsado por IA para programar a máxima velocidad.',
    description: 'Cursor reimagina cómo programan los desarrolladores integrando modelos de lenguaje en el núcleo del editor. Gracias a su índice semántico del repositorio y al modo Composer, permite editar y coordinar cambios a través de decenas de archivos con instrucciones en lenguaje natural.',
    tagBg: 'bg-[#fce7f3] text-[#9d174d]',
    tags: ['IDE', 'VS Code', 'Composer', 'Autocompletado'],
    pricingPlans: [
      { name: 'Hobby', price: '$0', features: ['2,000 autocompletados al mes', '50 peticiones rápidas con IA'] },
      { name: 'Pro', price: '$20 / mes', features: ['500 peticiones rápidas a Claude 3.5 Sonnet / GPT-4o', 'Autocompletado ilimitado', 'Composer ilimitado'] },
      { name: 'Business', price: '$40 / usuario / mes', features: ['Modo privacidad estricto', 'Panel de administración', 'Facturación centralizada'] },
    ],
    pros: [
      'Composer multi-archivo capaz de generar features completas en segundos',
      'Importa todas tus extensiones, temas y configuración de VS Code en 1 clic',
      'Autocompletado inteligente Tab que predice la siguiente línea y posición del cursor',
      'Soporte para directivas de proyecto con archivos .cursorrules',
    ],
    cons: [
      'Consumo rápido de peticiones prémium en proyectos muy grandes',
    ],
    bestUseCases: [
      'Desarrollo full-stack acelerado en TypeScript, React, Python o Go',
      'Migraciones de código y actualización de dependencias masivas',
      'Onboarding instantáneo en bases de código desconocidas',
    ],
    alternatives: [
      { name: 'GitHub Copilot', link: '/comparativas/cursor-vs-github-copilot' },
    ],
  },
  {
    slug: 'make',
    name: 'Make (Integromat)',
    category: 'Automatización',
    pricingType: 'Freemium',
    rating: 4.7,
    websiteUrl: 'https://make.com',
    tagline: 'El constructor visual de automatizaciones en la nube más intuitivo y flexible.',
    description: 'Make permite diseñar flujos de trabajo arrastrando módulos visuales interactivos. Con soporte para miles de aplicaciones comerciales, filtros avanzados, iteradores y routers, es la opción favorita de agencias y profesionales no técnicos para conectar servicios en minutos.',
    tagBg: 'bg-[#e9d5ff] text-[#6b21a8]',
    tags: ['No-Code', 'Integraciones', 'Cloud', 'Workflows'],
    pricingPlans: [
      { name: 'Gratuito', price: '$0', features: ['1,000 operaciones al mes', '2 escenarios activos'] },
      { name: 'Core', price: '$9 / mes', features: ['10,000 operaciones', 'Escenarios ilimitados'] },
      { name: 'Pro', price: '$16 / mes', features: ['Prioridad de ejecución', 'Búsqueda de texto completo'] },
    ],
    pros: [
      'Interfaz visual extremadamente amigable e intuitiva',
      'Cero mantenimiento de servidores o infraestructura',
      'Facilidad para gestionar errores con directivas de reintento visuales',
    ],
    cons: [
      'Modelo de cobro por operaciones individuales que puede encarecerse con bucles',
      'Sin posibilidad de auto-alojamiento',
    ],
    bestUseCases: [
      'Sincronización de CRM, correo electrónico y hojas de cálculo',
      'Automatizaciones comerciales rápidas para marketing y ventas',
    ],
    alternatives: [
      { name: 'n8n', link: '/comparativas/n8n-vs-make' },
      { name: 'Zapier', link: '/herramientas/zapier' },
    ],
  },
  {
    slug: 'ollama',
    name: 'Ollama',
    category: 'IA',
    pricingType: 'Open Source',
    rating: 4.9,
    websiteUrl: 'https://ollama.com',
    tagline: 'Ejecuta modelos LLM potentes en tu propio ordenador con privacidad absoluta.',
    description: 'Ollama es el estándar para ejecutar modelos open-weights como Llama 3, DeepSeek R1, Mistral y Phi en hardware local. Se encarga de gestionar la cuantización, la aceleración por GPU (CUDA/Metal) y ofrece una API local compatible con el formato de OpenAI.',
    tagBg: 'bg-[#bae6fd] text-[#075985]',
    tags: ['Local LLM', 'CLI', 'Privacidad', 'CUDA'],
    pricingPlans: [
      { name: 'Open Source', price: '$0 (Gratis siempre)', features: ['Sin límites', '100% privado en tu hardware', 'Compatible con Windows, Mac y Linux'] },
    ],
    pros: [
      'Completamente gratuito y libre de suscripciones',
      'Privacidad total: tus datos nunca salen de tu ordenador',
      'API local lista para integrar con Cursor, LibreChat o n8n',
    ],
    cons: [
      'Requiere hardware con GPU dedicada para modelos grandes (14B o 70B)',
    ],
    bestUseCases: [
      'Desarrollo y pruebas locales sin gastar saldo de API',
      'Procesamiento de documentos confidenciales que no pueden subirse a la nube',
    ],
    alternatives: [
      { name: 'Claude (Anthropic)', link: '/herramientas/claude' },
    ],
  },
  {
    slug: 'notion',
    name: 'Notion & Notion AI',
    category: 'Productividad',
    pricingType: 'Freemium',
    rating: 4.8,
    websiteUrl: 'https://notion.so',
    tagline: 'Espacio de trabajo todo en uno para notas, bases de datos relacionales y proyectos.',
    description: 'Notion combina documentos, wikis y bases de datos flexibles con un potente asistente de inteligencia artificial capaz de buscar en todo el espacio de trabajo, redactar resúmenes y extraer tareas pendientes automáticamente.',
    tagBg: 'bg-[#fed7aa] text-[#9a3412]',
    tags: ['Wiki', 'Bases de Datos', 'Proyectos', 'Notion AI'],
    pricingPlans: [
      { name: 'Gratuito', price: '$0', features: ['Páginas ilimitadas para uso personal', 'Integraciones básicas'] },
      { name: 'Plus', price: '$10 / usuario / mes', features: ['Bloques ilimitados para equipos', 'Historial de versiones de 30 días'] },
      { name: 'Notion AI Add-on', price: '+$8 / usuario / mes', features: ['Búsqueda con IA en todo el workspace', 'Generación de texto'] },
    ],
    pros: [
      'Flexibilidad incomparable para diseñar sistemas a medida (PARA, Kanban, etc.)',
      'Notion AI indexa todo tu conocimiento interno para responder preguntas',
    ],
    cons: [
      'Puede resultar abrumador para usuarios que solo buscan una app de notas simple',
    ],
    bestUseCases: [
      'Gestión de proyectos y documentación técnica para equipos',
      'Segundo cerebro personal para organizar notas, libros y recursos',
    ],
    alternatives: [
      { name: 'Cursor IDE', link: '/herramientas/cursor' },
    ],
  },
  {
    slug: 'perplexity',
    name: 'Perplexity AI',
    category: 'IA',
    pricingType: 'Freemium',
    rating: 4.8,
    websiteUrl: 'https://perplexity.ai',
    tagline: 'Motor de búsqueda conversacional que responde con fuentes verificables en tiempo real.',
    description: 'Perplexity reemplaza la búsqueda tradicional basada en enlaces por respuestas sintetizadas y citadas directamente desde la web en vivo. Su función Pro Search ejecuta búsquedas en múltiples pasos para investigar temas complejos a fondo.',
    tagBg: 'bg-[#dcfce7] text-[#15803d]',
    tags: ['Buscador', 'Citas', 'Investigación', 'Web'],
    pricingPlans: [
      { name: 'Gratuito', price: '$0', features: ['Búsquedas estándar ilimitadas', '5 búsquedas Pro al día'] },
      { name: 'Perplexity Pro', price: '$20 / mes', features: ['300+ búsquedas Pro al día', 'Elección de modelo (Claude 3.5, Sonar, GPT-4o)', 'Carga de archivos'] },
    ],
    pros: [
      'Respuestas verificables con citas directas a las páginas fuente',
      'Capacidad de elegir el modelo de lenguaje de fondo en versión Pro',
      'Ahorra horas en investigación comparado con buscar en Google tradicional',
    ],
    cons: [
      'Menos adecuado para programación interactiva paso a paso',
    ],
    bestUseCases: [
      'Investigación de mercado, noticias de última hora y síntesis académica',
    ],
    alternatives: [
      { name: 'Claude', link: '/herramientas/claude' },
    ],
  },
  {
    slug: 'zapier',
    name: 'Zapier',
    category: 'Automatización',
    pricingType: 'Freemium',
    rating: 4.6,
    websiteUrl: 'https://zapier.com',
    tagline: 'El estándar de la industria para interconectar más de 6,000 aplicaciones comerciales.',
    description: 'Zapier es la plataforma de integración pionera que conecta prácticamente cualquier software SaaS del mercado sin requerir código. Con su nuevo producto Zapier Central, permite orquestar bots de IA con acceso a todas tus aplicaciones conectadas.',
    tagBg: 'bg-[#ffedd5] text-[#9a3412]',
    tags: ['Zaps', 'Integraciones', 'SaaS', 'No-code'],
    pricingPlans: [
      { name: 'Gratuito', price: '$0', features: ['100 tareas al mes', 'Zaps de un solo paso'] },
      { name: 'Starter', price: '$19.99 / mes', features: ['750 tareas', 'Zaps multi-paso'] },
      { name: 'Professional', price: '$49 / mes', features: ['2,000 tareas', 'Lógica condicional', 'Webhooks'] },
    ],
    pros: [
      'El mayor catálogo de aplicaciones conectables (más de 6,000)',
      'Gran estabilidad y soporte empresarial reconocido',
    ],
    cons: [
      'Es significativamente más costoso que n8n y Make en planes intermedios',
    ],
    bestUseCases: [
      'Empresas con apps propietarias donde solo Zapier ofrece conectores oficiales',
    ],
    alternatives: [
      { name: 'n8n', link: '/herramientas/n8n' },
      { name: 'Make', link: '/herramientas/make' },
    ],
  },
];
