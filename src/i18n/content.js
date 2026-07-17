// Diccionario de contenido bilingüe. Cada key se referencia desde el markup
// vía data-i18n="ruta.punteada" y el script de i18n hace el swap en cliente.
export const LINKS = {
  repo: 'https://github.com/Group-Active-IA/active-stack',
  exeLatest:
    'https://github.com/Group-Active-IA/active-stack/releases/latest/download/ActiveStack-Setup.exe',
  releases: 'https://github.com/Group-Active-IA/active-stack/releases',
  linuxBinary:
    'https://github.com/Group-Active-IA/active-stack/releases/latest/download/active-stack_linux_amd64',
  sha256:
    'https://github.com/Group-Active-IA/active-stack/releases/latest/download/SHA256SUMS.txt',
};

export const content = {
  es: {
    nav: {
      download: 'Descargar',
      whatIs: 'Qué es',
      opsx: 'OPSX',
      catalog: 'Catálogo',
      faq: 'FAQ',
      langToggle: 'Cambiar idioma',
      themeToggle: 'Cambiar tema',
      github: 'Ver en GitHub',
    },
    hero: {
      eyebrow: 'CÓDIGO ABIERTO · INSTALADOR PARA AGENTES DE IA',
      title: 'El copiloto que prepara a tu agente de IA para construir software profesional.',
      brandLine: 'Active Stack es un harness que instala harnesses.',
      primaryCta: 'Descargar para Windows',
      secondaryCta: 'Ver todas las versiones',
      metaVersion: 'Versión',
      metaSha: 'Verificar SHA256',
      smartscreen:
        'Instalador sin firmar — si Windows te advierte: “Más información” → “Ejecutar de todas formas”.',
    },
    tabsLabels: { windows: 'Windows', linux: 'Linux / WSL', mac: 'macOS / Termux' },
    panels: {
      windows: {
        title: 'Instalador gráfico',
        desc: 'Detecta tus agentes, elegís modo, listo.',
        button: 'Descargar ActiveStack-Setup.exe',
        badge: '',
        steps: [
          '1. Descargá y ejecutá el instalador',
          '2. Elegí tu agente de IA',
          '3. Elegí un modo — Lite, Full o Custom',
          '4. Active Stack instala y verifica',
        ],
      },
      linux: {
        title: 'Binario CLI',
        desc: 'Un solo binario, sin dependencias de runtime.',
        badge: '',
        caption: 'Funciona igual dentro de WSL.',
        code: [
          'curl -L -o active-stack \\',
          `  ${LINKS.linuxBinary}`,
          'chmod +x active-stack',
          './active-stack install',
        ],
      },
      mac: {
        title: 'Build desde fuente',
        desc: 'Binario nativo todavía no disponible.',
        badge: 'Por ahora',
        caption: 'Requiere Go 1.26. Funciona igual en Termux.',
        code: [
          `git clone ${LINKS.repo}.git`,
          'cd active-stack',
          'go build -o active-stack ./cmd/active-stack',
          './active-stack install',
        ],
      },
    },
    copy: { copy: 'Copiar', copied: 'Copiado' },
    whatIs: {
      eyebrow: '¿QUÉ ES?',
      title: 'Un configurador del entorno del agente',
      bullets: [
        'No es un framework que corre en tu app. Es un configurador del entorno de tu agente de IA.',
        'Instala harnesses de tres tipos — skill, config y external — según lo que cada uno necesite.',
        'Un solo comando deja tu proyecto listo para el ciclo OPSX.',
      ],
    },
    opsx: {
      eyebrow: 'EL CICLO',
      title: 'OPSX: explore → propose → apply → verify → archive',
      steps: [
        { name: 'explore', desc: 'Relevar el problema y el estado actual del código.' },
        { name: 'propose', desc: 'Redactar la spec del cambio antes de tocar una línea.' },
        { name: 'apply', desc: 'Implementar contra la spec aprobada.' },
        { name: 'verify', desc: 'Correr los health checks y la suite de tests.' },
        { name: 'archive', desc: 'Cerrar el ciclo y actualizar el estado del proyecto.' },
      ],
    },
    catalog: {
      eyebrow: 'EL CATÁLOGO',
      title: 'Harnesses listos para instalar',
      subtitle:
        'Active Stack no instala repos: instala harnesses, y cada uno sabe cómo se materializa.',
      items: [
        { name: 'OpenSpec CLI', type: 'external', desc: 'CLI de Spec-Driven Development; fuente de verdad del estado.' },
        { name: 'Engram', type: 'external', desc: 'Memoria persistente local (SQLite + FTS) vía MCP.' },
        { name: 'Context7', type: 'external', desc: 'Documentación de librerías al día, vía MCP remoto.' },
        { name: 'SDD Orchestrator', type: 'config', desc: 'Orquestador SDD componible por toggles: TDD, Engram, model-routing, delegación, governance.' },
        { name: 'Permissions', type: 'config', desc: 'Permisos seguros por defecto. No es opcional.' },
        { name: 'active-orchestrator', type: 'skill', desc: 'Orquesta la fase de fundación del proyecto.' },
        { name: 'kb-creator', type: 'skill', desc: 'Genera la knowledge-base canónica del dominio.' },
        { name: 'roadmap-generator', type: 'skill', desc: 'Genera CHANGES.md, el backlog técnico, desde la KB.' },
      ],
    },
    agents: {
      eyebrow: 'AGENTES SOPORTADOS',
      title: 'Funciona con el agente que ya usás',
      supported: ['Claude Code', 'OpenCode', 'Codex'],
      soon: ['Gemini', 'Cursor', 'VS Code', 'Windsurf', 'Antigravity'],
      supportedLabel: 'soportado',
      soonLabel: 'próximamente',
    },
    faq: {
      eyebrow: 'PREGUNTAS FRECUENTES',
      items: [
        { q: '¿Es gratis?', a: 'Sí. Código abierto bajo licencia MIT.' },
        { q: '¿Toca mi configuración existente?', a: 'Hace backup automático antes de escribir. Reinstalar no duplica bloques — la inyección es idempotente.' },
        { q: '¿Qué es un harness?', a: 'Cualquier módulo que prepara o guía el entorno del agente: una skill, una config o un binario external.' },
        { q: '¿Por qué Windows muestra SmartScreen?', a: 'El instalador todavía no está firmado digitalmente. Podés verificar el hash SHA256 antes de ejecutar.' },
      ],
    },
    footer: {
      tagline: 'Un binario. Un catálogo de harnesses. Método, no magia.',
      repo: 'Repositorio en GitHub',
      license: 'Licencia MIT',
      madeBy: 'hecho por Group Active IA',
    },
  },
  en: {
    nav: {
      download: 'Download',
      whatIs: 'What is it',
      opsx: 'OPSX',
      catalog: 'Catalog',
      faq: 'FAQ',
      langToggle: 'Switch language',
      themeToggle: 'Switch theme',
      github: 'View on GitHub',
    },
    hero: {
      eyebrow: 'OPEN SOURCE · INSTALLER FOR AI AGENTS',
      title: 'The copilot that gets your AI agent ready to build professional software.',
      brandLine: 'Active Stack is a harness that installs harnesses.',
      primaryCta: 'Download for Windows',
      secondaryCta: 'See all releases',
      metaVersion: 'Version',
      metaSha: 'Verify SHA256',
      smartscreen: 'Unsigned installer — if Windows warns you: “More info” → “Run anyway”.',
    },
    tabsLabels: { windows: 'Windows', linux: 'Linux / WSL', mac: 'macOS / Termux' },
    panels: {
      windows: {
        title: 'Graphical installer',
        desc: 'Detects your agents, pick a mode, done.',
        button: 'Download ActiveStack-Setup.exe',
        badge: '',
        steps: [
          '1. Download and run the installer',
          '2. Pick your AI agent',
          '3. Pick a mode — Lite, Full or Custom',
          '4. Active Stack installs and verifies',
        ],
      },
      linux: {
        title: 'CLI binary',
        desc: 'A single binary, no runtime dependencies.',
        badge: '',
        caption: 'Works the same inside WSL.',
        code: [
          'curl -L -o active-stack \\',
          `  ${LINKS.linuxBinary}`,
          'chmod +x active-stack',
          './active-stack install',
        ],
      },
      mac: {
        title: 'Build from source',
        desc: 'Native binary not available yet.',
        badge: 'For now',
        caption: 'Requires Go 1.26. Works the same on Termux.',
        code: [
          `git clone ${LINKS.repo}.git`,
          'cd active-stack',
          'go build -o active-stack ./cmd/active-stack',
          './active-stack install',
        ],
      },
    },
    copy: { copy: 'Copy', copied: 'Copied' },
    whatIs: {
      eyebrow: 'WHAT IS IT?',
      title: "A configurator for your agent's environment",
      bullets: [
        "Not a framework that runs inside your app. It's a configurator for your AI agent's environment.",
        'Installs harnesses of three types — skill, config and external — depending on what each one needs.',
        'One command leaves your project ready for the OPSX cycle.',
      ],
    },
    opsx: {
      eyebrow: 'THE CYCLE',
      title: 'OPSX: explore → propose → apply → verify → archive',
      steps: [
        { name: 'explore', desc: 'Survey the problem and the current state of the code.' },
        { name: 'propose', desc: 'Write the change as a spec before touching a line.' },
        { name: 'apply', desc: 'Implement against the approved spec.' },
        { name: 'verify', desc: 'Run health checks and the test suite.' },
        { name: 'archive', desc: 'Close the cycle and update project state.' },
      ],
    },
    catalog: {
      eyebrow: 'THE CATALOG',
      title: 'Harnesses ready to install',
      subtitle:
        "Active Stack doesn't install repos — it installs harnesses, and each one knows how it's materialized.",
      items: [
        { name: 'OpenSpec CLI', type: 'external', desc: 'Spec-Driven Development CLI; source of truth for state.' },
        { name: 'Engram', type: 'external', desc: 'Local persistent memory (SQLite + FTS) via MCP.' },
        { name: 'Context7', type: 'external', desc: 'Up-to-date library docs, via remote MCP.' },
        { name: 'SDD Orchestrator', type: 'config', desc: 'SDD orchestrator composed from toggles: TDD, Engram, model-routing, delegation, governance.' },
        { name: 'Permissions', type: 'config', desc: 'Secure defaults. Not optional.' },
        { name: 'active-orchestrator', type: 'skill', desc: "Orchestrates the project's foundation phase." },
        { name: 'kb-creator', type: 'skill', desc: "Generates the domain's canonical knowledge base." },
        { name: 'roadmap-generator', type: 'skill', desc: 'Generates CHANGES.md, the technical backlog, from the KB.' },
      ],
    },
    agents: {
      eyebrow: 'SUPPORTED AGENTS',
      title: 'Works with the agent you already use',
      supported: ['Claude Code', 'OpenCode', 'Codex'],
      soon: ['Gemini', 'Cursor', 'VS Code', 'Windsurf', 'Antigravity'],
      supportedLabel: 'supported',
      soonLabel: 'coming soon',
    },
    faq: {
      eyebrow: 'FAQ',
      items: [
        { q: 'Is it free?', a: 'Yes. Open source under the MIT license.' },
        { q: 'Does it touch my existing config?', a: "It backs up automatically before writing. Reinstalling doesn't duplicate blocks — injection is idempotent." },
        { q: "What's a harness?", a: "Any module that prepares or guides the agent's environment: a skill, a config, or an external binary." },
        { q: 'Why does Windows show SmartScreen?', a: "The installer isn't code-signed yet. You can verify the SHA256 hash before running it." },
      ],
    },
    footer: {
      tagline: 'One binary. One harness catalog. Method, not magic.',
      repo: 'GitHub repository',
      license: 'MIT license',
      madeBy: 'made by Group Active IA',
    },
  },
};
