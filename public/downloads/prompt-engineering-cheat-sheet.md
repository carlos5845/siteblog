# Cheatsheet: Parámetros e Ingeniería de Prompts de LLMs
**DigitalStack — Portal Tecnológico**

---

## 1. Hiperparámetros de API
* **Temperature (0.0 a 2.0):**
  * `0.0 - 0.2`: Código, extracción de datos, respuestas deterministas, JSON estricto.
  * `0.5 - 0.7`: Redacción analítica, resúmenes, traducción equilibrada.
  * `0.8 - 1.2`: Lluvia de ideas, generación de ideas creativas, redacción libre.
* **Top_p (Nucleus Sampling):** Alternativa a temperature. Limita el muestreo al porcentaje acumulativo más probable. Usar temperature O top_p, no ambos a la vez.
* **Presence Penalty (-2.0 a 2.0):** Valores positivos penalizan la repetición de palabras ya mencionadas, fomentando variedad léxica.
* **Frequency Penalty (-2.0 a 2.0):** Penaliza según la frecuencia de repetición del término en el texto.

---

## 2. Estructura de Prompt Profesional (Delimitadores XML)
```xml
<system_role>
Eres un arquitecto de software senior con 10 años de experiencia en TypeScript.
</system_role>

<context>
Estamos construyendo un microservicio de alto rendimiento.
</context>

<instructions>
1. Analiza el problema y genera la solución modular.
2. Escribe código tipado sin usar 'any'.
</instructions>

<output_format>
Código TypeScript limpio con manejo de excepciones.
</output_format>
```
