# Mother Brain Integration

Este projeto (`DAN-IMAGES-PROMPTS-2`) está integrado ao Mother Brain como repositório externo registrado.

## Fronteiras de Autoridade

1. **Repositório Local (`/Users/PROJETOS-DEV/DAN-IMAGES-PROMPTS-2`)**:
   - Autoridade sobre código-fonte executável (`src/`, `server/`).
   - Configurações locais de build, testes e agentes (`.agents/`).
   - Segredos de runtime (`.env*`) são estritamente locais e nunca devem ser exportados.

2. **Mother Brain (`/Users/danilonovais/OBSIDIAN`)**:
   - Ponto de entrada canônico de conhecimento durável: `02-projects/dan-images-prompts-2/project.md`.
   - Autoridade sobre decisões arquiteturais, especificações e contexto entre projetos.
   - Não armazena código executável nem credenciais.

3. **Graphify / Wiki-Brain**:
   - Representação derivada (`DERIVED_ONLY`).
   - Grafo de conhecimento e índices não substituem o código nem o conhecimento canônico.
