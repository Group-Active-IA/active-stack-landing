# Brief para Claude Design — Landing de Active Stack

> Pegá el prompt de abajo en https://claude.ai/design para generar la landing.
> Cuando el diseño esté listo, lo traemos a este repo y se deploya en Vercel.

---

## Prompt

Diseñá una landing page de una sola página para **Active Stack**, un instalador open-source para desarrolladores. Referencia de estilo y estructura: **opencode.ai** (minimalista, credibilidad técnica, el CTA de instalación es el centro del hero — nada de marketing inflado).

### Qué es el producto

Active Stack es un instalador **methodology-first**: un único binario que toma tu agente de IA (Claude Code, Codex, OpenCode, Gemini, Cursor…) y le inyecta todo el sustrato que exige una metodología de desarrollo asistido por IA. Corrés un comando, elegís un modo, y tu proyecto queda listo para el ciclo **OPSX** (`explore → propose → apply → verify → archive`).

Frase central de la marca: **"Active Stack es un harness que instala harnesses."**
Tagline: **"Un binario. Un catálogo de harnesses. Tu agente de IA listo para trabajar con método."**

Tono: técnico, directo, enfocado. NO usar framing tipo "supercharge your agent" ni promesas de marketing — es una herramienta de método, no un booster.

### Marca

- Paleta: indigo `#6366f1` (primario), violeta `#8b5cf6`, cyan `#06b6d4`, teal `#14b8a6`, verde `#22c55e` (acentos). Fondo oscuro tipo slate (`#0f172a` / `#1e293b`) con soporte de tema claro.
- Tipografía: sans limpia para texto; **monospace para todo comando, código y nombre de archivo** (estética terminal aplicada selectivamente, como opencode.ai).

### Estructura (en orden)

1. **Hero**: logo/nombre + tagline + CTA primario grande **"Descargar para Windows"** apuntando a
   `https://github.com/Group-Active-IA/active-stack/releases/latest/download/ActiveStack-Setup.exe`
   y un CTA secundario "Ver todas las versiones" → `https://github.com/Group-Active-IA/active-stack/releases`.
   Debajo del botón, en chico: versión, tamaño (~71 MB), link a SHA256, y nota SmartScreen ("instalador sin firmar: Más información → Ejecutar de todas formas").
2. **Tabs de instalación por plataforma**: Windows (el .exe con wizard gráfico) | Linux/WSL (binario CLI `active-stack_linux_amd64` desde el mismo release + `chmod +x`) | macOS/Termux (build desde fuente: `git clone` + `go build`, marcado como "por ahora").
3. **¿Qué es?**: 3 bullets — no es un framework que corre en tu app, es un configurador del entorno del agente; instala harnesses de 3 tipos (`skill` / `config` / `external`); un solo comando deja el proyecto listo para OPSX.
4. **El ciclo OPSX**: diagrama horizontal de 5 pasos `explore → propose → apply → verify → archive` con una línea de descripción cada uno.
5. **El catálogo**: grilla de cards de los harnesses principales (OpenSpec, Engram, Context7, SDD Orchestrator, Permissions, kb-creator, roadmap-generator…) con su tipo como badge.
6. **Agentes soportados**: fila de logos/nombres — Claude Code · OpenCode · Gemini · Codex · Cursor · VS Code · Windsurf · Antigravity.
7. **FAQ corto**: ¿es gratis? (MIT, open source) · ¿toca mi config? (backup automático antes de escribir, reinstalar no duplica) · ¿qué es un harness? · ¿por qué SmartScreen me advierte?
8. **Footer**: link al repo GitHub, licencia MIT, "hecho por Group Active IA".

### Requisitos técnicos

- **Bilingüe ES/EN** con toggle visible en el header (ES por defecto). Todos los textos en ambos idiomas.
- Responsive (mobile-first), tema oscuro por defecto con toggle claro/oscuro.
- Estática, sin backend. Los botones de descarga son links directos (GitHub redirige al asset del último release).
- Página única, anchor navigation en el header (Descargar · Qué es · OPSX · Catálogo · FAQ).

---

## Datos de referencia (para el que integre el diseño)

- Repo del producto: https://github.com/Group-Active-IA/active-stack (público, MIT)
- URL estable del instalador: `https://github.com/Group-Active-IA/active-stack/releases/latest/download/ActiveStack-Setup.exe`
- URL estable CLI Windows: `.../releases/latest/download/active-stack_windows_amd64.exe`
- URL estable CLI Linux: `.../releases/latest/download/active-stack_linux_amd64`
- SHA256: `.../releases/latest/download/SHA256SUMS.txt`
- Deploy target: Vercel (repo `Group-Active-IA/active-stack-landing`)
