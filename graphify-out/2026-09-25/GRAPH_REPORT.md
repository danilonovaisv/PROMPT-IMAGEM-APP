# Graph Report - DAN-IMAGES-PROMPTS-2  (2026-09-24)

## Corpus Check
- 135 files · ~156,256 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .example 1, .lock 1)

## Summary
- 437 nodes · 994 edges · 27 communities (12 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.81)
- Token cost: 78,151 input · 3,636 output

## Community Hubs (Navigation)
- Frontend UI Libraries & React Primitives
- Filesystem Prompt Repository Adapter
- Express Server & API Routes
- Node.js Package Configuration & Scripts
- Firebase Admin & Backend Filesystem Operations
- Browser Firebase Auth & Client Config
- Gemini AI Integration & Prompt Analyzer
- Frontend Core App & API Client Service
- Firestore Prompt Repository Adapter
- TypeScript Compilation Settings
- Prompt Storage & In-Memory Store
- Runtime Dependencies (Express, Cookie, Dotenv)
- Frontend Build & Tailwind CSS Tooling
- Agent Skills & Cloud Security Policies
- MCP Server Configurations
- Vite Client Environment Typings
- Developer Knowledge Discovery Skills
- Workflow Plans & Task Tracking
- Repository Persistence Layer Boundary
- Gemini AI Provider Boundary
- Agents Governance Documentation
- Firebase Auth Identity Boundary
- Project Overview Documentation
- Server Input Validation Boundary
- Google Workspace Import Services
- Reusable Presentation Components
- Frontend Domain Features

## God Nodes (most connected - your core abstractions)
1. `PromptItem` - 59 edges
2. `Category` - 42 edges
3. `FilePromptRepository` - 28 edges
4. `ApiService` - 27 edges
5. `FirestorePromptRepository` - 25 edges
6. `PromptRepository` - 24 edges
7. `react` - 17 edges
8. `promptStore` - 17 edges
9. `lucide-react` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `ImportResult` --references--> `PromptItem`  [EXTRACTED]
  server/workspace/googleWorkspaceService.ts → src/types/index.ts
- `startServer()` --calls--> `analyzeAndDecomposePrompt()`  [EXTRACTED]
  server.ts → server/ai/promptAnalyzer.ts
- `startServer()` --calls--> `importPromptsFromRawTextAndFiles()`  [EXTRACTED]
  server.ts → server/workspace/googleWorkspaceService.ts
- `startServer()` --calls--> `importPromptsFromWorkspace()`  [EXTRACTED]
  server.ts → server/workspace/googleWorkspaceService.ts
- `DAN-IMAGES-PROMPTS-2 Execution Prompt` --conceptually_related_to--> `Shared Responsibility and Shared Fate`  [INFERRED]
  artifacts/AGENT-IDE-PROMPT.md → agent/skills/google-cloud-waf-security/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Prompt Cataloging Workflow** — src_features, server_ai, server_repositories [EXTRACTED 1.00]
- **Google Ecosystem Integrations** — gemini_api, firestore, firebase_auth, server_workspace [EXTRACTED 1.00]
- **Persistence Remediation Flow** — artifacts_agent_ide_prompt, artifacts_audit_report, google_cloud_firestore, google_cloud_run [EXTRACTED 1.00]
- **WAF Security Principles** — google_cloud_waf_security_by_design, google_cloud_waf_zero_trust, google_cloud_waf_shared_responsibility [EXTRACTED 1.00]

## Communities (27 total, 15 thin omitted)

### Community 0 - "Frontend UI Libraries & React Primitives"
Cohesion: 0.07
Nodes (53): RFC-4180, lucide-react, ref_motion_react, react, ref_react_dom_client, AccessState, App(), AppIcon() (+45 more)

### Community 1 - "Filesystem Prompt Repository Adapter"
Cohesion: 0.09
Nodes (12): FilePromptRepository, CreatePromptInput, PromptRepository, CategoryManagerModalProps, PromptCardProps, PromptGridProps, PromptTableViewProps, PromptDetailModalProps (+4 more)

### Community 2 - "Express Server & API Routes"
Cohesion: 0.07
Nodes (37): ref_assert, express, ref_firebase_admin_auth, ref_http, multer, ref_node_assert_strict, ref_node_fs, ref_node_http (+29 more)

### Community 3 - "Node.js Package Configuration & Scripts"
Cohesion: 0.06
Nodes (34): name, private, scripts, build, check:updates, clean, dev, lint (+26 more)

### Community 4 - "Firebase Admin & Backend Filesystem Operations"
Cohesion: 0.12
Nodes (20): ref_firebase_admin_app, ref_firebase_admin_firestore, ref_fs, ref_fs_promises, ref_path, getAdminFirestore(), DATA_DIR, UPLOADS_DIR (+12 more)

### Community 5 - "Browser Firebase Auth & Client Config"
Cohesion: 0.09
Nodes (26): firebase_applet_config, ref_firebase_app, ref_firebase_auth, ref_firebase_firestore, AuthenticatedApp(), Window, WorkspaceImportModal(), WorkspaceImportModalProps (+18 more)

### Community 6 - "Gemini AI Integration & Prompt Analyzer"
Cohesion: 0.12
Nodes (25): @google/genai, getGeminiAI(), analyzeAndDecomposePrompt(), AnalyzePromptInput, generateFallbackStructuredPrompt(), StructuredAnalysisResult, validateAIAnalysisOutput(), ValidatedAnalysisResult (+17 more)

### Community 7 - "Frontend Core App & API Client Service"
Cohesion: 0.18
Nodes (3): AppContent(), PromptFormModal(), ApiService

### Community 9 - "TypeScript Compilation Settings"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules, jsx, lib, module (+8 more)

### Community 11 - "Runtime Dependencies (Express, Cookie, Dotenv)"
Cohesion: 0.13
Nodes (15): dependencies, cookie, dotenv, express, firebase, firebase-admin, @google/genai, lucide-react (+7 more)

### Community 12 - "Frontend Build & Tailwind CSS Tooling"
Cohesion: 0.17
Nodes (12): devDependencies, autoprefixer, esbuild, tailwindcss, tsx, @types/express, @types/multer, @types/node (+4 more)

### Community 13 - "Agent Skills & Cloud Security Policies"
Cohesion: 0.25
Nodes (8): Google Cloud Well-Architected Framework (Security Pillar) Skill, DAN-IMAGES-PROMPTS-2 Execution Prompt, Technical Audit Report, Google Cloud Firestore, Google Cloud Run, Security by Design, Shared Responsibility and Shared Fate, Zero Trust

## Knowledge Gaps
- **128 isolated node(s):** `context7`, `github`, `name`, `private`, `version` (+123 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 163 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PromptItem` connect `Filesystem Prompt Repository Adapter` to `Frontend UI Libraries & React Primitives`, `Firebase Admin & Backend Filesystem Operations`, `Browser Firebase Auth & Client Config`, `Gemini AI Integration & Prompt Analyzer`, `Frontend Core App & API Client Service`, `Firestore Prompt Repository Adapter`, `Prompt Storage & In-Memory Store`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **Why does `Category` connect `Filesystem Prompt Repository Adapter` to `Frontend UI Libraries & React Primitives`, `Firebase Admin & Backend Filesystem Operations`, `Browser Firebase Auth & Client Config`, `Frontend Core App & API Client Service`, `Firestore Prompt Repository Adapter`, `Prompt Storage & In-Memory Store`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `react` connect `Frontend UI Libraries & React Primitives` to `Node.js Package Configuration & Scripts`, `Browser Firebase Auth & Client Config`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `context7`, `github`, `name` to the rest of the system?**
  _128 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Frontend UI Libraries & React Primitives` be split into smaller, more focused modules?**
  _Cohesion score 0.07423423423423424 - nodes in this community are weakly interconnected._
- **Should `Filesystem Prompt Repository Adapter` be split into smaller, more focused modules?**
  _Cohesion score 0.09308510638297872 - nodes in this community are weakly interconnected._
- **Should `Express Server & API Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.07342995169082125 - nodes in this community are weakly interconnected._