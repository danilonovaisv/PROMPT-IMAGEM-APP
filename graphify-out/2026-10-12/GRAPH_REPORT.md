# Graph Report - PROMPT-IMAGEM-APP  (2026-09-25)

## Corpus Check
- 145 files · ~172,083 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 5, .example 1, .lock 1)

## Summary
- 1128 nodes · 1666 edges · 96 communities (77 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 45 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8fa852d6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- PromptItem
- server.ts
- package.json
- imageStore
- OperationType
- googleWorkspaceService.ts
- ApiService
- FirestorePromptRepository
- compilerOptions
- Cloud CLI Remote MCP Server Usage
- dependencies
- devDependencies
- Google Cloud Well-Architected Framework (Security Pillar) Skill
- .mcp.json
- vite-env.d.ts
- Developer Knowledge REST API Fallback Guide
- Cognitive Layer Implementation Plan
- Google Firestore
- Google Gemini API
- DAN IMAGES PROMPTS Agent Guide
- Firebase Authentication
- DAN IMAGES PROMPTS README
- Input Validation Layer
- Google Workspace Integration
- Reusable UI Components
- Domain UI Features
- Cloud CLI Remote MCP Server Usage
- Authenticating to Google Cloud
- Authenticating to Google Cloud
- Firestore Web SDK Usage Guide
- Advanced Validation for Business Logic
- Cloud Run Networking best practices and cost optimization
- Cloud Run Networking best practices and cost optimization
- Firebase Authentication Web SDK
- Firestore Indexes Reference
- Writing Data
- ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️
- Android SDK Usage (Enterprise Native Mode)
- ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️
- scripts
- Cloud Firestore on Android (Kotlin)
- Essential Commands
- Cloud Run core concepts
- Cloud Run Basics
- Essential Commands
- Cloud Run core concepts
- Cloud Run Basics
- firebase-auth-basics/SKILL.md
- Firebase Authentication on Android (Kotlin)
- ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️
- Document Data Model
- Firestore Indexes Reference
- Web SDK Usage (Enterprise Native Mode)
- Workflow: Testes e Deploy do WebApp (Cloud Run)
- Team Conventions
- Getting Started
- agent/skills/cloud-run-basics/SKILL.md
- Terraform
- Cloud Run IAM & security
- Getting Started
- .agents/skills/cloud-run-basics/SKILL.md
- Terraform
- Cloud Run IAM & security
- Basic Checks
- firebase-firestore/SKILL.md
- Manual Initialization
- Google Cloud Well-Architected Framework skill for the Security pillar
- Upload Security Review
- Firebase Auth & Google Sign-In for Flutter
- Cloud Firestore in Flutter
- Cloud Firestore in Flutter
- Manual Initialization
- 1. Instance Selection and Edition Detection
- Assessment: Security Validator (Red Team Edition)
- Project Orchestrator
- Workflow
- Deploy a worker pool
- Google Skill Finder
- Prompt Library & Frontend Specialist
- AI Cataloging Specialist
- Release Engineer
- Security & Quality Specialist
- Deploy a worker pool
- Persistence Production
- Test Selection Guide
- Deployment Audit
- Express API Contracts
- React Vite Frontend
- Security Policy
- Mother Brain Integration
- Application Security
- Gemini Multimodal Cataloging
- release.md
- test.md
- esbuild

## God Nodes (most connected - your core abstractions)
1. `PromptItem` - 60 edges
2. `Category` - 42 edges
3. `FilePromptRepository` - 31 edges
4. `ApiService` - 30 edges
5. `FirestorePromptRepository` - 28 edges
6. `PromptRepository` - 28 edges
7. `react` - 17 edges
8. `promptStore` - 17 edges
9. `lucide-react` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `Persistence And Uploads` --references--> `PromptRepository`  [INFERRED]
  .context/conventions.md → server/repositories/promptRepository.ts
- `React` --references--> `ApiService`  [INFERRED]
  .context/conventions.md → src/services/api.ts
- `Responsibilities` --references--> `FilePromptRepository`  [INFERRED]
  .agents/agents/api-domain-specialist.md → server/repositories/filePromptRepository.ts
- `Phase 2: Implementation Plan` --references--> `FilePromptRepository`  [INFERRED]
  .agents/workflows/feature.md → server/repositories/filePromptRepository.ts
- `/quality` --references--> `FilePromptRepository`  [INFERRED]
  .agents/workflows/quality.md → server/repositories/filePromptRepository.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **WAF Security Principles** — google_cloud_waf_security_by_design, google_cloud_waf_zero_trust, google_cloud_waf_shared_responsibility [EXTRACTED 1.00]
- **Google Ecosystem Integrations** — gemini_api, firestore, firebase_auth, server_workspace [EXTRACTED 1.00]
- **Persistence Remediation Flow** — artifacts_agent_ide_prompt, artifacts_audit_report, google_cloud_firestore, google_cloud_run [EXTRACTED 1.00]
- **Prompt Cataloging Workflow** — src_features, server_ai, server_repositories [EXTRACTED 1.00]

## Communities (96 total, 19 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.07
Nodes (58): RFC-4180, lucide-react, ref_motion_react, react, ref_react_dom_client, AccessState, App(), AppIcon() (+50 more)

### Community 1 - "PromptItem"
Cohesion: 0.06
Nodes (17): Invariants, Persistence Adapters, API Surface, Google Workspace Import Flow, Integrations And Environment, Known Constraints, Main Data Flow, Product (+9 more)

### Community 2 - "server.ts"
Cohesion: 0.05
Nodes (58): ref_assert, cookie, dotenv, ref_dotenv_config, express, ref_firebase_admin_app, ref_firebase_admin_auth, ref_firebase_admin_firestore (+50 more)

### Community 3 - "package.json"
Cohesion: 0.10
Nodes (20): name, private, type, version, autoprefixer, firebase, firebase-admin, motion (+12 more)

### Community 4 - "imageStore"
Cohesion: 0.51
Nodes (3): getMimeTypeFromExt(), imageStore, sanitizeDocId()

### Community 5 - "OperationType"
Cohesion: 0.29
Nodes (7): OperationType, CREATE, DELETE, GET, LIST, UPDATE, WRITE

### Community 6 - "googleWorkspaceService.ts"
Cohesion: 0.08
Nodes (32): Do Not Use When, Procedure, Prompt Structured Output Validation, Purpose, Required Context, Security & Privacy, Use When, Validation & Test (+24 more)

### Community 7 - "ApiService"
Cohesion: 0.07
Nodes (28): Bug Diagnosis and Fix Workflow, Phase 1: Reproduction & Telemetry, Phase 2: Root Cause Analysis, Phase 3: Surgical Fix, Phase 4: Regression Test & Verification, firebase_applet_config, ref_firebase_app, ref_firebase_auth (+20 more)

### Community 8 - "FirestorePromptRepository"
Cohesion: 0.10
Nodes (13): API & Persistence Specialist, Handoff & Validation Gate, Responsibilities, Scope, Feature Development Workflow, Phase 1: Context Inspection & Impact Analysis, Phase 2: Implementation Plan, Phase 3: Execution (+5 more)

### Community 9 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules, jsx, lib, module (+8 more)

### Community 10 - "Cloud CLI Remote MCP Server Usage"
Cohesion: 0.05
Nodes (34): Authorization & Authentication, Component Management, gcloud CLI Usage, Installation, Local Configuration Management, Named Configurations, Setting Common Properties, 1. API Enablement (+26 more)

### Community 11 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, cookie, dotenv, express, firebase, firebase-admin, @google/genai, lucide-react (+7 more)

### Community 12 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, autoprefixer, esbuild, tailwindcss, tsx, @types/express, @types/multer, @types/node (+4 more)

### Community 13 - "Google Cloud Well-Architected Framework (Security Pillar) Skill"
Cohesion: 0.25
Nodes (8): Google Cloud Well-Architected Framework (Security Pillar) Skill, DAN-IMAGES-PROMPTS-2 Execution Prompt, Technical Audit Report, Google Cloud Firestore, Google Cloud Run, Security by Design, Shared Responsibility and Shared Fate, Zero Trust

### Community 16 - "Developer Knowledge REST API Fallback Guide"
Cohesion: 0.12
Nodes (14): 1. `answerQuery` (Broad Conceptual Q&A & Multi-Step Guides), 2. `searchDocumentChunks` (Exact Syntax, IAM Permissions & Flags), 3. `get` Document (Full Document Retrieval), 4. `batchGet` Documents (Multiple Document Retrieval), Authentication Protocol, Developer Knowledge REST API Fallback Guide, Endpoints & Operations, Response Processing & Synthesis Guidelines (+6 more)

### Community 27 - "Cloud CLI Remote MCP Server Usage"
Cohesion: 0.05
Nodes (34): Authorization & Authentication, Component Management, gcloud CLI Usage, Installation, Local Configuration Management, Named Configurations, Setting Common Properties, 1. API Enablement (+26 more)

### Community 28 - "Authenticating to Google Cloud"
Cohesion: 0.08
Nodes (23): [API Keys](https://docs.cloud.google.com/docs/authentication/api-keys.md.txt), Authenticating to Google Cloud, Authentication, Authorization, Best Practice: Attaching Service Accounts, Calling a Custom Application ([OIDC](https://docs.cloud.google.com/docs/authentication/get-id-token.md.txt)), Clarifying Questions for the Agent, Examples (+15 more)

### Community 29 - "Authenticating to Google Cloud"
Cohesion: 0.08
Nodes (23): [API Keys](https://docs.cloud.google.com/docs/authentication/api-keys.md.txt), Authenticating to Google Cloud, Authentication, Authorization, Best Practice: Attaching Service Accounts, Calling a Custom Application ([OIDC](https://docs.cloud.google.com/docs/authentication/get-id-token.md.txt)), Clarifying Questions for the Agent, Examples (+15 more)

### Community 30 - "Firestore Web SDK Usage Guide"
Cohesion: 0.12
Nodes (16): Add a Document with Auto-ID (`addDoc`), Firestore Web SDK Usage Guide, Get a Single Document (`getDoc`), Get Multiple Documents (`getDocs`), Handle Changes (Added/Modified/Removed), Initialization, Listen to a Document/Query (`onSnapshot`), Order and Limit (+8 more)

### Community 31 - "Advanced Validation for Business Logic"
Cohesion: 0.12
Nodes (16): 1. Enforce Enum Values, 2. Validate State Transitions, 3. Strict Path and Relationship Scoping, 4. Secure Counter Updates, 5. **CRITICAL** Ensure Application Validity, Advanced Validation for Business Logic, Critical Constraints, Critical Directives for Secure Generation (+8 more)

### Community 32 - "Cloud Run Networking best practices and cost optimization"
Cohesion: 0.12
Nodes (15): Cloud Run Networking best practices and cost optimization, Example 1: External traffic to the internet, Example 2: Internal traffic to a Google API, IP address exhaustion strategies, Monitor IP address usage, Optimize costs, Performance and throughput strategies, Port exhaustion reduction strategies (+7 more)

### Community 33 - "Cloud Run Networking best practices and cost optimization"
Cohesion: 0.12
Nodes (15): Cloud Run Networking best practices and cost optimization, Example 1: External traffic to the internet, Example 2: Internal traffic to a Google API, IP address exhaustion strategies, Monitor IP address usage, Optimize costs, Performance and throughput strategies, Port exhaustion reduction strategies (+7 more)

### Community 34 - "Firebase Authentication Web SDK"
Cohesion: 0.13
Nodes (15): Connect to Emulator, Email Link Authentication, Firebase Authentication Web SDK, Initialization, Observe Auth State, Sign In Anonymously, Sign In with Apple (Popup), Sign In with Facebook (Popup) (+7 more)

### Community 35 - "Firestore Indexes Reference"
Cohesion: 0.13
Nodes (15): 1. High Write Rates (Sequential Values), 2. Large String/Map/Array Fields, 3. TTL Fields, Automatic vs. Manual Management, Best Practices & Exemptions, CLI Commands, Composite Indexes, Config files (+7 more)

### Community 36 - "Writing Data"
Cohesion: 0.14
Nodes (13): Add a Document with Auto-ID, Get a Single Document, Get Multiple Documents, Order and Limit, Pipeline Queries, Python SDK Usage, Queries, Reading Data (+5 more)

### Community 37 - "⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️"
Cohesion: 0.17
Nodes (12): 1. Import and Initialize, 2. Type-Safe Data Models (Codable), 3. Basic CRUD Operations, 4. Pipeline Queries, 5. Realtime Listeners in SwiftUI (Lifecycle Best Practices), ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️, Examples, Initialization (+4 more)

### Community 38 - "Android SDK Usage (Enterprise Native Mode)"
Cohesion: 0.18
Nodes (10): 1. Initialization, 2. Decision Framework: Mandatory Pipeline Architecture, 3. Pipeline Examples, 4. Real-Time Listener & Document Operations, Add Dependencies, Android SDK Usage (Enterprise Native Mode), Full-Text Search, Initialize Firestore (+2 more)

### Community 39 - "⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️"
Cohesion: 0.18
Nodes (10): 1. Import and Initialize, 2. Type-Safe Data Models (Codable), 3. Writing Data (Modern Concurrency & Codable), 4. Reading Data (Modern Concurrency & Codable), 5. Realtime Listeners in SwiftUI (Lifecycle Best Practices), ⛔️ CRITICAL RULE: NO FirebaseFirestoreSwift ⛔️, ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️, Firebase Firestore iOS Setup Guide (+2 more)

### Community 40 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check:updates, clean, dev, lint, preview, start (+3 more)

### Community 41 - "Cloud Firestore on Android (Kotlin)"
Cohesion: 0.20
Nodes (9): 1. Add Dependencies, 2. Initialize Firestore, 3. Add Data, 4. Read Data, 5. Update Data, 6. Delete Data, Cloud Firestore on Android (Kotlin), Enable Firestore via CLI (+1 more)

### Community 42 - "Essential Commands"
Cohesion: 0.22
Nodes (8): Basic Syntax, Cloud Run CLI, Cloud Run job, Cloud Run service, Cloud Run worker pools, Common Flags, Configuration and logs, Essential Commands

### Community 43 - "Cloud Run core concepts"
Cohesion: 0.22
Nodes (9): AI and GPU support, Autoscaling for Cloud Run services, Cloud Run core concepts, Container contract, Container requirements, Pricing, Resource model, Services vs. Jobs vs. Worker pools (+1 more)

### Community 44 - "Cloud Run Basics"
Cohesion: 0.22
Nodes (9): Cloud Run Basics, Create and execute a Cloud Run job, Deploy a Cloud Run service, Deploy a container image to Cloud Run, Deploy from source code, Prerequisites, Reference Directory, Required roles (+1 more)

### Community 45 - "Essential Commands"
Cohesion: 0.22
Nodes (8): Basic Syntax, Cloud Run CLI, Cloud Run job, Cloud Run service, Cloud Run worker pools, Common Flags, Configuration and logs, Essential Commands

### Community 46 - "Cloud Run core concepts"
Cohesion: 0.22
Nodes (9): AI and GPU support, Autoscaling for Cloud Run services, Cloud Run core concepts, Container contract, Container requirements, Pricing, Resource model, Services vs. Jobs vs. Worker pools (+1 more)

### Community 47 - "Cloud Run Basics"
Cohesion: 0.22
Nodes (9): Cloud Run Basics, Create and execute a Cloud Run job, Deploy a Cloud Run service, Deploy a container image to Cloud Run, Deploy from source code, Prerequisites, Reference Directory, Required roles (+1 more)

### Community 48 - "firebase-auth-basics/SKILL.md"
Cohesion: 0.22
Nodes (5): Core Concepts, Identity Providers, Prerequisites, Tokens, Users

### Community 49 - "Firebase Authentication on Android (Kotlin)"
Cohesion: 0.22
Nodes (9): 1, Enable Authentication via CLI, 2. Add Dependencies, 3. Initialize FirebaseAuth, 4. Check Current Auth State, 5. Sign Up New Users (Email/Password), 6. Sign In Existing Users (Email/Password), 7. Sign Out, Firebase Authentication on Android (Kotlin) (+1 more)

### Community 50 - "⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️"
Cohesion: 0.22
Nodes (8): 1. Import and Initialize, 2. Authentication State, 3. Email and Password Authentication (Modern Concurrency), 4. Sign Out, ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️, Firebase Auth iOS Setup Guide, Sign In, Sign Up

### Community 51 - "Document Data Model"
Cohesion: 0.22
Nodes (8): Collection Group Support, Collections, Document Data Model, Documents, Examples, Firestore Data Model Reference, Subcollections, Use Cases

### Community 52 - "Firestore Indexes Reference"
Cohesion: 0.22
Nodes (9): CLI Commands, Config files, Firestore Indexes Reference, Index Density, Index Ordering, Index Structure, Management, Query Support Examples (+1 more)

### Community 53 - "Web SDK Usage (Enterprise Native Mode)"
Cohesion: 0.22
Nodes (8): 1. Initialization, 2. Decision Framework: Pipelines vs. Standard Queries, 3. Pipeline Examples, 4. Real-Time Listener & Document Operations, Full-Text Search, Relational Joins Pattern, Rules & Accountability, Web SDK Usage (Enterprise Native Mode)

### Community 54 - "Workflow: Testes e Deploy do WebApp (Cloud Run)"
Cohesion: 0.22
Nodes (8): Fase 1: Preflight e Consistência de Código, Fase 2: Execução de Testes Automatizados, Fase 3: Build de Produção, Fase 4: Auditoria de Configuração de Runtime (Cloud Run), Fase 5: Portão de Aprovação Humana (Human Gate), Fase 6: Deploy para o Cloud Run (Após Aprovação), ⛔ Regra de Ouro (Inviolável), Workflow: Testes e Deploy do WebApp (Cloud Run)

### Community 55 - "Team Conventions"
Cohesion: 0.22
Nodes (8): Express And APIs, Firebase And Google Workspace, Gemini, Persistence And Uploads, React, Team Conventions, TypeScript And Modules, Verification

### Community 56 - "Getting Started"
Cohesion: 0.25
Nodes (7): Cloud Run Client Libraries, Getting Started, Go, Java, Node.js (TypeScript), Python, Source Code Samples

### Community 57 - "agent/skills/cloud-run-basics/SKILL.md"
Cohesion: 0.25
Nodes (4): Cloud Run MCP Usage, MCP Tools for Cloud Run, Setup Instructions, Supported Operations

### Community 58 - "Terraform"
Cohesion: 0.25
Nodes (7): Cloud Run Infrastructure as Code, Cloud Run job example, Cloud Run service example, Cloud Run worker pool example, Reference documentation, Terraform, YAML

### Community 59 - "Cloud Run IAM & security"
Cohesion: 0.25
Nodes (8): Best practices, Cloud Run IAM & security, Configure IAP to secure access, Container security best practices, Predefined IAM Roles, Public access, Security controls, Types of service accounts for service identity

### Community 60 - "Getting Started"
Cohesion: 0.25
Nodes (7): Cloud Run Client Libraries, Getting Started, Go, Java, Node.js (TypeScript), Python, Source Code Samples

### Community 61 - ".agents/skills/cloud-run-basics/SKILL.md"
Cohesion: 0.25
Nodes (4): Cloud Run MCP Usage, MCP Tools for Cloud Run, Setup Instructions, Supported Operations

### Community 62 - "Terraform"
Cohesion: 0.25
Nodes (7): Cloud Run Infrastructure as Code, Cloud Run job example, Cloud Run service example, Cloud Run worker pool example, Reference documentation, Terraform, YAML

### Community 63 - "Cloud Run IAM & security"
Cohesion: 0.25
Nodes (8): Best practices, Cloud Run IAM & security, Configure IAP to secure access, Container security best practices, Predefined IAM Roles, Public access, Security controls, Types of service accounts for service identity

### Community 64 - "Basic Checks"
Cohesion: 0.25
Nodes (7): Authentication in Security Rules, Basic Checks, Check if user is signed in, Check if user owns the data, Check if user owns the document (field-based), Example: Email Verification Check, Token Properties

### Community 66 - "Manual Initialization"
Cohesion: 0.25
Nodes (8): 1. Create a Firestore Enterprise Database, 2. Create `firebase.json`, 2. Create `firestore.rules`, 3. Create `firestore.indexes.json`, Deploy rules and indexes, Local Emulation, Manual Initialization, Provisioning Firestore Enterprise Native Mode

### Community 67 - "Google Cloud Well-Architected Framework skill for the Security pillar"
Cohesion: 0.25
Nodes (7): Core principles, Google Cloud Well-Architected Framework skill for the Security pillar, Overview, Relevant Google Cloud products, Validation checklist, Workflow, Workload assessment questions

### Community 68 - "Upload Security Review"
Cohesion: 0.25
Nodes (7): Do Not Use When, Purpose, Required Context, Security Checkpoints, Upload Security Review, Use When, Validation

### Community 69 - "Firebase Auth & Google Sign-In for Flutter"
Cohesion: 0.29
Nodes (7): 1. `google_sign_in` 7.2.0 API Changes, 2. Initialization & Web Hang/Crash Pitfalls, 3. Web Logout Crashes, 4. Prototyping Workaround: Bypassing Firestore Composite Indices, 5. Robust `AuthService` Boilerplate, 6. Troubleshooting `auth/unauthorized-domain` on Flutter Web, Firebase Auth & Google Sign-In for Flutter

### Community 70 - "Cloud Firestore in Flutter"
Cohesion: 0.29
Nodes (6): 1. Setup, 2. Best Practices: Type-Safe Models, 3. The Service Layer, 4. Listening to Streams in the UI (`StreamBuilder`), Cloud Firestore in Flutter, Initialization & References

### Community 71 - "Cloud Firestore in Flutter"
Cohesion: 0.29
Nodes (6): 1. Setup, 2. Best Practices: Type-Safe Models, 3. The Service Layer, 4. Listening to Streams in the UI (`StreamBuilder`), Cloud Firestore in Flutter, Initialization & References

### Community 72 - "Manual Initialization"
Cohesion: 0.29
Nodes (7): 1. Create `firebase.json`, 2. Create `firestore.rules`, 3. Create `firestore.indexes.json`, Deploy database, rules and indexes, Local Emulation, Manual Initialization, Provisioning Cloud Firestore

### Community 73 - "1. Instance Selection and Edition Detection"
Cohesion: 0.29
Nodes (7): 1. Instance Selection and Edition Detection, 2. Specialized Guides, A. Instance Found, B. No Instance Found (or New Requested), Cloud Firestore Database and Operations, Enterprise Edition / Native Mode (`references/enterprise/`), Standard Edition (`references/standard/`)

### Community 74 - "Assessment: Security Validator (Red Team Edition)"
Cohesion: 0.29
Nodes (6): Admin Bootstrapping & Privileges:, Assessment: Security Validator (Red Team Edition), Mandatory Audit Checklist:, Overview, Scoring Criteria, Scoring Criteria (1-5):

### Community 75 - "Project Orchestrator"
Cohesion: 0.33
Nodes (5): Agent Routing Table (AGENT_ROUTING_TABLE), Coordination Lifecycle, Identity & Purpose, Operating Principles, Project Orchestrator

### Community 76 - "Workflow"
Cohesion: 0.33
Nodes (6): 1. Provisioning, 2. Client Setup & Usage, 3. Security Rules, Option 1. Enabling Authentication via CLI, Option 2. Enabling Authentication in Console, Workflow

### Community 77 - "Deploy a worker pool"
Cohesion: 0.40
Nodes (5): Deploy a container image, Deploy a worker pool, Deploy a worker pool from source, Supported container images, What to do if a deployment fails:

### Community 78 - "Google Skill Finder"
Cohesion: 0.40
Nodes (4): Google Skill Finder, Rules, When the fetch fails, Workflow

### Community 79 - "Prompt Library & Frontend Specialist"
Cohesion: 0.40
Nodes (4): Handoff & Validation Gate, Prompt Library & Frontend Specialist, Responsibilities, Scope

### Community 80 - "AI Cataloging Specialist"
Cohesion: 0.40
Nodes (4): AI Cataloging Specialist, Handoff & Validation Gate, Responsibilities, Scope

### Community 81 - "Release Engineer"
Cohesion: 0.40
Nodes (4): Handoff & Validation Gate, Release Engineer, Responsibilities, Scope

### Community 82 - "Security & Quality Specialist"
Cohesion: 0.40
Nodes (4): Handoff & Validation Gate, Responsibilities, Scope, Security & Quality Specialist

### Community 83 - "Deploy a worker pool"
Cohesion: 0.40
Nodes (5): Deploy a container image, Deploy a worker pool, Deploy a worker pool from source, Supported container images, What to do if a deployment fails:

### Community 84 - "Persistence Production"
Cohesion: 0.40
Nodes (4): Persistence Production, Procedimento, Saída, Use quando

### Community 85 - "Test Selection Guide"
Cohesion: 0.40
Nodes (4): Available Test Suites, Mapping Rules, Purpose, Test Selection Guide

### Community 86 - "Deployment Audit"
Cohesion: 0.50
Nodes (3): Deployment Audit, Guardrail, Procedimento

### Community 87 - "Express API Contracts"
Cohesion: 0.50
Nodes (3): Completion, Express API Contracts, Invariants

### Community 88 - "React Vite Frontend"
Cohesion: 0.50
Nodes (3): Completion, React Vite Frontend, Working Method

### Community 89 - "Security Policy"
Cohesion: 0.50
Nodes (3): Reporting a Vulnerability, Security Policy, Supported Versions

## Knowledge Gaps
- **563 isolated node(s):** `context7`, `github`, `name`, `private`, `version` (+558 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 630 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PromptItem` connect `PromptItem` to `App.tsx`, `server.ts`, `googleWorkspaceService.ts`, `ApiService`, `FirestorePromptRepository`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `Category` connect `App.tsx` to `FirestorePromptRepository`, `PromptItem`, `server.ts`, `ApiService`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `FilePromptRepository` (e.g. with `Responsibilities` and `Phase 2: Implementation Plan`) actually correct?**
  _`FilePromptRepository` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `ApiService` (e.g. with `Phase 2: Root Cause Analysis` and `React`) actually correct?**
  _`ApiService` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `FirestorePromptRepository` (e.g. with `Responsibilities` and `Phase 2: Implementation Plan`) actually correct?**
  _`FirestorePromptRepository` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `context7`, `github`, `name` to the rest of the system?**
  _563 weakly-connected nodes found - possible documentation gaps or missing edges._