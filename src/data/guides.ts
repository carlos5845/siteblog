export interface CommandTab {
  label: string;
  command: string;
}

export interface GuideSection {
  id: string;
  heading: string;
  body: string;
  tabs?: CommandTab[];
  showWorkflowViewer?: boolean;
  callout?: {
    type: 'tip' | 'note' | 'warning';
    text: string;
  };
}

export interface GuideArticle {
  slug: string;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  pillBg: string;
  toc: { id: string; text: string }[];
  contentSections: GuideSection[];
  faqs: { q: string; a: string }[];
}

export const GUIDES_DATA: GuideArticle[] = [
  {
    slug: 'como-instalar-ollama-windows',
    title: 'Cómo instalar Ollama en Windows, macOS y Linux y correr DeepSeek R1 y Llama 3 localmente',
    category: 'Inteligencia Artificial',
    description: 'Guía paso a paso multiplataforma para configurar Ollama, descargar modelos cuantizados de DeepSeek R1 y Llama 3, y utilizarlos sin fuga de datos ni costos de API.',
    author: 'Equipo Técnico de DigitalStack',
    date: '14 de Noviembre, 2026',
    readTime: '8 min de lectura',
    tags: ['Ollama', 'Local LLM', 'Windows', 'macOS', 'Linux', 'DeepSeek', 'Privacidad'],
    pillBg: 'bg-[#dcfce7] text-[#15803d]',
    toc: [
      { id: 'requisitos', text: '1. Requisitos de Hardware' },
      { id: 'instalacion-multi-so', text: '2. Instalación por Sistema Operativo' },
      { id: 'descargar-modelos', text: '3. Descargar y Ejecutar Modelos' },
      { id: 'configuracion-api', text: '4. Exponer la API Local para Apps' },
      { id: 'interfaz-grafica', text: '5. Conectar con Open WebUI' },
    ],
    contentSections: [
      {
        id: 'requisitos',
        heading: '1. Requisitos de Hardware recomendados',
        body: 'Ejecutar modelos de lenguaje localmente depende de la memoria RAM y la VRAM de tu tarjeta gráfica. Para modelos de 7B a 8B parámetros (como DeepSeek-R1-Distill-Qwen-8B o Llama 3.3 8B), se recomienda una GPU con al menos 6GB u 8GB de VRAM, o 16GB de memoria RAM si ejecutas en CPU.',
        callout: {
          type: 'tip',
          text: 'En tarjetas gráficas NVIDIA (CUDA), AMD (ROCm) o Apple Silicon (Metal), Ollama acelerará automáticamente la inferencia alcanzando entre 40 y 110 tokens por segundo.',
        },
      },
      {
        id: 'instalacion-multi-so',
        heading: '2. Instalación según tu Sistema Operativo o Gestor',
        body: 'Elige tu plataforma preferida para instalar Ollama con un solo comando verificado:',
        tabs: [
          {
            label: 'Windows (winget)',
            command: `# Instalar Ollama oficial en Windows vía winget:\nwinget install Ollama.Ollama\n\n# Verificar la instalación:\nollama --version`,
          },
          {
            label: 'macOS (Homebrew)',
            command: `# Instalar en macOS con Homebrew:\nbrew install ollama\n\n# Iniciar el servicio en segundo plano:\nbrew services start ollama`,
          },
          {
            label: 'Linux (Script oficial)',
            command: `# Instalar en Ubuntu, Debian, Fedora o Arch:\ncurl -fsSL https://ollama.com/install.sh | sh\n\n# Verificar que systemd haya iniciado el servicio:\nsudo systemctl status ollama`,
          },
          {
            label: 'Docker Container',
            command: `# Ejecutar con soporte de GPU NVIDIA en Docker:\ndocker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama\n\n# Comprobar logs del contenedor:\ndocker logs -f ollama`,
          },
        ],
      },
      {
        id: 'descargar-modelos',
        heading: '3. Descargar y Ejecutar DeepSeek R1 y Llama 3',
        body: 'Ollama descarga los pesos cuantizados en formato GGUF de alta eficiencia. Elige el modelo según tu capacidad de memoria:',
        tabs: [
          {
            label: 'DeepSeek R1 (8B)',
            command: `# Modelo de razonamiento óptimo para PCs con 8GB VRAM / 16GB RAM:\nollama run deepseek-r1:8b`,
          },
          {
            label: 'DeepSeek R1 (14B)',
            command: `# Mayor profundidad de razonamiento (requiere 12GB VRAM / 24GB RAM):\nollama run deepseek-r1:14b`,
          },
          {
            label: 'Llama 3.3 (70B)',
            command: `# El estándar de Meta (requiere 40GB+ de memoria combinada):\nollama run llama3.3:70b`,
          },
          {
            label: 'Qwen 2.5 Coder (32B)',
            command: `# Especialista líder en programación y refactorización:\nollama run qwen2.5-coder:32b`,
          },
        ],
        callout: {
          type: 'note',
          text: 'Durante la ejecución de DeepSeek R1, verás el bloque de pensamiento deliberativo <think>...</think> antes de la respuesta final, permitiéndote auditar el razonamiento matemático o lógico del modelo.',
        },
      },
      {
        id: 'configuracion-api',
        heading: '4. Exponer la API Local compatible con OpenAI',
        body: 'Ollama incluye por defecto un servidor HTTP que escucha en http://localhost:11434. Esta API es compatible con la especificación de OpenAI, lo que significa que puedes conectar cualquier software como Cursor, n8n o LibreChat apuntando a este endpoint.',
        tabs: [
          {
            label: 'cURL / Bash',
            command: `curl http://localhost:11434/api/generate -d '{\n  "model": "deepseek-r1:8b",\n  "prompt": "¿Por qué el cielo es azul?",\n  "stream": false\n}'`,
          },
          {
            label: 'PowerShell',
            command: `$body = @{\n    model = "deepseek-r1:8b"\n    prompt = "¿Por qué el cielo es azul?"\n    stream = $false\n} | ConvertTo-Json\n\nInvoke-RestMethod -Uri "http://localhost:11434/api/generate" -Method Post -Body $body -ContentType "application/json"`,
          },
          {
            label: 'Node.js / TypeScript',
            command: `import { OpenAI } from "openai";\n\nconst client = new OpenAI({\n  baseURL: "http://localhost:11434/v1",\n  apiKey: "ollama", // No requiere clave real\n});\n\nconst response = await client.chat.completions.create({\n  model: "deepseek-r1:8b",\n  messages: [{ role: "user", content: "Explica qué es un puntero en C." }],\n});\nconsole.log(response.choices[0].message.content);`,
          },
        ],
      },
      {
        id: 'interfaz-grafica',
        heading: '5. Conectar Ollama con una Interfaz Web (Open WebUI)',
        body: 'Si prefieres una experiencia visual idéntica a ChatGPT pero 100% privada y local, puedes conectar Ollama con Open WebUI ejecutando un contenedor ligero de Docker:',
        tabs: [
          {
            label: 'Docker Run',
            command: `docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main`,
          },
        ],
      },
    ],
    faqs: [
      {
        q: '¿Ollama envía mis datos a servidores externos?',
        a: 'No. Todo el procesamiento de tokens, prompts y respuestas se realiza 100% en local en el hardware de tu máquina. No requiere conexión a internet tras descargar el modelo.',
      },
      {
        q: '¿Puedo correr Ollama si no tengo tarjeta gráfica dedicada?',
        a: 'Sí. Ollama tiene soporte automático para inferencia en CPU con cuantización GGUF. La velocidad será menor (entre 5 y 15 tokens por segundo), pero completamente funcional.',
      },
    ],
  },
  {
    slug: 'automatizar-notificaciones-n8n-telegram',
    title: 'Crea un bot de alertas inteligentes con n8n, OpenAI y Telegram en 15 minutos',
    category: 'Automatización',
    description: 'Aprende a capturar eventos de tus aplicaciones, resumirlos con GPT-4o-mini y enviarte notificaciones accionables por Telegram sin escribir código complejo.',
    author: 'Equipo Técnico de DigitalStack',
    date: '12 de Noviembre, 2026',
    readTime: '10 min de lectura',
    tags: ['n8n', 'OpenAI', 'Telegram', 'Workflows', 'No-Code'],
    pillBg: 'bg-[#ede9fe] text-[#6b21a8]',
    toc: [
      { id: 'instalacion-n8n', text: '1. Instalación de n8n (Docker / npm)' },
      { id: 'diagrama-flujo', text: '2. Arquitectura del Flujo y Nodos' },
      { id: 'preparativos', text: '3. Token de Bot con @BotFather' },
      { id: 'configuracion-nodos', text: '4. Configuración de Parámetros' },
    ],
    contentSections: [
      {
        id: 'instalacion-n8n',
        heading: '1. Instalación de n8n según tu entorno',
        body: 'Puedes correr n8n al instante utilizando Docker (la opción recomendada para producción con persistencia) o mediante npx para pruebas rápidas:',
        tabs: [
          {
            label: 'Docker (Recomendado)',
            command: `# Ejecutar n8n con volumen persistente en puerto 5678:\ndocker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n --restart always docker.n8n.io/n8nio/n8n\n\n# Abre en tu navegador:\n# http://localhost:5678`,
          },
          {
            label: 'Docker Compose',
            command: `version: "3.7"\nservices:\n  n8n:\n    image: docker.n8n.io/n8nio/n8n\n    restart: always\n    ports:\n      - "5678:5678"\n    environment:\n      - N8N_HOST=localhost\n      - WEBHOOK_URL=http://localhost:5678/\n    volumes:\n      - n8n_data:/home/node/.n8n\nvolumes:\n  n8n_data:`,
          },
          {
            label: 'npm / npx',
            command: `# Ejecución rápida sin instalar Docker (requiere Node.js 18+):\nnpx n8n`,
          },
        ],
      },
      {
        id: 'diagrama-flujo',
        heading: '2. Arquitectura del Flujo Interactivo de n8n',
        body: 'A continuación tienes el diagrama visual del flujo con los 4 nodos conectados. Puedes hacer clic en cada nodo para inspeccionar sus parámetros y expresiones exactas:',
        showWorkflowViewer: true,
      },
      {
        id: 'preparativos',
        heading: '3. Creación del Bot de Telegram con @BotFather',
        body: 'Para que n8n pueda enviar alertas a tu teléfono o grupo:',
        tabs: [
          {
            label: 'Comandos en Telegram',
            command: `# 1. Abre Telegram y busca al bot oficial @BotFather\n# 2. Envía el comando:\n/newbot\n\n# 3. Asigna nombre y usuario (ej. MisAlertasBot)\n# 4. Copia el token HTTP API generado (ej. 712938123:AAH7...)\n# 5. Escribe a tu nuevo bot cualquier mensaje para iniciar el chat`,
          },
        ],
      },
      {
        id: 'configuracion-nodos',
        heading: '4. Expresiones y mapeo de datos entre nodos',
        body: 'En n8n, los datos fluyen como objetos JSON. Para transferir los datos del Webhook a Telegram, utiliza la sintaxis de expresiones con doble llave:',
        tabs: [
          {
            label: 'Expresiones n8n',
            command: `# Remitente del lead capturado por el Webhook:\n{{ $node["Webhook Trigger"].json.body.from }}\n\n# Resumen generado por OpenAI:\n{{ $json.resumen }}\n\n# Prioridad calculada por el modelo:\n{{ $json.prioridad }}`,
          },
        ],
        callout: {
          type: 'tip',
          text: 'Con GPT-4o-mini cada llamada de triaje cuesta menos de $0.0001 USD. 10,000 alertas procesadas mensualmente representan menos de $1 USD en tu factura de OpenAI.',
        },
      },
    ],
    faqs: [
      {
        q: '¿Cómo hago para que el Webhook reciba datos desde internet si tengo n8n en localhost?',
        a: 'Puedes utilizar el túnel integrado de n8n iniciando con "n8n start --tunnel", o bien utilizar Cloudflare Tunnels o ngrok para exponer el puerto 5678 de forma segura.',
      },
    ],
  },
  {
    slug: 'guia-prompt-engineering-avanzado',
    title: 'Guía de Prompt Engineering Avanzado: De Zero-Shot a Reasoning Trees',
    category: 'Inteligencia Artificial',
    description: 'Técnicas estructuradas con ejemplos reales para reducir alucinaciones, asegurar formatos JSON consistentes y guiar modelos de razonamiento.',
    author: 'Equipo Técnico de DigitalStack',
    date: '10 de Noviembre, 2026',
    readTime: '12 min de lectura',
    tags: ['Prompts', 'LLMs', 'JSON', 'Estrategia', 'Ingeniería'],
    pillBg: 'bg-[#fef9c3] text-[#713f12]',
    toc: [
      { id: 'delimitadores', text: '1. El Poder de los Delimitadores XML' },
      { id: 'marco-crispe', text: '2. El Marco CRISPE para Roles' },
      { id: 'structured-outputs', text: '3. Respuestas en JSON Estricto' },
    ],
    contentSections: [
      {
        id: 'delimitadores',
        heading: '1. El Poder de los Delimitadores XML en Prompts Complejos',
        body: 'Los modelos entrenados recientemente (como Claude 3.5 y GPT-4o) procesan etiquetas tipo XML (<instructions>, <context>, <examples>, <rules>) con una atención significativamente más alta que párrafos planos.',
        tabs: [
          {
            label: 'Estructura XML',
            command: `<system_role>\nEres un arquitecto de software senior especializado en TypeScript y Astro.\n</system_role>\n\n<context>\nEstamos construyendo un portal web estático de alto rendimiento.\n</context>\n\n<rules>\n- NUNCA utilices librerías pesadas en cliente.\n- Devuelve la respuesta en formato JSON estrictamente válido.\n</rules>`,
          },
        ],
      },
      {
        id: 'marco-crispe',
        heading: '2. El Marco CRISPE para Ingeniería de Prompts',
        body: 'CRISPE se divide en: Capacity (Capacidad), Role (Rol), Insight (Contexto previo), Statement (Instrucción directa), Personality (Tono deseado) y Experiment (Variantes o ejemplos esperados).',
      },
      {
        id: 'structured-outputs',
        heading: '3. Respuestas en JSON Estricto para Integraciones',
        body: 'Para evitar que un modelo añada texto conversacional como "Claro, aquí tienes tu JSON:", utiliza schemas Zod en la llamada a la API o instrucciones de respuesta pura sin rodeos.',
        tabs: [
          {
            label: 'TypeScript con Zod',
            command: `import { z } from "zod";\n\nconst ResponseSchema = z.object({\n  prioridad: z.enum(["Alta", "Media", "Baja"]),\n  resumen: z.string().max(200),\n  accion_inmediata: z.string(),\n});`,
          },
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué es mejor: Few-Shot o Zero-Shot?',
        a: 'Para tareas complejas de clasificación o extracción de entidades, incluir 2 o 3 ejemplos reales (Few-Shot) eleva la precisión del modelo por encima del 95% comparado con pedirlo en frío (Zero-Shot).',
      },
    ],
  },
  {
    slug: 'configurar-cursor-ide-desarrolladores',
    title: 'Cómo configurar Cursor IDE para multiplicar tu velocidad de programación',
    category: 'Productividad',
    description: 'Ajustes del archivo .cursorrules, selección de modelos (Claude 3.5 Sonnet vs GPT-4o) y atajos esenciales de flujo de trabajo.',
    author: 'Equipo Técnico de DigitalStack',
    date: '08 de Noviembre, 2026',
    readTime: '10 min de lectura',
    tags: ['Cursor', 'VS Code', 'Dev', 'Productividad'],
    pillBg: 'bg-[#fce7f3] text-[#9d174d]',
    toc: [
      { id: 'archivo-cursorrules', text: '1. Configuración de .cursorrules' },
      { id: 'modo-composer', text: '2. Dominando el Modo Composer' },
      { id: 'modelos', text: '3. Cuándo usar Claude 3.5 vs GPT-4o' },
    ],
    contentSections: [
      {
        id: 'archivo-cursorrules',
        heading: '1. Configuración del archivo .cursorrules en la raíz del proyecto',
        body: 'El archivo .cursorrules actúa como las directivas permanentes del sistema. Al colocarlo en la raíz de tu repositorio, Cursor aplicará estas normas en cada generación de código sin que tengas que repetirlas.',
        tabs: [
          {
            label: '.cursorrules',
            command: `# Directivas para Cursor\n- Lenguaje: TypeScript estricto.\n- Framework: Astro 5.x con Tailwind CSS v4.\n- Regla visual: Cero degradados, utilizar colores planos y sólidos.\n- Escribe código conciso, modular y sin código muerto.`,
          },
        ],
      },
      {
        id: 'modo-composer',
        heading: '2. Dominando el Modo Composer (Ctrl + I / Cmd + I)',
        body: 'Composer no es solo un chat; es un agente de refactorización multi-archivo. Puedes indicarle "crea un nuevo componente de tabla y conéctalo en la página de inicio", y Composer generará los archivos y modificará las importaciones necesarias en una sola pasada.',
      },
      {
        id: 'modelos',
        heading: '3. Selección de Modelo: Claude 3.5 Sonnet como motor predeterminado',
        body: 'En los ajustes de Cursor, activa Claude 3.5 Sonnet como modelo principal para generación de código y Composer. Su capacidad para respetar estructuras sintácticas complejas supera a cualquier otro modelo actual.',
      },
    ],
    faqs: [
      {
        q: '¿Puedo importar mis extensiones de VS Code?',
        a: 'Sí. Al instalar Cursor, te ofrece la opción de importar todas tus extensiones, temas y combinaciones de teclas de Visual Studio Code en 1 clic.',
      },
    ],
  },
];
