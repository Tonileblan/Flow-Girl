# 📄 PRD para Google Stitch / Generador de Interfaces UI
# Proyecto: Flow-Girl — Ecosistema Clínico de Salud Hormonal Femenina

> **Instrucciones para Stitch / AI UI Designer:**  
> Utiliza este documento como especificación funcional y visual integral para generar el flujo de pantallas, componentes interactivos y wireframes de alta fidelidad para la aplicación web/móvil **Flow-Girl**.

---

## 1. 🎯 Visión del Producto & Filosofía de Diseño

* **Categoría:** Salud Femenina / Perimenopausia & Menopausia de Precisión (FemTech de Alta Gama).
* **Público Objetivo:** Mujeres entre 38 y 58 años en transición perimenopáusica y menopáusica.
* **Tono Visual & Emocional:** **"Bio-Minimalismo Sofisticado"**. Rechazo absoluto a los clichés de diseño infantilizados o rosas ("anti-pink-washing"). Elegante, terapéutico, sosegado, científico y de máxima claridad cognitiva.
* **Principios Clave:**
  1. **Reducción de Cortisol Visual:** Espacios amplios ("Cloud Dancer"), tipografía limpia, microinteracciones suaves.
  2. **One-Tap / Low-Cognitive-Load:** Registro de biomarcadores rápido y sin fricción mental.
  3. **Accesibilidad WCAG AAA & Ergonomía:** Áreas táctiles generosas ($\ge 48\text{px}$) pensando en usuarias con rigidez articular; alto contraste sin estridencias.
  4. **Modo Noche Circadiano:** Interfaz ultra-cálida y oscura de baja emisión de luz azul para uso nocturno durante episodios de insomnio o sofocos.

---

## 2. 🎨 Tokens de Diseño & Sistema Visual

### 2.1 Paleta Cromática Primaria (Tendencias 2026)
| Token | HEX | Nombre | Rol en la Interfaz |
| :--- | :--- | :--- | :--- |
| `--color-teal-primary` | `#008080` | **Transformative Teal** | Color primario de marca, botones de acción principal (CTA), indicadores de estado de equilibrio. |
| `--color-cloud-bg` | `#F5F5F5` | **Cloud Dancer** | Fondo neutro principal en modo día; sensación de frescura y respirabilidad. |
| `--color-sage-accent` | `#8A9A5B` | **Sage Green** | Acentos orgánicos, intervenciones no farmacológicas, estado óptimo de biomarcadores. |
| `--color-orchid-insight` | `#9966CC` | **Amethyst Orchid** | Insights clínicos, fases del marco STRAW+10, correlaciones de inteligencia hormonal. |
| `--color-slate-text` | `#1E293B` | **Deep Slate** | Tipografía principal en modo claro para máxima legibilidad WCAG AAA. |
| `--color-circadian-dark` | `#0D1317` | **Circadian Black** | Fondo principal en Modo Noche Circadiano. |
| `--color-circadian-amber` | `#FFB067` | **Warm Amber** | Acento suave nocturno para no inhibir la producción de melatonina. |

### 2.2 Tipografía
* **Familia Primaria:** *Outfit* / *Plus Jakarta Sans* / *Inter* (geométrica, moderna, altamente legible en cuerpos de 16px a 32px).
* **Escala:** Jerarquía marcada para evitar sobrecarga visual (H1: 28px/32px bold, H2: 22px semi-bold, Body: 16px regular con interlineado generoso 1.6).

---

## 3. 📱 Desglose de Pantallas Clave para Generar en Stitch

### 🖥️ Pantalla 1: Hub Hormonal Principal & Estado STRAW+10 (Home Dashboard)
* **Objetivo:** Ofrecer una visión instantánea del estado hormonal del día, nivel de estabilidad circadiana y acceso de un toque al registro de síntomas.
* **Componentes Clave a diseñar:**
  1. **Header Superior:** Saludo circadiano ("Buenas noches, Elena"), botón toggle Modo Noche Inteligente, indicador de "Soberanía Local 100% Cifrada" (icono de candado verde discreto).
  2. **Card de Estado STRAW+10 ("Ventana de Probabilidad"):**
     * En lugar de "Tu regla tiene 5 días de retraso", muestra: *Fase: Transición Perimenopáusica Temprana (Variabilidad $\Delta \ge 7$d detectada)* con un arco de probabilidad probabilístico suave en tono Orchid y Teal.
  3. **Indicador de Ritmo Biológico / Biorritmo:** Curva de energía estimada vs carga de síntomas de los últimos 7 días.
  4. **Widget de Registro Rápido ("One-Tap Log"):** 4 accesos directos a los biomarcadores más comunes del momento (ej: *Sofoco leve, Niebla mental, Fatiga, Calidad de sueño*).
  5. **Card de Insight Reactivo (Motor EDA):** *"Hemos detectado 3 noches con interrupción del sueño. Tu sesión de TCC para higiene circadiana está lista."* con botón *"Iniciar (4 min)"*.
  6. **Bottom Navigation Bar:** 5 accesos: *Hoy (Home), Registro Matriz, Soluciones & TCC, Informe Médico, Perfil/Seguridad*.

---

### 🖥️ Pantalla 2: Matriz Multidominio de Biomarcadores (>80 Puntos de Datos)
* **Objetivo:** Registro exhaustivo de 34 síntomas base sin saturación cognitiva mediante una matriz interactiva de 5 dominios clínicos.
* **Componentes Clave a diseñar:**
  1. **Selector de Dominio Clínico (Pills con Iconos):**
     * 🟢 *Vasomotores* (Sofocos, Sudoración nocturna, Palpitaciones)
     * 🟣 *Neurológicos/Cognitivos* (Niebla mental, Ansiedad, Insomnio, Irritabilidad)
     * 🟠 *Físicos/Sistémicos* (Dolor articular, Cefalea, Fatiga)
     * 🔵 *Suelo Pélvico e Íntimo* (Sequedad, Tensión pélvica, Libido)
     * 🟡 *Metabólicos* (Retención de líquidos, Digestión, Piel/Cabello)
  2. **Ficha de Detalle de Síntoma (Sheet/Modal Expandible):**
     * **Slider Ergonómico de Intensidad (1 al 10):** Rango táctil amplio con feedback visual de color degradado sutil (Sage $\rightarrow$ Teal $\rightarrow$ Orchid).
     * **Selector de Frecuencia:** *Aislado / Intermitente / Continuo*.
     * **Tags de Desencadenantes (Triggers):** *Estrés, Cafeína, Calor ambiental, Azúcar, Reunión laboral, Ejercicio*.
     * **Selector de Duración:** *<5 min, 15 min, 1h, Todo el día*.
  3. **Botón Flotante de Confirmación:** *"Guardar en Registro Cifrado"* con microanimación de confirmación háptica/visual.

---

### 🖥️ Pantalla 3: Módulo de Intervenciones Basadas en Evidencia & TCC (Care Library)
* **Objetivo:** Proporcionar herramientas terapéuticas inmediatas, ejercicios adaptados y pautas no farmacológicas validadas.
* **Componentes Clave a diseñar:**
  1. **Hero Card de Intervención Activa:** Reproductor interactivo de **Terapia Cognitivo-Conductual (TCC)** para manejo agudo de sofocos: temporizador de respiración 4-7-8 con guía visual orgánica.
  2. **Biblioteca de Soluciones Clínicas:**
     * Card 1: *Pautas de Alivio Térmico (Exopeptide Mist con Bisabolol y Ácido Hialurónico)*.
     * Card 2: *Regulación Circadiana (Night Balance Caps con Ashwagandha, Melatonina & Triptófano)*.
     * Card 3: *Entrenamiento de Fuerza Adaptativo para densidad ósea (Prevención de osteopenia)*.
     * Card 4: *Rutina de Fisioterapia de Suelo Pélvico (Kegel invertido + relajación diafragmática)*.
  3. **Filtros por necesidad actual:** *Alivio Inmediato (<5 min) / Rutina Diaria / Educación Clínica*.

---

### 🖥️ Pantalla 4: Generador de Informe Clínico para Ginecología (Doctor Report PDF)
* **Objetivo:** Convertir meses de datos fragmentados en un resumen ejecutivo de alta densidad médica listo para imprimir o enviar al especialista en consulta.
* **Componentes Clave a diseñar:**
  1. **Selector de Rango Longitudinal:** *Últimos 30 días / 60 días / 90 días*.
  2. **Previsualizador del Reporte Médico:**
     * **Cabecera Médica:** Identificador anónimo de paciente, edad, clasificación STRAW+10 estimada.
     * **Gráfico Multivariante:** Correlación entre duración del ciclo menstrual, picos de sofocos diurnos/nocturnos y calidad del sueño REM/Profundo.
     * **Tabla de Distribución de 34 Síntomas:** Desglose porcentual por dominio clínico para diagnóstico diferencial de Terapias Hormonales (THM).
     * **Sección de Notas Clínicas:** Espacio para que la usuaria anote dudas previas a la consulta ginecológica.
  3. **Botón Principal de Exportación:** *"Generar PDF Cifrado para Especialista"* con opciones de compartir vía enlace local efímero o descarga directa.

---

### 🖥️ Pantalla 5: Modo Noche Circadiano Inteligente (Insomnia Companion)
* **Objetivo:** Servir como acompañante nocturno cuando la usuaria se despierta por sofocos o insomnio, con mínima estimulación óptica.
* **Componentes Clave a diseñar:**
  1. **Estilo Visual:** Fondo negro absoluto (`#0D1317`), fuentes en tono ámbar tenue (`#FFB067`), cero contrastes agresivos.
  2. **Botón SOS Nocturno ("Tengo un sofoco ahora"):** Inicia instantáneamente una guía de enfriamiento somático guiado por audio y pulso respiratorio visual.
  3. **Registro Rápido a Ciegas:** Registro de despertar con un solo toque (hora detectada automáticamente).
  4. **Audioguía de Reconciliación del Sueño:** Pistas de sonido binaural / ruido marrón con temporizador de apagado automático.

---

## 4. 📐 Prompt Maestro para Inyectar en Stitch

```text
Design a high-end, bio-minimalist mobile and desktop web application called "Flow-Girl" for perimenopause and hormonal health tracking. 

Style Guidelines:
- Aesthetic: "Bio-Minimalismo Sofisticado" (anti-pink-washing, medical-grade luxury, calming, cortisol-reducing).
- Color Palette: Transformative Teal (#008080) for primary actions, Cloud Dancer (#F5F5F5) for clean breathing backgrounds, Sage Green (#8A9A5B) for natural interventions, Amethyst Orchid (#9966CC) for STRAW+10 clinical insights, Deep Slate (#1E293B) for high-contrast AAA typography, and Circadian Dark (#0D1317) with Warm Amber (#FFB067) for Night Mode.
- Target Audience: Women aged 38-58 experiencing the perimenopause transition.
- Accessibility: WCAG AAA compliance, generous touch targets (min 48px), high legibility, non-punitive probability copy instead of delayed period alerts.

Key Screens to Render:
1. Circadian Hormone Hub (Dashboard): STRAW+10 probability window card, biological energy curve, quick-log symptom shortcuts, reactive clinical recommendation banner, and bottom navigation.
2. Multidomain Biomarker Matrix: 5 clinical domain tabs (Vasomotor, Cognitive, Physical, Pelvic Floor, Metabolic), symptom severity slider (1-10), trigger tags, and duration selector.
3. CBT & Evidence-Based Solutions Library: Interactive 4-7-8 breathing hot flash intervention, clinical supplement guide cards, and osteopenia strength routines.
4. Doctor Report PDF Preview: 30-90 day multi-axis correlation chart (Sleep vs Vasomotor symptoms vs STRAW+10 cycle variance) formatted as a professional clinical summary for gynecologists.
5. Circadian Night Mode (Insomnia Companion): Ultra-dark zero-blue-light screen with a one-tap "Hot Flash SOS" cooling guide and sleep soothing audio player.
```
