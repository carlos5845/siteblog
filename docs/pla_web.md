# PLAN MAESTRO DE EJECUCIÓN TÉCNICA
## Portal de Inteligencia Artificial, Tecnología y Productividad Digital

**Tipo de proyecto:** Portal tecnológico y editorial.  
**Framework:** Astro.  
**Lenguaje:** TypeScript.  
**Estilos:** Tailwind CSS.  
**Contenido:** Markdown / MDX.  
**Interactividad:** React + TypeScript.  
**Monetización:** Google AdSense, afiliación y productos digitales.  
**Objetivo principal:** Construir una plataforma tecnológica optimizada para SEO, rendimiento, experiencia de usuario y monetización.

---

# 1. DESCRIPCIÓN GENERAL DEL PROYECTO

## 1.1. Visión

Desarrollar un portal digital especializado en inteligencia artificial, automatización, productividad y tecnología.

La plataforma combinará cinco componentes principales:

1. Centro de conocimiento: tutoriales y guías prácticas.
2. Directorio tecnológico: fichas de herramientas y software.
3. Centro de comparativas: análisis de herramientas y servicios.
4. Laboratorio de utilidades: aplicaciones interactivas gratuitas.
5. Centro de recursos: plantillas, prompts y materiales descargables.

## 1.2. Público objetivo

- Estudiantes universitarios.
- Desarrolladores.
- Profesionales independientes.
- Emprendedores digitales.
- Pequeñas empresas.
- Personas interesadas en IA.
- Usuarios interesados en productividad y automatización.

## 1.3. Objetivos del proyecto

- Construir una plataforma rápida y escalable.
- Conseguir tráfico orgánico mediante Google.
- Desarrollar autoridad temática en sus categorías.
- Crear contenido original y útil.
- Implementar herramientas interactivas.
- Conseguir aprobación para Google AdSense.
- Diversificar las fuentes de ingresos.
- Facilitar la publicación y actualización de contenidos.

---

# 2. STACK TECNOLÓGICO

## 2.1. Tecnologías principales

| Tecnología | Responsabilidad |
|---|---|
| Astro | Framework principal y generación de páginas. |
| TypeScript | Tipado y mantenimiento. |
| Tailwind CSS | Diseño y estilos. |
| React | Componentes interactivos. |
| MDX | Contenidos enriquecidos. |
| Astro Content Layer | Gestión de colecciones. |
| Zod | Validación de datos. |
| Lucide | Iconografía. |
| Mermaid.js | Diagramas técnicos. |
| Sharp | Optimización de imágenes. |
| GSAP | Animaciones puntuales. |

## 2.2. Criterios tecnológicos

- Priorizar la generación estática de páginas cuando sea apropiado.
- Utilizar Astro como arquitectura principal.
- Evitar convertir todo el proyecto en una SPA.
- Utilizar React únicamente donde exista interactividad real.
- Mantener TypeScript en componentes y utilidades.
- Evitar dependencias innecesarias.
- Optimizar el JavaScript enviado al navegador.
- Mantener componentes reutilizables.
- Priorizar accesibilidad y rendimiento.

---

# 3. ARQUITECTURA GENERAL DEL PROYECTO

La estructura inicial será la siguiente:

```text
portal-tecnologico/
│
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── images/
│   └── fonts/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── logos/
│   │   └── illustrations/
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── home/
│   │   ├── articles/
│   │   ├── tools/
│   │   ├── comparisons/
│   │   ├── utilities/
│   │   ├── ads/
│   │   ├── seo/
│   │   └── common/
│   │
│   ├── content/
│   │   ├── guides/
│   │   ├── articles/
│   │   ├── tools/
│   │   ├── comparisons/
│   │   ├── resources/
│   │   └── authors/
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ArticleLayout.astro
│   │   ├── ToolLayout.astro
│   │   └── CategoryLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── inteligencia-artificial/
│   │   ├── automatizacion/
│   │   ├── productividad/
│   │   ├── guias/
│   │   ├── herramientas/
│   │   ├── comparativas/
│   │   ├── utilidades/
│   │   ├── recursos/
│   │   ├── sobre-nosotros.astro
│   │   ├── contacto.astro
│   │   ├── privacidad.astro
│   │   ├── terminos.astro
│   │   └── politica-editorial.astro
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── utils/
│   │   ├── seo.ts
│   │   ├── schema.ts
│   │   ├── readingTime.ts
│   │   ├── relatedContent.ts
│   │   └── formatDate.ts
│   │
│   └── content.config.ts
│
├── docs/
│   ├── PLAN_EJECUCION_TECNICA.md
│   ├── ARQUITECTURA.md
│   ├── ESTRATEGIA_SEO.md
│   ├── ESTRATEGIA_EDITORIAL.md
│   ├── DISENO_UI_UX.md
│   └── MONETIZACION.md
│
├── AGENTS.md
├── README.md
├── TASKS.md
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── .gitignore
```

La estructura podrá evolucionar durante el desarrollo, pero cualquier modificación deberá mantener la separación entre contenido, presentación, lógica y configuración.

---

# 4. SISTEMA DE CONTENIDOS

Se utilizará Astro Content Layer para gestionar el contenido editorial.

Las colecciones se definirán en:

`src/content.config.ts`

Se utilizarán loaders compatibles con la versión instalada de Astro y esquemas Zod.

## 4.1. Colección: guides

Directorio:

`src/content/guides/`

Contendrá tutoriales técnicos y guías paso a paso.

Campos:

- title
- description
- pubDate
- updatedDate
- author
- category
- tags
- cover
- difficulty
- readingTime
- featured
- draft
- relatedContent

## 4.2. Colección: articles

Directorio:

`src/content/articles/`

Contendrá artículos informativos y análisis tecnológicos.

Campos:

- title
- description
- pubDate
- updatedDate
- author
- category
- tags
- cover
- featured
- draft

## 4.3. Colección: tools

Directorio:

`src/content/tools/`

Contendrá las fichas del directorio tecnológico.

Campos:

- name
- description
- website
- category
- pricing
- platforms
- openSource
- logo
- alternatives
- features
- limitations
- lastVerified
- author
- draft

## 4.4. Colección: comparisons

Directorio:

`src/content/comparisons/`

Contendrá comparativas entre herramientas.

Campos:

- title
- description
- pubDate
- updatedDate
- tools
- category
- cover
- author
- featured
- draft

## 4.5. Colección: resources

Directorio:

`src/content/resources/`

Contendrá recursos descargables.

Campos:

- title
- description
- type
- category
- downloadUrl
- cover
- pubDate
- author

## 4.6. Colección: authors

Directorio:

`src/content/authors/`

Permitirá gestionar autores y sus perfiles.

Campos:

- name
- bio
- avatar
- role
- website
- socialLinks

## 4.7. Reglas para las colecciones

- Todos los contenidos deben tener título y descripción.
- Los slugs deben ser únicos.
- Las fechas deben estar correctamente definidas.
- Los contenidos en borrador no deben publicarse.
- Las imágenes destacadas deben estar optimizadas.
- Los enlaces internos deben ser válidos.
- Los contenidos deben disponer de autor.
- Las herramientas deben indicar cuándo se verificaron sus datos.
- No publicar precios sin verificar su vigencia.

---

# 5. SISTEMA DE RUTAS

Las rutas principales serán:

| Ruta | Función |
|---|---|
| `/` | Página principal. |
| `/inteligencia-artificial/` | Categoría de IA. |
| `/automatizacion/` | Categoría de automatización. |
| `/productividad/` | Categoría de productividad. |
| `/guias/` | Índice de tutoriales. |
| `/guias/[slug]/` | Tutorial individual. |
| `/herramientas/` | Directorio tecnológico. |
| `/herramientas/[slug]/` | Ficha individual. |
| `/comparativas/` | Índice de comparativas. |
| `/comparativas/[slug]/` | Comparativa individual. |
| `/utilidades/` | Índice de utilidades. |
| `/recursos/` | Biblioteca de recursos. |
| `/sobre-nosotros/` | Información del proyecto. |
| `/contacto/` | Formulario de contacto. |
| `/privacidad/` | Política de privacidad. |
| `/terminos/` | Términos de uso. |
| `/politica-editorial/` | Política editorial. |

Las rutas dinámicas deberán generarse desde las colecciones correspondientes.

Las categorías podrán tener páginas individuales cuando dispongan de contenido y una finalidad de búsqueda definida.

---

# 6. PLAN DE EJECUCIÓN POR FASES

# FASE 1. PLANIFICACIÓN Y CONFIGURACIÓN INICIAL

**Objetivo:** establecer la base técnica y organizativa.

### Actividades

1. Crear el proyecto Astro.
2. Configurar TypeScript.
3. Configurar Tailwind CSS.
4. Configurar estructura de carpetas.
5. Instalar Lucide.
6. Configurar alias de importación.
7. Crear archivo global de estilos.
8. Configurar ESLint y Prettier si corresponde.
9. Configurar scripts de desarrollo y compilación.
10. Crear documentación inicial.
11. Crear AGENTS.md.
12. Crear TASKS.md.
13. Verificar funcionamiento del proyecto.

### Entregables

- Proyecto Astro funcional.
- Estructura inicial.
- Dependencias configuradas.
- Documentación básica.

### Criterios de aceptación

- El servidor de desarrollo funciona.
- TypeScript no presenta errores.
- La compilación inicial funciona.
- Las dependencias están correctamente instaladas.
- La estructura de carpetas está creada.
- No existen errores críticos en consola.

---

# FASE 2. SISTEMA DE DISEÑO Y COMPONENTES BASE

**Objetivo:** establecer la identidad visual y los componentes reutilizables.

### Actividades

1. Definir paleta de colores.
2. Definir tipografías.
3. Definir escalas de tamaños.
4. Definir espaciados.
5. Definir estilos de botones.
6. Definir tarjetas.
7. Definir etiquetas y badges.
8. Crear sistema de iconografía.
9. Crear estados hover y focus.
10. Crear estilos responsive.

### Componentes

**Layout**

- Header
- Footer
- MainContainer
- PageContainer

**Navegación**

- DesktopNavigation
- MobileNavigation
- DropdownMenu
- Breadcrumbs

**Componentes comunes**

- Button
- Badge
- SearchInput
- SectionHeading
- NewsletterForm
- Pagination
- BackToTop

### Criterios de aceptación

- Los componentes son reutilizables.
- La identidad visual es consistente.
- La navegación funciona en escritorio y móvil.
- Los elementos tienen estados accesibles.
- No existe desbordamiento horizontal.
- Los componentes se pueden reutilizar sin duplicar código.

---

# FASE 3. DESARROLLO DE LA PÁGINA PRINCIPAL

**Objetivo:** construir la página de inicio del portal.

### Secciones

1. Hero principal.
2. Buscador global.
3. Categorías principales.
4. Guías destacadas.
5. Herramientas recomendadas.
6. Utilidades gratuitas.
7. Comparativas destacadas.
8. Últimos artículos.
9. Recursos destacados.
10. Newsletter.
11. Footer.

### Componentes

- HeroSection
- GlobalSearch
- CategoryGrid
- FeaturedGuides
- FeaturedTools
- UtilitiesGrid
- FeaturedComparisons
- LatestArticles
- FeaturedResources
- NewsletterSection

### Criterios de aceptación

- Todas las secciones funcionan.
- Los contenidos se obtienen de las colecciones.
- Los enlaces llevan a las rutas correspondientes.
- El diseño funciona en dispositivos móviles.
- Las imágenes están optimizadas.
- Los contenidos destacados se pueden controlar desde sus metadatos.
- La página tiene metadatos SEO propios.

---

# FASE 4. SISTEMA DE CONTENT COLLECTIONS

**Objetivo:** construir el sistema editorial que permitirá publicar contenido sin desarrollar manualmente cada página.

### Actividades

1. Crear `src/content.config.ts`.
2. Definir loaders.
3. Crear esquemas Zod.
4. Configurar colección guides.
5. Configurar colección articles.
6. Configurar colección tools.
7. Configurar colección comparisons.
8. Configurar colección resources.
9. Configurar colección authors.
10. Crear contenidos de prueba.
11. Validar los esquemas.
12. Crear funciones para consultar contenidos.
13. Crear funciones para filtrar borradores.
14. Crear funciones para ordenar por fecha.

### Criterios de aceptación

- Todas las colecciones están registradas.
- Los esquemas validan los datos.
- Los contenidos pueden consultarse mediante las APIs de Astro.
- Los borradores no se muestran públicamente.
- Los errores de metadatos se detectan durante la compilación.
- Los contenidos pueden ampliarse sin modificar la arquitectura.

---

# FASE 5. SISTEMA DE PUBLICACIÓN DE ARTÍCULOS

**Objetivo:** desarrollar una plantilla reutilizable para guías y artículos.

### Componentes

- ArticleHeader
- ArticleMetadata
- ArticleCover
- ArticleSummary
- TableOfContents
- ArticleContent
- ReadingProgress
- AuthorCard
- RelatedArticles
- ShareButtons
- ArticleNavigation
- FAQSection

### Funcionalidades

- Calcular tiempo de lectura.
- Generar tabla de contenidos.
- Mostrar fechas.
- Mostrar autor.
- Mostrar imágenes.
- Insertar diagramas.
- Insertar bloques de código.
- Mostrar artículos relacionados.
- Mostrar fuentes externas.
- Permitir compartir el contenido.

### Criterios de aceptación

- Todos los artículos utilizan una plantilla común.
- Los encabezados generan una tabla de contenidos correcta.
- El contenido es legible en móvil.
- Los enlaces internos funcionan.
- Los bloques de código son legibles.
- El autor y las fechas se muestran correctamente.
- La plantilla permite publicar diferentes tipos de guías.

---

# FASE 6. DIRECTORIO DE HERRAMIENTAS

**Objetivo:** crear un catálogo de software tecnológico.

### Componentes

- ToolCard
- ToolHeader
- ToolLogo
- ToolFeatures
- ToolPricing
- ToolPlatforms
- ToolProsCons
- ToolAlternatives
- ToolRelatedContent

### Funcionalidades

- Listar herramientas.
- Filtrar por categoría.
- Filtrar por modelo de precios.
- Buscar herramientas.
- Mostrar alternativas.
- Mostrar características.
- Mostrar plataformas compatibles.
- Mostrar fecha de verificación.

### Criterios de aceptación

- Las herramientas se cargan desde su colección.
- Los filtros funcionan.
- Las fichas tienen una estructura consistente.
- Los enlaces oficiales funcionan.
- Los precios incluyen fecha de verificación.
- No existen fichas duplicadas.
- Las páginas individuales tienen metadatos propios.

---

# FASE 7. SISTEMA DE COMPARATIVAS

**Objetivo:** facilitar la comparación de diferentes soluciones tecnológicas.

### Componentes

- ComparisonHeader
- ComparisonTable
- ComparisonScore
- ComparisonVerdict
- ComparisonAdvantages
- ComparisonDisadvantages
- ComparisonFAQ
- RelatedComparisons

### Funcionalidades

- Comparar características.
- Comparar precios.
- Mostrar ventajas.
- Mostrar limitaciones.
- Mostrar diferencias.
- Presentar conclusiones.
- Enlazar fichas individuales.

### Criterios de aceptación

- Los datos comparados tienen fuentes.
- Los precios están verificados.
- Las tablas funcionan en dispositivos móviles.
- No se presentan valoraciones sin justificación.
- Las comparativas enlazan a las fichas correspondientes.

---

# FASE 8. DESARROLLO DE UTILIDADES INTERACTIVAS

**Objetivo:** construir aplicaciones gratuitas que aporten valor al usuario.

### Utilidad 1. Calculadora de costos de IA

Funcionalidades:

- Seleccionar proveedor.
- Seleccionar modelo.
- Introducir tokens.
- Calcular costo.
- Comparar modelos.
- Estimar consumo mensual.

Criterios de aceptación:

- Los cálculos son correctos.
- Los precios se mantienen en una fuente de datos verificable.
- Se muestra la fecha de actualización.
- Se informa que los resultados son estimaciones.
- No se envían datos innecesarios a servidores externos.

### Utilidad 2. Generador de prompts

Funcionalidades:

- Campo de rol.
- Campo de contexto.
- Campo de tarea.
- Campo de restricciones.
- Campo de formato.
- Generación del prompt.
- Copiar al portapapeles.

Criterios de aceptación:

- Todos los campos funcionan.
- El resultado se genera correctamente.
- El botón de copiar funciona.
- La aplicación no necesita un servidor para su funcionalidad básica.

### Utilidad 3. Calculadora de ahorro de tiempo

Funcionalidades:

- Tiempo de ejecución.
- Frecuencia.
- Tiempo automatizado.
- Costo por hora.
- Ahorro mensual.
- Ahorro anual.

Criterios de aceptación:

- Los cálculos son correctos.
- Se validan valores negativos.
- Se muestran resultados comprensibles.
- Se explica que son estimaciones.

### Utilidad 4. Generador CRON

Funcionalidades:

- Selección de frecuencia.
- Configuración de intervalos.
- Generación de expresión CRON.
- Descripción en lenguaje natural.
- Copiar expresión.

Criterios de aceptación:

- La expresión generada es válida para el formato seleccionado.
- Se explican los campos.
- Se contemplan diferencias entre implementaciones CRON.

### Criterios generales

- Responsive.
- Accesibles.
- Interactivas.
- Rápidas.
- Sin errores de JavaScript.
- Con validación de entradas.
- Con instrucciones de uso.
- Con contenido explicativo indexable.

---

# FASE 9. IMPLEMENTACIÓN DEL SEO TÉCNICO

**Objetivo:** garantizar que las páginas sean accesibles, rastreables y comprensibles para los motores de búsqueda.

### Actividades

1. Configurar dominio principal.
2. Configurar canonical.
3. Implementar títulos dinámicos.
4. Implementar meta descriptions.
5. Implementar Open Graph.
6. Implementar Twitter Cards.
7. Generar sitemap XML.
8. Configurar robots.txt.
9. Implementar breadcrumbs.
10. Implementar JSON-LD.
11. Crear página 404.
12. Configurar redirecciones.
13. Optimizar imágenes.
14. Revisar enlaces internos.
15. Detectar enlaces rotos.
16. Validar páginas indexables.
17. Evitar contenido duplicado.
18. Configurar paginación cuando corresponda.

### Datos estructurados

Implementar cuando corresponda:

- Organization.
- WebSite.
- Article.
- BlogPosting.
- BreadcrumbList.
- SoftwareApplication.

Los datos estructurados deben representar información visible y verificable de cada página.

No utilizar esquemas para declarar valoraciones, precios o características que no estén respaldados.

### Criterios de aceptación

- Sitemap accesible.
- Robots.txt accesible.
- Canonical correcto.
- Metadatos únicos.
- JSON-LD válido.
- Sin errores críticos de indexación.
- Sin enlaces internos rotos.
- Las páginas importantes son rastreables.

---

# FASE 10. OPTIMIZACIÓN DE RENDIMIENTO

**Objetivo:** garantizar una experiencia rápida.

### Actividades

1. Optimizar imágenes.
2. Utilizar formatos modernos.
3. Implementar dimensiones de imágenes.
4. Aplicar lazy loading cuando corresponda.
5. Evitar JavaScript innecesario.
6. Reducir dependencias.
7. Optimizar fuentes.
8. Revisar CSS.
9. Evitar cambios de layout.
10. Revisar carga de anuncios.
11. Optimizar componentes React.
12. Evaluar rendimiento móvil.

### Objetivos Core Web Vitals

| Métrica | Objetivo |
|---|---|
| LCP | ≤ 2.5 segundos |
| INP | < 200 ms |
| CLS | < 0.1 |

### Criterios de aceptación

- Se cumplen los objetivos de Core Web Vitals en los datos de campo cuando exista suficiente información.
- Las pruebas de laboratorio no presentan problemas graves.
- No existen imágenes innecesariamente pesadas.
- No existen desplazamientos importantes durante la carga.
- La experiencia móvil es adecuada.

---

# FASE 11. MONETIZACIÓN Y GOOGLE ADSENSE

**Objetivo:** preparar el portal para implementar publicidad sin perjudicar la experiencia de usuario.

### Actividades

1. Crear cuenta de AdSense.
2. Verificar el dominio.
3. Revisar políticas del programa.
4. Implementar el código publicitario cuando corresponda.
5. Crear componente AdUnit.
6. Crear contenedores publicitarios.
7. Definir ubicaciones.
8. Configurar consentimiento.
9. Implementar política de privacidad.
10. Revisar experiencia publicitaria.
11. Solicitar revisión del sitio.

### Componentes

- AdUnit
- AdContainer
- ArticleAd
- SidebarAd
- ConsentBanner

### Reglas

- No incentivar clics.
- No colocar anuncios junto a botones que puedan confundirse con ellos.
- No bloquear contenido.
- No generar clics artificiales.
- No sobrecargar las páginas.
- Reservar espacio para los anuncios cuando corresponda.
- No colocar publicidad que interfiera con las utilidades.

### Criterios de aceptación

- La integración cumple las políticas de AdSense.
- La política de privacidad está publicada.
- La experiencia de usuario se mantiene.
- El consentimiento se gestiona correctamente en las regiones aplicables.
- Los anuncios no generan problemas importantes de layout.

La aprobación de AdSense depende de la evaluación de Google y no puede garantizarse mediante una cantidad específica de artículos o páginas.

---

# FASE 12. PÁGINAS INSTITUCIONALES Y CONFIANZA

**Objetivo:** establecer transparencia y credibilidad.

### Páginas

- Sobre nosotros.
- Contacto.
- Política de privacidad.
- Términos y condiciones.
- Política editorial.

### Actividades

1. Crear página sobre nosotros.
2. Definir responsables editoriales.
3. Crear página de contacto.
4. Implementar formulario.
5. Crear política de privacidad.
6. Crear términos de uso.
7. Crear política editorial.
8. Añadir información sobre afiliación.
9. Añadir avisos de contenido patrocinado cuando corresponda.

### Criterios de aceptación

- Todas las páginas funcionan.
- Los enlaces están disponibles desde el footer.
- Los formularios tienen validación.
- Las políticas describen las prácticas reales del sitio.
- Los contenidos patrocinados se identifican claramente.

---

# FASE 13. ANALÍTICA Y MONITOREO

**Objetivo:** medir el crecimiento y detectar oportunidades.

### Herramientas

- Google Search Console.
- Google Analytics 4.
- Google AdSense.
- PageSpeed Insights.
- Bing Webmaster Tools.
- Microsoft Clarity, si corresponde.

### Actividades

1. Verificar propiedad del dominio.
2. Registrar sitemap.
3. Configurar Analytics.
4. Verificar eventos principales.
5. Revisar indexación.
6. Medir tráfico orgánico.
7. Analizar palabras clave.
8. Analizar páginas con mayor rendimiento.
9. Analizar ingresos.
10. Identificar contenidos que necesitan actualización.

### Indicadores principales

- Impresiones.
- Clics orgánicos.
- CTR.
- Posición media.
- Páginas indexadas.
- Sesiones orgánicas.
- Páginas vistas.
- Engagement.
- RPM.
- Ingresos publicitarios.
- Conversiones de afiliación.

### Criterios de aceptación

- Las herramientas están configuradas.
- Los datos principales se registran correctamente.
- Search Console verifica el dominio.
- El sitemap está enviado.
- Se pueden identificar las páginas que generan tráfico.

---

# 7. ESTRATEGIA EDITORIAL

## 7.1. Categorías iniciales

### Inteligencia Artificial

- Modelos de lenguaje.
- IA generativa.
- Herramientas de IA.
- Agentes inteligentes.
- IA local.
- APIs de IA.

### Automatización

- n8n.
- Make.
- Zapier.
- Docker.
- APIs.
- Integraciones.

### Productividad

- Notion.
- Obsidian.
- Gestión de proyectos.
- Organización personal.
- Aplicaciones digitales.

### Desarrollo tecnológico

- Git.
- GitHub.
- Supabase.
- Cloud computing.
- Desarrollo web.
- Herramientas para programadores.

## 7.2. Primera publicación

La primera etapa editorial tendrá como objetivo publicar entre 15 y 20 contenidos originales.

Distribución inicial:

- 6 guías de inteligencia artificial.
- 5 guías de automatización.
- 4 artículos de productividad.
- 3 fichas de herramientas.
- 2 comparativas.

Las publicaciones deberán seleccionarse según investigación de palabras clave, competencia e intención de búsqueda.

## 7.3. Estándar de calidad editorial

Cada contenido debe:

- Resolver una necesidad concreta.
- Tener información original.
- Utilizar fuentes confiables.
- Incluir ejemplos prácticos.
- Incorporar capturas propias cuando aporten valor.
- Incluir diagramas cuando sean útiles.
- Mostrar autor.
- Indicar fecha de publicación.
- Indicar fecha de actualización cuando corresponda.
- Tener enlaces internos relevantes.
- Evitar información inventada.
- Evitar repetir contenido de otras páginas.

No publicar artículos generados automáticamente sin revisión editorial y verificación.

---

# 8. ESTRATEGIA DE ENLAZADO INTERNO

Se implementará un sistema de contenido relacionado.

Ejemplo:

Artículo:
Cómo instalar n8n con Docker.

Enlaces relacionados:

- Qué es n8n.
- Cómo instalar Docker.
- Cómo crear automatizaciones.
- n8n vs Make.
- Ficha de n8n.
- Cómo instalar n8n en un VPS.

Reglas:

1. Los enlaces deben ser contextuales.
2. Los textos ancla deben describir el destino.
3. Evitar enlaces artificiales.
4. Evitar páginas huérfanas.
5. Priorizar los contenidos centrales de cada categoría.
6. Incluir breadcrumbs.
7. Mantener una arquitectura de navegación coherente.

---

# 9. ROADMAP GENERAL

| Fase | Módulo | Prioridad | Estado |
|---|---|---|---|
| 1 | Configuración inicial | Crítica | Pendiente |
| 2 | Sistema de diseño | Alta | Pendiente |
| 3 | Página principal | Alta | Pendiente |
| 4 | Content Collections | Crítica | Pendiente |
| 5 | Sistema editorial | Crítica | Pendiente |
| 6 | Directorio de herramientas | Alta | Pendiente |
| 7 | Comparativas | Media | Pendiente |
| 8 | Utilidades interactivas | Alta | Pendiente |
| 9 | SEO técnico | Crítica | Pendiente |
| 10 | Rendimiento | Alta | Pendiente |
| 11 | AdSense | Alta | Pendiente |
| 12 | Páginas institucionales | Alta | Pendiente |
| 13 | Analítica | Alta | Pendiente |

Estados permitidos:

- Pendiente.
- En progreso.
- En revisión.
- Completado.
- Bloqueado.

Una fase no se considerará completada solamente porque se haya escrito el código.

Debe superar sus criterios de aceptación.

---

# 10. REGLAS DE TRABAJO PARA EL AGENTE DE IA

El agente deberá cumplir las siguientes instrucciones:

## 10.1. Antes de desarrollar

1. Leer AGENTS.md.
2. Leer este documento.
3. Revisar la estructura actual.
4. Revisar package.json.
5. Identificar tecnologías instaladas.
6. Verificar la fase actual.
7. Presentar un resumen de actividades.

## 10.2. Durante el desarrollo

- Trabajar por módulos.
- No desarrollar todas las fases simultáneamente.
- No duplicar componentes.
- No modificar archivos innecesariamente.
- No instalar dependencias sin justificación.
- Respetar los esquemas de contenido.
- Mantener consistencia visual.
- Priorizar accesibilidad.
- Mantener buenas prácticas SEO.
- Evitar código innecesariamente complejo.

## 10.3. Antes de finalizar un módulo

El agente deberá:

1. Ejecutar compilación.
2. Revisar errores TypeScript.
3. Revisar consola.
4. Probar funcionalidades.
5. Revisar versión móvil.
6. Revisar enlaces.
7. Comprobar criterios de aceptación.
8. Documentar los cambios.

## 10.4. Informe de finalización

Al terminar cada fase, el agente deberá presentar:

**Fase completada:**

Nombre de la fase.

**Archivos creados:**

Lista de archivos.

**Archivos modificados:**

Lista de archivos.

**Funcionalidades implementadas:**

Descripción.

**Pruebas realizadas:**

Resultados.

**Criterios de aceptación:**

- Cumplidos.
- Pendientes.

**Problemas detectados:**

Descripción.

**Siguiente fase:**

Actividades recomendadas.

El agente no deberá marcar una fase como completada si existen criterios obligatorios pendientes.

---

# 11. CRITERIOS GLOBALES DE CALIDAD

El proyecto deberá cumplir estos principios:

### Arquitectura

- Código modular.
- Componentes reutilizables.
- Separación de responsabilidades.
- Tipado adecuado.
- Estructura escalable.

### Diseño

- Responsive.
- Accesible.
- Consistente.
- Navegación intuitiva.
- Buena legibilidad.

### SEO

- URLs descriptivas.
- Metadatos únicos.
- Canonical.
- Sitemap.
- Enlazado interno.
- Datos estructurados válidos.
- Contenido original.

### Rendimiento

- Imágenes optimizadas.
- JavaScript reducido.
- CSS optimizado.
- Carga eficiente.
- Core Web Vitals.

### Seguridad y privacidad

- No exponer credenciales.
- Validar formularios.
- Proteger variables de entorno.
- Gestionar correctamente datos personales.
- Implementar consentimiento cuando corresponda.

### Monetización

- Cumplir políticas de AdSense.
- Identificar contenido patrocinado.
- No incentivar clics.
- No perjudicar la navegación.
- Diversificar ingresos.

---

# 12. CONDICIÓN FINAL DEL PROYECTO

El proyecto se considerará listo para su lanzamiento cuando:

1. La arquitectura esté implementada.
2. Las páginas principales funcionen.
3. Las colecciones estén configuradas.
4. El sistema editorial esté operativo.
5. Existan contenidos originales.
6. El directorio de herramientas funcione.
7. Las utilidades principales estén implementadas.
8. El SEO técnico esté configurado.
9. El diseño responsive esté validado.
10. Las páginas institucionales estén publicadas.
11. Search Console y Analytics estén configurados.
12. La web esté desplegada con HTTPS.
13. No existan errores críticos.
14. Se hayan revisado las políticas de monetización.

**Importante:** el lanzamiento del portal y la aprobación de Google AdSense son hitos diferentes. El segundo depende de la evaluación de Google.

---

# FIN DEL DOCUMENTO

Este documento constituye la hoja maestra de ejecución técnica.

Cualquier modificación importante de arquitectura, tecnologías, colecciones o criterios de aceptación deberá documentarse antes de implementarse.
