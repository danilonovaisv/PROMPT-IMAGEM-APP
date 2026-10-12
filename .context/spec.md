# DAN IMAGES PROMPTS - Especificação Formal de Domínio & Contratos (SPEC.md)

## 1. Visão Geral do Produto

O **DAN IMAGES PROMPTS** é uma biblioteca inteligente para catalogar, enriquecer, organizar e reutilizar prompts voltados para ferramentas generativas de imagem (ex.: Midjourney v6, Flux, DALL-E, SDXL, Imagen).

Cada ativo persistido é mais que uma string de texto: é um **`PromptItem`** composto por:
- Prompt original (`rawPrompt`) fornecido pelo usuário;
- Imagem de referência ou thumbnail gerada/anexada (`imageUrl`, `thumbnailUrl`);
- Categoria formal (`category`);
- Modelo alvo configurado (`targetModel`);
- Decomposição visual estruturada (`structured` com parâmetros como luz, ângulo, câmera, proporção áurea, seeds);
- Metadados de uso e catalogação (tags, notas, favoritos, contador de cópias e timestamps).

---

## 2. Modelos de Domínio & Entidades Centrais

### 2.1. `PromptItem`
```typescript
export interface StructuredPromptMetadata {
  subject: string;        // Sujeito principal ou tema central
  environment: string;    // Cenário, localização, atmosfera
  lighting: string;       // Qualidade, direção e tipo de luz
  camera: string;         // Especificação de lente, ângulo e enquadramento
  composition: string;    // Estrutura de enquadramento (terços, close-up, etc.)
  style: string;          // Estilo artístico ou fotográfico
  colors: string;         // Paleta de cores predominante
  instructions: string;   // Diretrizes adicionais para o renderizador
  parameters: {
    aspectRatio?: string;     // Ex: "16:9", "1:1", "9:16"
    stylize?: number | string;
    seed?: number | string;
    negativePrompt?: string;
    cfgScale?: number | string;
    rawParams?: string;
  };
}

export interface PromptItem {
  id: string;                         // Identificador único (UUID ou nanoid)
  title: string;                      // Título amigável do prompt
  rawPrompt: string;                  // Prompt bruto original do usuário
  formattedPrompt?: string;           // Versão otimizada sugerida
  category: string;                   // ID da categoria associada
  targetModel: string;                // Ex: "midjourney-v6", "flux-1", "dall-e-3"
  tags: string[];                     // Lista de até 20 tags normalizadas
  imageUrl?: string;                  // Path para a imagem no servidor (/uploads/...) ou URL
  thumbnailUrl?: string;              // Thumbnail otimizado para o grid
  structured?: StructuredPromptMetadata;
  notes?: string;                     // Observações do criador
  isFavorite: boolean;                // Flag de favorito
  usageCount: number;                 // Contador de vezes copiado/usado
  createdAt: string;                  // Timestamp ISO 8601
  updatedAt: string;                  // Timestamp ISO 8601
}
```

### 2.2. `Category`
```typescript
export interface Category {
  id: string;                         // Slug/ID da categoria (ex: "cat-photorealism")
  name: string;                       // Nome amigável (ex: "Fotorealismo")
  description?: string;               // Descrição da aplicação da categoria
  icon?: string;                      // Nome do ícone Lucide correspondente
  order?: number;                     // Posição de ordenação na UI
}
```

### 2.3. Contrato de Análise com IA (`/api/analyze-prompt`)
```typescript
export interface AnalyzePromptInput {
  rawPrompt: string;                  // Texto bruto a decompor
  targetModel?: string;               // Modelo pretendido (padrão: "midjourney-v6")
  category?: string;                  // Categoria pré-selecionada (opcional)
  imageBase64?: string;               // Payload de imagem para análise multimodal (opcional)
  imageMimeType?: string;             // MIME da imagem (ex: "image/jpeg", "image/png")
  imageUrl?: string;                  // Alternativa via URL pública/local
}

export interface ValidatedAnalysisResult {
  title: string;
  suggestedCategory: string;
  tags: string[];
  structured: StructuredPromptMetadata;
  formattedPrompt: string;
  analysisNotes: string;
}
```

---

## 3. Contratos de API (REST Boundaries)

Todos os endpoints operam sob o prefixo `/api` e respondem em JSON com UTF-8:

| Endpoint | Método | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Health check da aplicação e persistência | Pública |
| `/api/analyze-prompt` | `POST` | Análise multimodal de texto/imagem via Gemini ou fallback | Bearer Token (Firebase Auth) |
| `/api/prompts` | `GET` | Lista todos os prompts persistidos com filtros opcionais | Bearer Token |
| `/api/prompts/:id` | `GET` | Recupera detalhes de um prompt específico | Bearer Token |
| `/api/prompts` | `POST` | Cria e persiste um novo `PromptItem` | Bearer Token |
| `/api/prompts/:id` | `PUT` | Atualiza campos de um `PromptItem` | Bearer Token |
| `/api/prompts/:id` | `DELETE`| Remove um `PromptItem` | Bearer Token |
| `/api/prompts/:id/favorite` | `POST` | Alterna status de favorito | Bearer Token |
| `/api/prompts/:id/copy` | `POST` | Incrementa o contador de uso (`usageCount`) | Bearer Token |
| `/api/categories` | `GET` | Retorna categorias disponíveis | Bearer Token |
| `/api/upload` | `POST` | Upload de arquivo de imagem via multipart/form-data | Bearer Token |
| `/api/upload-base64` | `POST` | Upload direto de imagem em payload base64 | Bearer Token |
| `/api/workspace/import` | `POST` | Ingestão de arquivos Docs/Drive via token OAuth | Bearer Token + OAuth Token |

---

## 4. Invariantes de Persistência & Fail-Closed

1. **Paridade Funcional**:
   - `FirestorePromptRepository` e `FilePromptRepository` implementam estritamente a interface `PromptRepository`.
   - O comportamento das queries, filtros e mutações deve ser idêntico em ambos os adaptadores.
2. **Fail-Closed em Cloud Run**:
   - Quando `K_SERVICE` estiver definido e não for contêiner de preview (`ais-dev-*`), a persistência em Cloud Firestore é obrigatória.
   - Qualquer falha de inicialização do Firestore interrompe a inicialização do processo com erro fatal; o fallback silencioso para o sistema de arquivos local é **expressamente proibido**.
3. **Imutabilidade de Entrada**:
   - `rawPrompt` nunca é sobrescrito ou distorcido pela IA. O resultado gerado pelo Gemini é sempre uma sugestão editável antes do commit em banco.
