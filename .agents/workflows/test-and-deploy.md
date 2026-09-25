# Workflow: Testes e Deploy do WebApp (Cloud Run)

Execute este workflow para realizar a validação completa de qualidade, execução de testes automatizados e deploy em produção do webapp DAN IMAGES PROMPTS no Google Cloud Run.

---

## ⛔ Regra de Ouro (Inviolável)
**NUNCA execute comandos de deploy em produção sem autorização prévia e explícita do usuário.** O assistente deve conduzir as fases 1 a 4, apresentar o relatório de prontidão e **PARAR** na Fase 5 para obter aprovação humana.

---

## Fase 1: Preflight e Consistência de Código

1. **Verificação de Tipos TypeScript:**
   ```bash
   pnpm exec tsc --noEmit
   ```
   *Critério de Aceitação:* 0 erros de compilação.

2. **Verificação de Dependências e Lockfile:**
   Garantir que `pnpm-lock.yaml` está sincronizado com `package.json` sem desvios.

---

## Fase 2: Execução de Testes Automatizados

Executar a suíte completa de testes de regressão:
```bash
pnpm test
```

Esta suíte executa sequencialmente:
1. `tests/auth.test.ts`: Validação de tokens Firebase, whitelist de emails (`ALLOWED_LOGIN_EMAILS`), cookies de upload e códigos 401/403/503.
2. `tests/persistence.test.ts`: CRUD, persistência local, inicialização e filtros.
3. `tests/api-persistence.test.ts`: Integração ponta a ponta dos endpoints REST com persistência.
4. `tests/provider-selection.test.ts`: Seleção de provedor de IA e fallback determinístico do Gemini.
5. `tests/firestore-durable.test.ts`: Salvaguardas fail-closed para persistência durável no Cloud Run.

*Critério de Aceitação:* Todas as 5 suítes devem retornar código de saída 0 (PASS).

---

## Fase 3: Build de Produção

Gerar os bundles de produção do cliente (Vite) e do servidor (esbuild):
```bash
pnpm run build
```

*Critério de Aceitação:*
- Diretório `dist/` gerado com arquivos estáticos do cliente.
- Bundle do servidor gerado em `dist/server.cjs`.

---

## Fase 4: Auditoria de Configuração de Runtime (Cloud Run)

Antes de preparar o deploy, audite o ambiente de execução:
1. **Persistência Durável:** Em produção no Cloud Run, `PERSISTENCE_PROVIDER=firestore` é obrigatório. Fallback para filesystem efêmero é estritamente bloqueado por salvaguardas fail-closed.
2. **Identidade e Projeto:** Confirmar que `GOOGLE_CLOUD_PROJECT` e `FIRESTORE_DATABASE_ID` coincidem com a configuração do projeto Firebase (`firebase-applet-config.json`).
3. **Whitelist de Acesso:** Confirmar que `ALLOWED_LOGIN_EMAILS` está definido no ambiente de produção.
4. **Segurança de Secrets:** Garantir que `GEMINI_API_KEY` seja fornecida via Secret Manager ou variáveis seguras de ambiente no Cloud Run, NUNCA exposta em arquivos estáticos ou variáveis `VITE_*`.

---

## Fase 5: Portão de Aprovação Humana (Human Gate)

Apresentar ao usuário o sumário executivo de prontidão:
- Resultado do Typecheck: PASS
- Resultado dos Testes: 5/5 PASS
- Resultado do Build: PASS
- Imagem Docker / Alvo: Google Cloud Run

> [!IMPORTANT]
> **PARAR AQUI.** Solicitar confirmação expressa do usuário:  
> *"Todos os testes e builds passaram com sucesso. Deseja autorizar o deploy do container para o Cloud Run agora?"*

---

## Fase 6: Deploy para o Cloud Run (Após Aprovação)

Com a aprovação explícita concedida:

1. **Build e Deploy via Google Cloud CLI:**
   ```bash
   gcloud run deploy prompt-imagem-app \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NODE_ENV=production,PERSISTENCE_PROVIDER=firestore
   ```
   *(Ou submeter build via Google Cloud Build / pipeline CI configurada).*

2. **Verificação Pós-Deploy (Smoke Test):**
   - Acessar a URL do serviço e verificar resposta HTTP 200 na rota raiz (`/`).
   - Testar endpoint de autenticação e sessão (`/api/auth/session`).
   - Validar persistência: criar prompt de teste, verificar registro no Firestore e recarregar a visualização.
