---
description: # Workflow: /spec-sync
---

# Workflow: /spec-sync

## Objetivo

Garantir alinhamento contínuo e bidirecional entre o código-fonte real (`server/`, `src/`), os contratos de dados e a especificação formal em `.context/spec.md` e `.context/project-context.md`.

---

## Gatilho de Execução

- Sempre que houver alteração em contratos de API (`server.ts` ou `src/services/api.ts`).
- Sempre que os modelos de dados (`PromptItem`, `Category`, `StructuredPromptMetadata`) forem estendidos.
- Quando novas variáveis de ambiente, provedores de persistência ou capacidades de IA forem adicionadas.

---

## Checklist de Verificação

1. **Inspeção de Contratos de Transporte**:
   - Comparar rotas em `server.ts` com a tabela de endpoints em `.context/spec.md`.
   - Garantir que todos os métodos correspondam em `src/services/api.ts`.
2. **Inspeção de Tipos e Interfaces**:
   - Verificar paridade entre `src/types/` e `StructuredAnalysisResult` em `server/ai/promptAnalyzer.ts`.
   - Conferir se o runtime validator `server/validation/aiAnalysisSchema.ts` valida todos os novos campos.
3. **Auditoria de Persistência**:
   - Garantir que tanto `FirestorePromptRepository` quanto `FilePromptRepository` suportam as alterações.
4. **Atualização da Documentação**:
   - Atualizar tabelas e snippets em `.context/spec.md`.
   - Refletir mudanças em `.context/project-context.md`.
5. **Quality Gate**:
   - Executar:

     ```bash
     pnpm run lint
     ```

   - Validar que não há quebras de tipagem (`tsc --noEmit`).
