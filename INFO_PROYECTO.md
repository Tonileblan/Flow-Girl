# ⚡ INFO_PROYECTO: Flow-Girl (By Toni)

> **Ubicación Google Drive:** `Google Drive > Mi unidad > 1-Proyectos > Apps-Desarrollo > Flow-Girl`  
> **Slug / Código:** `mia_flowgirl`  
> **Categoría:** Suite Toni (Propio / I+D)  
> **Estado:** En Desarrollo  
> **Base de Datos:** Supabase PostgreSQL (`mia_flowgirl`) + Local-First PWA  
> **Directrices Maestras Drive:** [Carpeta de Directrices](https://drive.google.com/drive/folders/1lWPlfQ3KtLijHklYE0O993J-HwQInjZW)

---

## 🎯 1. Propuesta de Valor y Objetivo

**Flow-Girl** es una aplicación PWA Local-First para el registro del ciclo menstrual, seguimiento de fases biológicas y hormonales, registro de sofocos/síntomas y rutinas de bienestar con máxima privacidad.

### 💡 Problema Principal que Resuelve
Ofrecer una alternativa 100% privada, sin publicidad invasiva y con persistencia segura en la nube (multi-dispositivo) y funcionamiento offline total.

### 👥 Público Objetivo
- Mujeres y usuarias que desean monitorizar su salud hormonal y ciclo con total confidencialidad.

---

## 🛠️ 2. Arquitectura y Stack Tecnológico

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons.
- **Estilos:** Soft Pastel Glassmorphism con diseño femenino, limpio y accesible (WCAG 2.1 AA).
- **Persistencia:** Local-First sincronizado con Supabase PostgreSQL esquema aislado `mia_flowgirl` y RLS estricto.

---

## 📜 3. Cumplimiento de las 5 Directrices Maestras de Google Drive

| # | Directriz | Estado en Flow-Girl |
|---|---|---|
| **1** | **🗄️ Supabase PostgreSQL** | Esquema aislado `mia_flowgirl` con tablas `cycles`, `daily_logs` y RLS activo. |
| **2** | **🛡️ Seguridad & Auth** | Supabase Auth opcional para sync y encriptación local. |
| **3** | **🤖 IA & Predicciones** | Algoritmos de predicción de fase y asistente de bienestar hormonal. |
| **4** | **⚖️ RGPD & Branding** | Titular Antonio Javier García García (DNI 34799350M, Madrid) y sello "By Toni". |
| **5** | **📂 Registro Drive** | Ficha `INFO_PROYECTO.md` registrada. |

---

## 🚀 4. Comandos de Ejecución Local

```bash
cd /Users/toni/Proyectos/Flow-Girl
npm install
npm run dev
```

---
*Ficha generada automáticamente según la Directriz de Registro y Control de Google Drive (By Toni).*
